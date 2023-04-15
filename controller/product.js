const fs = require('fs')
const model = require('../model/product')
const mongoose = require('mongoose');
const Product = model.Product


exports.createProduct = async(req, res) => {
  
  const product = new Product(req.body);
   await product.save()
   res.status(201).json(req.body)
}

exports.getAllProducts =  async  (req,res) =>{
   const products = await Product.find()
  res.json(products)
}

exports.getProduct = async (req,res) => {
  const id = req.params.id
  const product = await Product.findById(id)
  res.json(product)
}

exports.replaceProduct = async (req,res) => {
  const id = req.params.id
  const doc = await Product.findOneAndReplace({_id: id}, req.body)  
  res.status(201).json(doc)
}

exports.updateProduct =  (req,res) => {
  const id = req.params.id
  const productIndex = products.findIndex(p => p.id === id)
  const product = products[productIndex]
  products.splice(productIndex,1,{...product, ...req.body, id: id})
  
  res.status(201).json()
}

exports.deleteProduct =  (req,res) => {
  const id = req.params.id
  const productIndex = products.findIndex(p => p.id === id)
  const product = products[productIndex]
  products.splice(productIndex,1)
  
  res.status(201).json(product)
}
