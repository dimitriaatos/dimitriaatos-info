import { useEffect, useState } from 'react'
import { charShift } from '../helpers'
import styles from '../styles/Contact.module.css'

export default ({ contact }) => {
	const [shiftedLink, setShiftedLink] = useState()

	useEffect(() => {
		const { link } = contact.find((el) => el.title == 'E_mail')
		setShiftedLink(charShift(link))
	}, [setShiftedLink, contact])

	return (
		<div>
			{shiftedLink && (
				<div className={styles.emailContainer}>
					<span>email: </span>
					<span className={styles.email}>{shiftedLink}</span>
				</div>
			)}
			<ul className={styles.contact}>
				{contact.map(({ id, title, link }) => {
					if (title == 'E_mail') return
					return (
						<li key={id}>
							<a href={link} target="_blank" rel="noreferrer">
								{title}
							</a>
						</li>
					)
				})}
			</ul>
		</div>
	)
}
