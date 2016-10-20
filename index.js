const NODE_ENV = process.env.NODE_ENV
const PORT = process.env.port || 8000


const express = require('express')
const path = require('path')
const morgan = require('morgan')
const fs = require('fs').promise
const app = express()

if (NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.listen(PORT, () => console.log('LISTENING @ http://127.0.0.1:8000'))

app.get('*', (req, res, next) => {
  async function initialize() {
    const filePath = path.resolve(path.join(__dirname, req.url))
    if (filePath.indexOf(__dirname) !== 0) {
      res.send(400, 'Invalid path')
      return
    }
    console.log(fs)
    const stat = await fs.stat(filePath)
    if (stat.isDirectory()) {
      const files = await fs.readdir(filePath)
      res.json(files)
      return
    }
    fs.createReadStream(filePath).pipe(res)
  }
  initialize()
})
