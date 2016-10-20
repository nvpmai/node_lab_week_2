#!/usr/bin/env babel-node

require('./helper')
const fs = require('fs').promise
const express = require('express')
const promiseRouter = require('express-promise-router')
const morgan = require('morgan')
const trycatch = require('trycatch')
// const bodyParser = require('body-parser')

// let app = express()

// if (NODE_ENV === 'development') {
//   app.use(morgan('dev'))
// }

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
  app.listen(port);
  console.log(`LISTENING @ http://127.0.0.1:${port}`)
}

initialize()
