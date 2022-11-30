import express from 'express'
import bodyParser from 'body-parser'
import child from 'child_process'
import * as dotenv from 'dotenv'

dotenv.config()
const app = express()
const PORT = process.env.WEBHOOK_PORT

app.use(bodyParser.json())

const commands = {
	build: 'npm run build',
	restart: 'pm2 restart dimitriaatos',
}

app.post('/strapi', (req, res) => {
	child.exec(commands.join(' && '))
	res.status(200).end()
})

app.listen(PORT, () => console.log(`localhost:${PORT}`))
