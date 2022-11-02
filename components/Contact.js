import styles from '../styles/Contact.module.css'

export default ({ contact }) => {
	return (
		<ul className={styles.contact}>
			{contact.map(({ id, title, link }) => (
				<li key={id}>
					<a href={link} target="_blank" rel="noreferrer">
						{title}
					</a>
				</li>
			))}
		</ul>
	)
}
