const fs = require('fs')
const express = require('express')
const { json } = require('body-parser')
const  morgan = require('morgan')




const index = fs.readFileSync('index.html', 'utf-8')
const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'))
const products = data.products

const server=express()
server.use(express.json())

//-----middleware------- runs on every request
// server.use((req,res,next) =>{
// console.log(req.method, req.ip, req.hostname)
// next()
// })


//morgan
//server.use(morgan('dev'))


//static hosting 

//server.use(express.static('public'))

// Built in middleware or body parser
// server.use(auth)


//middleware -- costum

// const auth = (req,res,next) => {
//   console.log(req.query)
//   if(req.query.password==123) {
//     next()
//   }else {
//     res.sendStatus(401)
//   }
//   next()
// }



// -API -ENDPOINT -ROUTE  -REST APR
// Products collection


//Create Api POST /products
server.post('/products', (req,res) =>{
  console.log(req.body)
  products.push(req.body)
  res.status(201).json(req.body)
})

// Read GET products
server.get('/products', (req,res) =>{
  res.json(products)
  res.status(200).json(products)
})

// Read GET products by id
server.get('/products/:id', (req,res) => {
  const id = +req.params.id
  const product = products.find(p => p.id === id)
  res.status(200).json(product)
})

// PUT products by id (UPDATE) overriders data
server.put('/products/:id', (req,res) => {
  const id = +req.params.id
  const productIndex = products.findIndex(p => p.id === id)
  products.splice(productIndex,1,{...req.body, id: id})
  
  res.status(201).json()
})

// PATCH products by id (UPDATE)
server.patch('/products/:id', (req,res) => {
  const id = +req.params.id
  const productIndex = products.findIndex(p => p.id === id)
  const product = products[productIndex]
  products.splice(productIndex,1,{...product, ...req.body, id: id})
  
  res.status(201).json()
})

// DELETE products by id (DELETE) 
server.delete('/products/:id', (req,res) => {
  const id = +req.params.id
  const productIndex = products.findIndex(p => p.id === id)
  const product = products[productIndex]
  products.splice(productIndex,1)
  
  res.status(201).json(product)
})

server.put('/', (req,res) =>{
  res.json({type: 'put'})
})

server.delete('/', (req,res) =>{
  res.json({type: 'delete'})
})

server.patch('/', (req,res) =>{
  res.json({type: 'patch'})
})


server.get('/demo', (req,res) => {
  // res.status(200).send('<h1>hello world </h1>')
  res.sendFile('C:\Users\aqirl\OneDrive\Desktop\Mern\Node\index.html')
  //res.json(products)
  // res.sendStatus(200)
})



server.listen(8080, () => {
  console.log('server started...')
})

