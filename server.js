const { loadEnvConfig } = require('@next/env')
const cli = require('next/dist/cli/next-start')

const dev = process.argv[2] == 'dev'
loadEnvConfig('./', dev)
cli.nextStart(['-p', process.env.PORT || 3000])
