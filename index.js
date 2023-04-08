const fs = require('fs')
const express = require('express')
const { json } = require('body-parser')
const  morgan = require('morgan')




const index = fs.readFileSync('index.html', 'utf-8')
const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'))
const products = data.products

const server=express()
server.use(express.json())

const createProduct = (req, res) => {
  products.push(req.body)
  req.status(201).json(req.body)
}

const getAllProducts =  (req,res) =>{
  res.json(products)
  res.status(200).json(products)
}

const getProduct =  (req,res) => {
  const id = +req.params.id
  const product = products.find(p => p.id === id)
  res.status(200).json(product)
}

const replaceProduct =  (req,res) => {
  const id = +req.params.id
  const productIndex = products.findIndex(p => p.id === id)
  products.splice(productIndex,1,{...req.body, id: id})
  
  res.status(201).json()
}

const updateProduct =  (req,res) => {
  const id = +req.params.id
  const productIndex = products.findIndex(p => p.id === id)
  const product = products[productIndex]
  products.splice(productIndex,1,{...product, ...req.body, id: id})
  
  res.status(201).json()
}

const deleteProduct =  (req,res) => {
  const id = +req.params.id
  const productIndex = products.findIndex(p => p.id === id)
  const product = products[productIndex]
  products.splice(productIndex,1)
  
  res.status(201).json(product)
}

// CRUD

server.post('/products', createProduct)
server.get('/products', getAllProducts)
server.get('/products/:id', getProduct)
server.put('/products/:id', replaceProduct)
server.patch('/products/:id', updateProduct)
server.delete('/products/:id', deleteProduct)



server.listen(8080, () => {
  console.log('server started...')
})

