const fs = require('fs')
require ('dotenv').config()
const express = require('express')
const mongoose = require('mongoose');
const  morgan = require('morgan')
const productRouter = require('./routes/products')
const userRouter = require('./routes/user')
const server = express()


//db connection
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/ecommerce');
 console.log('database connected')
}


server.use(express.json())
server.use(morgan('default'))
server.use(express.static(process.env.PUBLIC_DIR))
server.use('/products', productRouter.router)
server.use('/users', userRouter.router)



server.listen(process.env.PORT, () => {
  console.log('server started...')
})

