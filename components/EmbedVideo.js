const embedMap = {
	'www.youtube.com': (url) =>
		`https://www.youtube-nocookie.com/embed/${url.searchParams.get('v')}`,
	'vimeo.com': (url) =>
		`https://player.vimeo.com/video${url.pathname}?h=6c62652a1b&byline=0&portrait=0`,
	'soundcloud.com': (url) =>
		`https://w.soundcloud.com/player/?url=${url.href}&color=%237c7973&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true`,
}

const getIframeSrc = (link) => {
	const url = new URL(link)
	return embedMap[url.hostname](url)
}

export default ({ link }) => {
	if (!link) return null

	return (
		<iframe
			width="100%"
			style={{
				aspectRatio: '16 / 9',
			}}
			src={getIframeSrc(link)}
			title="YouTube video player"
			frameBorder="0"
			scrolling="no"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen;"
		></iframe>
	)
}
