import styles from '../styles/Modal.module.css'

export default ({ children, onClose, open, referenceElement }) => {
	if (!open) return null
	const { x, y, height, width } =
		referenceElement?.target?.getBoundingClientRect?.() || {}
	return (
		<div onMouseLeave={onClose} className={styles.info}>
			<div
				style={{
					position: 'absolute',
					left: x,
					top: y - 100,
					height: 100,
				}}
			>
				<div className={styles.modal}>{children}</div>
			</div>
			<div
				style={{
					position: 'absolute',
					left: x,
					top: y,
					height,
					width,
					opacity: 0,
				}}
			/>
		</div>
	)
}
