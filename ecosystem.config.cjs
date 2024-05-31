const { loadEnvConfig } = require('@next/env')
const env_production = loadEnvConfig(process.cwd()).combinedEnv

module.exports = {
	apps: [
		{
			name: 'dimitriaatos',
			script: 'npm start && node webhook/index.mjs',
			env_production,
		},
	],

	deploy: {
		production: {
			user: 'dimitriaatos',
			host: 'grain',
			ref: 'origin/main',
			repo: 'https://github.com/dimitriaatos/dimitriaatos-info.git',
			path: '/home/dimitriaatos/sites/dimitriaatos/front',
			'pre-deploy-local':
				'rsync -v ./.env.production.local dimitriaatos@grain:/home/dimitriaatos/sites/dimitriaatos/front/current/',
			'post-deploy':
				'source ~/.nvm/nvm.sh && npm install && npm run build && npm run sitemap && pm2 reload ecosystem.config.cjs --env production',
			'ssh-options': 'ForwardAgent=yes',
		},
	},
}
