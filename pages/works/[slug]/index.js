import Head from 'next/head'
import { assetsUrl, graphqlUri } from '../../../js/constants'
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
import { capitalizeFirstLetter, snakeCaseToText } from '../../../js/helpers'

const getFormatted = (key) => capitalizeFirstLetter(snakeCaseToText(key))

export default ({ work, about }) => {
	const {
		title,
		description,
		technologies,
		credits,
		image,
		links,
		embed,
		date,
	} = work?.data?.attributes || {}
	const format = image?.data?.attributes?.formats?.medium
	const year = date.substring(0, 4)

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
						<h2>{about.data.attributes.title}</h2>
					</a>
				</Link>
				<div className={styles.workTitleContainer}>
					<h1 className={styles.workTitle}>{title}</h1>
					<div>{year}</div>
				</div>
				{embed && <EmbedVideo link={embed} />}
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
				{!!collaborators?.data?.length && (
					<div className={styles.lists}>
						<span className={styles.listTitle}>Collaborators: </span>
						{collaborators.data.map((collaborator, index, { length }) => {
							return (
								<span key={collaborator.id}>
									<Collaborator {...{ collaborator }} />
									{length > index + 1 && '|'}
								</span>
							)
						})}
					</div>
				)}
				{!!withContribution.length && (
					<ul style={{ display: 'block', listStyleType: '"- "' }}>
						<div className={styles.listTitle}>Credits</div>
						{withContribution.map((credit) => {
							const {
								id: contributionId,
								attributes: { title },
							} = credit.contribution.data
							return (
								<li key={contributionId}>
									<span className={styles.creditTitle}>
										{`${capitalizeFirstLetter(title)}: `}
									</span>
									{credit.collaborators.data.map(
										(collaborator, index, { length }) => {
											return (
												<span key={collaborator.id}>
													<Collaborator {...{ collaborator }} />
													{length != index + 1 && <span>/</span>}
												</span>
											)
										}
									)}
								</li>
							)
						})}
					</ul>
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
								return (
									<li key={id} className="dashedLink">
										<a href={link} target="_blank" rel="noreferrer">
											{getFormatted(title)}
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
