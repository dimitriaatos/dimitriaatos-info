import Head from 'next/head'
import { apiUrl, assetsUrl } from '../../../constants'
import { getCollection } from '../../../helpers'
import indexStyles from '../../../styles/Index.module.css'
import styles from '../../../styles/Work.module.css'
import ReactMarkdown from 'react-markdown'
import { useState } from 'react'
import Modal from '../../../components/Modal'
import EmbedVideo from '../../../components/EmbedVideo'
import Link from 'next/link'
import Image from 'next/image'
import Contact from '../../../components/Contact'

export default ({ work, about, collaborators: allCollaborators }) => {
	const { title, description } = work
	const technologies = work?.technologies?.data
	const collaborators = work?.collaborators?.data
	const { image } = work
	const format = image?.data?.attributes?.formats?.medium
	const links = work?.links
	const [selectedCollaborator, setSelectedCollaborator] = useState(null)

	return (
		<div className={indexStyles.container}>
			<Head>
				<title>{`${title} - ${about.title}`}</title>
				<meta name="description" content={description} />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className={indexStyles.main}>
				<Link href="/" legacyBehavior passHref>
					<a className={styles.pageTitle}>
						<h1>{about.title}</h1>
					</a>
				</Link>
				<div>
					<h2 className={styles.workTitle}>{title}</h2>
					<EmbedVideo link={work?.embed} />
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
					<article>
						<ReactMarkdown>{description}</ReactMarkdown>
					</article>
				</div>
				{!!collaborators.length && (
					<div className={styles.lists}>
						<span className={styles.listTitle}>Collaborators: </span>
						{collaborators.map((collaborator) => {
							const {
								id,
								attributes: { firstNames, lastNames },
							} = collaborator
							return (
								<span key={id}>
									<button
										className={styles.collaborator}
										onClick={() => {
											setSelectedCollaborator(
												allCollaborators.find((fullData) => {
													return fullData.data.id == collaborator.id
												})
											)
										}}
									>
										{firstNames} {lastNames}
									</button>
								</span>
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
				{links && (
					<div className={styles.lists}>
						<span className={styles.listTitle}>Links: </span>
						<ul>
							{links.map(({ id, link, title }) => (
								<li key={id}>
									<a href={link} target="_blank" rel="noreferrer">
										{title}
									</a>
								</li>
							))}
						</ul>
					</div>
				)}
				<Modal
					open={!!selectedCollaborator}
					onClose={() => setSelectedCollaborator(null)}
				>
					<div className={styles.modal}>
						{selectedCollaborator?.data?.attributes?.firstNames}{' '}
						{selectedCollaborator?.data?.attributes?.lastNames}
					</div>
					{selectedCollaborator && (
						<Contact contact={selectedCollaborator.data.attributes.contact} />
					)}
				</Modal>
			</main>
		</div>
	)
}

export const getStaticProps = async (context) => {
	const res = await fetch(
		`${apiUrl}/slugify/slugs/work/${context.params.slug}?populate=*`
	)

	const work = await res.json()
	const { about } = await getCollection('about')
	const collaboratorPromises = work.data.attributes.collaborators.data.map(
		async ({ id }) => {
			const res = await fetch(`${apiUrl}/collaborators/${id}?populate=*`)
			return await res.json()
		}
	)

	const collaborators = await Promise.all(collaboratorPromises)

	return {
		props: {
			work: work.data.attributes,
			about: about.attributes,
			collaborators,
		},
	}
}

export const getStaticPaths = async () => {
	const res = await fetch(`${apiUrl}/works`)
	const { data } = await res.json()
	const paths = data.map((work) => ({ params: { slug: work.attributes.slug } }))
	return {
		paths,
		fallback: false,
	}
}
