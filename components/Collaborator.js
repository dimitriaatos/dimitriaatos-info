import { useState } from 'react'
import styles from '../styles/Collaborator.module.css'
import Contact from './Contact'
import modalContentStyles from '../styles/ModalContent.module.css'
import Modal from './Modal'

export default ({ collaborator }) => {
	const [selectedCollaborator, setSelectedCollaborator] = useState(null)

	const {
		id,
		attributes: { firstNames, lastNames, contact },
	} = collaborator
	return (
		<>
			{contact.length ? (
				<button
					key={id}
					className={styles.collaboratorButton}
					onClick={() => {
						setSelectedCollaborator(collaborator)
					}}
				>
					{firstNames} {lastNames}
				</button>
			) : (
				<span key={id} className={styles.collaborator}>
					{firstNames} {lastNames}
				</span>
			)}
			<Modal
				open={!!selectedCollaborator}
				onClose={() => setSelectedCollaborator(null)}
			>
				<div className={modalContentStyles.container}>
					<div className={modalContentStyles.title}>
						{['firstNames', 'lastNames']
							.map((key) => selectedCollaborator?.attributes?.[key])
							.join(' ')}
					</div>
				</div>
				<Contact contact={selectedCollaborator?.attributes.contact} />
			</Modal>
		</>
	)
}
