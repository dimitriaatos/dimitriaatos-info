import Head from 'next/head'
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
			<>
				<Head>
					{[16, 24, 32, 64].map((size) => (
						<link
							key={size}
							rel="icon"
							type="image/png"
							sizes={`${size}x${size}`}
							href={`/favicon-${size}x${size}.png`}
						/>
					))}
					<link rel="mask-icon" href="/favicon.svg" color="#ffffff" />
				</Head>
				<Component {...pageProps} />
			</>
		</UIContext.Provider>
	)
}

export default App
