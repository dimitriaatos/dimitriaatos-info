import express from 'express'
import bodyParser from 'body-parser'
import child from 'child_process'
import nextEnv from '@next/env'
import ecosystemConfig from '../ecosystem.config.cjs'

nextEnv.loadEnvConfig(process.cwd())

const app = express()
const PORT = process.env.WEBHOOK_PORT

app.use(bodyParser.json())

app.post('/strapi', (req, res) => {
	child.exec(`npm run build && pm2 restart ${ecosystemConfig.apps[0].name}`)
	res.status(200).end()
})

app.listen(PORT, () => console.log(`localhost:${PORT}`))
