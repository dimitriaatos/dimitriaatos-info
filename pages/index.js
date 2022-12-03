import Head from 'next/head'
import Image from 'next/image'
import Works from '../components/Works'
import styles from '../styles/Index.module.css'
import { assetsUrl, graphqlUri } from '../js/constants'
import ReactMarkdown from 'react-markdown'
import Contact from '../components/Contact'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { GET_ABOUT, GET_CATEGORIES, GET_WORKS } from '../graphql/index'

export default ({ about, categories, works }) => {
	const { title, description, contact } = about.data.attributes
	const photo = about.data.attributes.photo.data.attributes
	const fallbackImage = about.data.attributes.fallbackImage.data.attributes
	const cv = about.data.attributes.cv.data.attributes
	const thumbnail = photo.formats.thumbnail

	return (
		<div className={styles.container}>
			<Head>
				<title>{title}</title>
				<meta name="description" content={description} />
			</Head>
			<main className={styles.main}>
				<h1 className={styles.pageTitle}>{title}</h1>
				<div className={styles.centeredContainer}>
					<Image
						src={assetsUrl + thumbnail.url}
						width={thumbnail.width}
						height={thumbnail.height}
						alt={photo.alternativeText}
						className={styles.photo}
						priority={true}
					/>
				</div>
				<div>
					<h2>About</h2>
					<ReactMarkdown>{description}</ReactMarkdown>
				</div>
				<div>
					<h2 style={{ userSelect: 'none' }}>Works</h2>
					<Works {...{ categories, works, fallbackImage }} />
				</div>
				<div className={styles.centeredContainer}>
					<a
						className={styles.cvButton}
						href={assetsUrl + cv.url}
						target="_blank"
						rel="noreferrer"
					>
						<div>Curriculum Vitae</div>
					</a>
				</div>
			</main>

			<footer>
				<Contact {...{ contact }} />
			</footer>
		</div>
	)
}

export const getStaticProps = async () => {
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
		data: { categories },
	} = await client.query({
		query: GET_CATEGORIES,
	})

	const {
		data: { works },
	} = await client.query({
		query: GET_WORKS,
	})

	return {
		props: {
			about,
			categories,
			works: {
				data: [...works.data].sort(
					(a, b) =>
						new Date(b.attributes.date).getTime() -
						new Date(a.attributes.date).getTime()
				),
			},
		},
	}
}
