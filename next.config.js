const { URL } = require('node:url')
const { protocol, hostname, port, pathname } = new URL(process.env.CMS_URI)

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	experimental: {
		scrollRestoration: true,
	},
	images: {
		remotePatterns: [
			{
				protocol: protocol.replace(':', ''),
				hostname,
				port,
				pathname: `${pathname}/uploads/**`,
			},
		],
	},
}

module.exports = nextConfig
