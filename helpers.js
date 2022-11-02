import { apiUrl } from './constants'

const getCollection = async (...collectionNames) => {
	const fetchingPromises = collectionNames.map(async (name) => {
		const res = await fetch(`${apiUrl}/${name}?populate=*`)
		return res.json()
	})

	const dataArray = await Promise.all(fetchingPromises)

	return Object.fromEntries(
		dataArray.map((data, index) => [collectionNames[index], data.data])
	)
}

const charShift = (string, offset = 1) => {
	return Array.from(string)
		.map((char) => String.fromCharCode(char.charCodeAt(0) + offset))
		.join('')
}

export { getCollection, charShift }
