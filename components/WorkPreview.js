import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/WorkPreview.module.css'

export default ({ work, fallbackImage, contentUri }) => {
	const { title, slug, cover } = work.attributes
	const image = cover || fallbackImage

	const thumbnail =
		cover?.data?.attributes?.formats?.small || fallbackImage.formats.thumbnail

	return (
		<Link href={`/works/${slug}`} legacyBehavior passHref>
			<button className={styles.container}>
				<Image
					className={styles.image}
					src={contentUri + thumbnail.url}
					width={thumbnail.width}
					height={thumbnail.height}
					alt={image.alternativeText || ''}
					priority={true}
				/>
				<h3 className={styles.title}>{title}</h3>
			</button>
		</Link>
	)
}
