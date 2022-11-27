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
				protocol: 'https',
				hostname: 'cms.dimitriaatos.info',
				port: '',
				pathname: '/uploads/**',
			},
		],
	},
}

module.exports = nextConfig
