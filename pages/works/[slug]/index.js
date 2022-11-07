import Head from 'next/head'
import { assetsUrl, graphqlUri } from '../../../constants'
import indexStyles from '../../../styles/Index.module.css'
import styles from '../../../styles/Work.module.css'
import ReactMarkdown from 'react-markdown'
import { useMemo } from 'react'
import EmbedVideo from '../../../components/EmbedVideo'
import Link from 'next/link'
import Image from 'next/image'
import { GET_ABOUT, GET_WORKS, GET_WORK_BY_SLUG } from '../../../graphql'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import Collaborator from '../../../components/Collaborator'

export default ({ work, about }) => {
	const { title, description } = work.data.attributes
	const technologies = work?.data?.attributes?.technologies
	const credits = work?.data?.attributes?.credits
	const image = work?.data?.attributes?.image
	const format = image?.data?.attributes?.formats?.medium
	const links = work?.data?.attributes?.links

	const { withContribution, collaborators } = useMemo(() => {
		return credits.reduce(
			(split, credit) => {
				if (credit.contribution.data) {
					split.withContribution.push(credit)
				} else {
					split.collaborators = credit.collaborators
				}
				return split
			},
			{ withContribution: [], collaborators: [] }
		)
	}, [credits])

	return (
		<div className={indexStyles.container}>
			<Head>
				<title>{`${title} - ${about.data.attributes.title}`}</title>
				<meta name="description" content={description} />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className={indexStyles.main}>
				<Link href="/" legacyBehavior passHref>
					<a className={styles.pageTitle}>
						<h1>{about.data.attributes.title}</h1>
					</a>
				</Link>
				<div>
					<h2 className={styles.workTitle}>{title}</h2>
					<EmbedVideo link={work?.data?.attributes?.embed} />
					{image.data && (
						<Image
							className={styles.image}
							src={assetsUrl + format.url}
							width={format.width}
							height={format.height}
							alt={image.alternativeText || ''}
							priority={true}
						/>
					)}
					<article className={styles.description}>
						<ReactMarkdown>{description}</ReactMarkdown>
					</article>
				</div>
				{!!collaborators?.data?.length && (
					<div className={styles.lists}>
						<span className={styles.listTitle}>Collaborators: </span>
						{collaborators.data.map((collaborator, index, { length }) => {
							return (
								<>
									<Collaborator
										key={collaborator.id}
										{...{ collaborator }}
										onClick={console.log}
									/>
									{length != index + 1 && <span> / </span>}
								</>
							)
						})}
					</div>
				)}
				{!!withContribution.length && (
					<div style={{ display: 'block' }}>
						<div className={styles.listTitle}>Credits</div>
						{withContribution.map((credit) => {
							const {
								id: contributionId,
								attributes: { title },
							} = credit.contribution.data
							return (
								<div key={contributionId}>
									<span>{`${title}: `}</span>
									{credit.collaborators.data.map(
										(collaborator, index, { length }) => {
											return (
												<>
													<Collaborator
														key={collaborator.id}
														{...{ collaborator }}
														onClick={console.log}
													/>
												</>
											)
										}
									)}
								</div>
							)
						})}
					</div>
				)}
				{!!technologies.length && (
					<div style={{ textAlign: 'left', display: 'block' }}>
						<span className={styles.listTitle}>Technologies used: </span>
						{technologies
							.map((technology) => technology.attributes.title)
							.join(', ')}
					</div>
				)}
				{!!links.length && (
					<div className={styles.lists}>
						<span className={styles.listTitle}>Links: </span>
						<ul>
							{links.map(({ id, link, title }) => {
								console.log(id, link, title)
								return (
									<li key={id}>
										<a href={link} target="_blank" rel="noreferrer">
											{title}
										</a>
									</li>
								)
							})}
						</ul>
					</div>
				)}
			</main>
		</div>
	)
}

export const getStaticProps = async (context) => {
	const client = new ApolloClient({
		uri: graphqlUri,
		cache: new InMemoryCache(),
	})

	const {
		data: { about },
	} = await client.query({
		query: GET_ABOUT,
	})

	const {
		data: { findSlug: work },
	} = await client.query({
		query: GET_WORK_BY_SLUG,
		variables: {
			slug: context.params.slug,
		},
	})

	return {
		props: {
			work,
			about,
		},
	}
}

export const getStaticPaths = async () => {
	const client = new ApolloClient({
		uri: graphqlUri,
		cache: new InMemoryCache(),
	})

	const {
		data: { works },
	} = await client.query({
		query: GET_WORKS,
	})

	const paths = works.data.map((work) => ({
		params: { slug: work.attributes.slug },
	}))

	return {
		paths,
		fallback: false,
	}
}