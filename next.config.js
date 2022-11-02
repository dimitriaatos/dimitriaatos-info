/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
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
