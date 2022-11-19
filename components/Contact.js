import { useEffect, useState } from 'react'
import { charShift } from '../helpers'
import styles from '../styles/Contact.module.css'

export default ({ contact }) => {
	return (
		<ul className={styles.contact}>
			{contact.map(({ id, title, link }) => {
				const [shiftedLink, setShiftedLink] = useState(link)

				useEffect(() => {
					setShiftedLink(charShift(link))
				}, [])

				return (
					<li key={id}>
						<a href={shiftedLink} target="_blank" rel="noreferrer">
							{title}
						</a>
					</li>
				)
			})}
		</ul>
	)
}
