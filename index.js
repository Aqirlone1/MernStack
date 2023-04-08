const fs = require('fs')
const express = require('express')
const  morgan = require('morgan')
const productRouter = require('./routes/products')
const server = express()

server.use(express.json())
server.use(morgan('default'))
server.use(express.static('public'))
server.use('/api/v1', productRouter.router)



server.listen(8080, () => {
  console.log('server started...')
})

