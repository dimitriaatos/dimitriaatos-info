import express from 'express'
import bodyParser from 'body-parser'
import child from 'child_process'
import { GithubWebhook } from '@inventivetalent/express-github-webhook'
import * as dotenv from 'dotenv'
import path from 'path'

dotenv.config()
const app = express()
const PORT = process.env.GH_WEBHOOK_PORT

const webhookHandler = new GithubWebhook({
	events: ['push'],
	secret: process.env.GH_SECRET,
})

const branch = child
	.execSync('git rev-parse --abbrev-ref HEAD')
	.toString()
	.trim()

app.use(bodyParser.json())

const commands = {
	pull: 'git pull',
	build: 'npm run build',
	restart: 'pm2 restart dimitriaatos',
}

app.use('/github', webhookHandler.middleware, (req, res) => {
	if (path.parse(req.body.ref).name == branch) {
		child.exec(Object.values(commands).join(' && '))
	}
	res.status(200).end()
})

app.post('/strapi', (req, res) => {
	const { build, restart } = commands
	child.exec([build, restart].join(' && '))
	res.status(200).end()
})

app.listen(PORT, () => console.log(`localhost:${PORT}`))
