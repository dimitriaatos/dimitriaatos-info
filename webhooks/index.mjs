import express from 'express'
import bodyParser from 'body-parser'
import child from 'child_process'
import { loadEnvConfig } from '@next/env'
loadEnvConfig(process.cwd())

const app = express()
const PORT = process.env.WEBHOOK_PORT

app.use(bodyParser.json())

app.post('/strapi', (req, res) => {
	child.exec(
		'source ~/.nvm/nvm.sh && npm run build && pm2 reload ecosystem.config.cjs --env production'
	)
	res.status(200).end()
})

app.listen(PORT, () => console.log(`localhost:${PORT}`))
