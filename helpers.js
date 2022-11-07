const charShift = (string, offset = 1) => {
	return Array.from(string)
		.map((char) => String.fromCharCode(char.charCodeAt(0) + offset))
		.join('')
}

export { charShift }
