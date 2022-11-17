import { useState } from 'react'
import styles from '../styles/Collaborator.module.css'
import Contact from './Contact'
import modalContentStyles from '../styles/ModalContent.module.css'
import Modal from './Modal'
import Popover from './Popover'
import { useMediaQuery } from '../hooks'

const CollaboratorInfo = ({ selectedCollaborator }) => (
	<>
		<div className={modalContentStyles.container}>
			<div className={modalContentStyles.title}>
				{['firstNames', 'lastNames']
					.map((key) => selectedCollaborator?.attributes?.[key])
					.join(' ')}
			</div>
		</div>
		<Contact contact={selectedCollaborator?.attributes.contact} />
	</>
)

export default ({ collaborator }) => {
	const hoverSupported = useMediaQuery('(hover: hover)')
	const [selectedCollaborator, setSelectedCollaborator] = useState(null)
	const [referenceElement, setReferenceElement] = useState(null)

	const showInfo = (collaborator) => (event) => {
		setReferenceElement(event)
		setSelectedCollaborator(collaborator)
	}

	const hideInfo = () => {
		setReferenceElement(null)
		setSelectedCollaborator(null)
	}

	const {
		id,
		attributes: { firstNames, lastNames, contact },
	} = collaborator
	return (
		<>
			{contact.length ? (
				<button
					key={id}
					className={[styles.collaboratorButton, 'dashedLink'].join(' ')}
					{...{
						[hoverSupported ? 'onMouseEnter' : 'onClick']:
							showInfo(collaborator),
					}}
				>
					{firstNames} {lastNames}
				</button>
			) : (
				<span key={id} className={styles.collaborator}>
					{firstNames} {lastNames}
				</span>
			)}
			{hoverSupported ? (
				<Popover
					open={!!selectedCollaborator}
					onClose={hideInfo}
					{...{ referenceElement }}
				>
					<CollaboratorInfo {...{ selectedCollaborator }} />
				</Popover>
			) : (
				<Modal open={!!selectedCollaborator} onClose={hideInfo}>
					<CollaboratorInfo {...{ selectedCollaborator }} />
				</Modal>
			)}
		</>
	)
}
