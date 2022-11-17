import styles from '../styles/Collaborator.module.css'

export default ({ collaborator }) => {
	const {
		id,
		attributes: { firstNames, lastNames, contact },
	} = collaborator
	return (
		<>
			{contact.length ? (
				<a
					key={id}
					className={[styles.collaboratorButton, 'dashedLink'].join(' ')}
					href={contact[0].link}
					target="_blank"
					rel="noreferrer"
				>
					{firstNames} {lastNames}
				</a>
			) : (
				<span key={id} className={styles.collaborator}>
					{firstNames} {lastNames}
				</span>
			)}
		</>
	)
}
