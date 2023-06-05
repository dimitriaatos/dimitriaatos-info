import WorkPreview from './WorkPreview'
import styles from '../styles/Works.module.css'
import { useContext } from 'react'
import { UIContext } from '../js/context'

export default ({ works, categories, fallbackImage, contentUri }) => {
	const { selectedCategories, setSelectedCategories } = useContext(UIContext)

	const filterWorks = (category = {}) => {
		setSelectedCategories((prev) => {
			if (category.id == prev.state) {
				return {
					state: null,
					filtered: [...works.data],
				}
			}
			return {
				state: category.id || null,
				filtered: works.data.filter((work) => {
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
					{categories.data.map((category) => (
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
					: works.data
				).map((work) => {
					return (
						<li key={work.id}>
							<WorkPreview {...{ fallbackImage, work, contentUri }} />
						</li>
					)
				})}
			</ul>
		</div>
	)
}
