import WorkPreview from './WorkPreview'
import styles from '../styles/Works.module.css'
import { useState } from 'react'

export default ({ works, categories, fallbackImage }) => {
	const [selectedCategories, setSelectedCategories] = useState({
		state: null,
		filtered: [...works],
	})

	const filterWorks = (category = {}) => {
		setSelectedCategories((prev) => {
			if (category.id == prev.state) {
				return {
					state: null,
					filtered: [...works],
				}
			}
			return {
				state: category.id || null,
				filtered: works.filter((work) => {
					return work.attributes.categories.data.some(
						(workCategory) => workCategory.id == category.id
					)
				}),
			}
		})
	}

	return (
		<div className={styles.container}>
			<div className={styles.categoriesLine}>
				<div className={styles.categories}>
					<button
						className={[
							styles.categoryButton,
							selectedCategories.state === null
								? styles.categoryButtonSelected
								: '',
						].join(' ')}
						onClick={() => filterWorks()}
					>
						All
					</button>
					{categories.map((category) => (
						<button
							className={[
								styles.categoryButton,
								selectedCategories.state == category.id
									? styles.categoryButtonSelected
									: '',
							].join(' ')}
							onClick={() => filterWorks(category)}
							key={category.id}
						>
							{category.attributes.title}
						</button>
					))}
				</div>
			</div>
			<ul className={styles.works}>
				{(selectedCategories.filtered.length
					? selectedCategories.filtered
					: works
				).map((work) => {
					return (
						<li key={work.id}>
							<WorkPreview {...{ fallbackImage, work }} />
						</li>
					)
				})}
			</ul>
		</div>
	)
}
