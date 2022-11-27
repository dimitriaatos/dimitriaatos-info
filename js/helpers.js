const charShift = (string, offset = 1) => {
	return Array.from(string)
		.map((char) => String.fromCharCode(char.charCodeAt(0) + offset))
		.join('')
}

const snakeCaseToText = (string) => {
	return string.replaceAll('_', ' ')
}

const capitalizeFirstLetter = (string) => {
	return string.charAt(0).toUpperCase() + string.slice(1)
}

export { charShift, snakeCaseToText, capitalizeFirstLetter }
