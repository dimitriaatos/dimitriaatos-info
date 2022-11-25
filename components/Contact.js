import { useEffect, useState } from 'react'
import { charShift } from '../helpers'
import styles from '../styles/Contact.module.css'

export default ({ contact }) => {
	const [shiftedLink, setShiftedLink] = useState()

	useEffect(() => {
		const { link } = contact.find((el) => el.title == 'E_mail')
		setShiftedLink(charShift(link))
	}, [])

	return (
		<div>
			{shiftedLink && (
				<div className={styles.email}>
					<span style={{ userSelect: 'none' }}>email: </span>
					{shiftedLink}
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
