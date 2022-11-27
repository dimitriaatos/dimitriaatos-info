import { useEffect } from 'react'
import styles from '../styles/Modal.module.css'

export default ({ children, onClose, open }) => {
	useEffect(() => {
		document.addEventListener('keydown', (event) => {
			if (event.key == 'Escape') onClose()
		})
	}, [onClose])

	if (!open) return null

	return (
		<div className={styles.container}>
			<div className={styles.backdrop} onClick={onClose}></div>
			<div
				className={styles.modal}
				onClick={(event) => event.stopPropagation()}
			>
				{children}
			</div>
		</div>
	)
}
