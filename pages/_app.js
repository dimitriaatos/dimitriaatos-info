import { useState } from 'react'
import { UIContext } from '../js/context'
import '../styles/globals.css'

function App({ Component, pageProps }) {
	const [selectedCategories, setSelectedCategories] = useState({
		state: null,
		filtered: [],
	})
	return (
		<UIContext.Provider value={{ selectedCategories, setSelectedCategories }}>
			<Component {...pageProps} />
		</UIContext.Provider>
	)
}

export default App
