import Head from 'next/head'
import Image from 'next/image'
import Works from '../components/Works'
import styles from '../styles/Index.module.css'
import { getCollection } from '../helpers'
import { assetsUrl } from '../constants'
import ReactMarkdown from 'react-markdown'
import Contact from '../components/Contact'

export default ({ about, categories, works }) => {
	const {
		attributes: { title, description, contact },
	} = about
	const photo = about.attributes.photo.data.attributes
	const fallbackImage = about.attributes.fallbackImage.data.attributes
	const cv = about.attributes.cv.data.attributes
	const thumbnail = photo.formats.thumbnail

	return (
		<div className={styles.container}>
			<Head>
				<title>{title}</title>
				<meta name="description" content={description} />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className={styles.main}>
				<h1>{title}</h1>
				<div>
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
					<h2>Works</h2>
					<Works {...{ categories, works, fallbackImage }} />
				</div>
				<div>
					<a href={assetsUrl + cv.url} target="_blank" rel="noreferrer">
						<button className={styles.cvButton}>Curriculum Vitae</button>
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
	const data = await getCollection('about', 'categories', 'works')
	return {
		props: data,
	}
}
