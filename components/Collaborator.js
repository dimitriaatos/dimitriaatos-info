import styles from '../styles/Collaborator.module.css'

export default ({ collaborator }) => {
	const {
		id,
		attributes: { firstNames, lastNames, contact },
	} = collaborator
	return (
		<>
			{contact.length ? (
				<span className={[styles.collaboratorButton, 'dashedLink'].join(' ')}>
					<a key={id} href={contact[0].link} target="_blank" rel="noreferrer">
						{firstNames} {lastNames}
					</a>
				</span>
			) : (
				<span key={id} className={styles.collaborator}>
					{firstNames} {lastNames}
				</span>
			)}
		</>
	)
}
