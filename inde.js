#!/usr/bin/env babel-node

require('./helper')
const fs = require('fs').promise
const express = require('express')
// const promiseRouter = require('express-promise-router')
const morgan = require('morgan')
const trycatch = require('trycatch')
const path = require('path')
// const bodyParser = require('body-parser')

// let app = express()

// if (NODE_ENV === 'development') {
//   app.use(morgan('dev'))
// }
async function read(req, res) {
  const filePath = path.join(__dirname, 'files', req.url)
  const data = await fs.readFile(filePath).catch((err) => {
    if (err.code === 'EISDIR') {
      res.end("Can't read directory");
    }
  });
  if (data) {
    res.end(data)
  }
}

async function initialize() {
  const app = express()
  app.use(morgan('dev'))
  app.use((req, res, next) => {
    trycatch(next, e => {
      console.log(e.stack)
      res.writeHead(500)
      res.end(e.stack)
    })
  })

  const port = 8000
  app.get('*', read)

  app.listen(port);
  console.log(`LISTENING @ http://127.0.0.1:${port}`)
}


initialize()
