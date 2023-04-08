const fs = require('fs')

//const index = fs.readFileSync('index.html', 'utf-8')
const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'))
const users = data.users


exports.createProduct = (req, res) => {
  users.push(req.body)
  req.status(201).json(req.body)
}

exports.getAllProducts =  (req,res) =>{
  res.json(users)
  res.status(200).json(users)
}

exports.getProduct =  (req,res) => {
  const id = +req.params.id
  const user = users.find(p => p.id === id)
  res.status(200).json(user)
}

exports.replaceProduct =  (req,res) => {
  const id = +req.params.id
  const userIndex = users.findIndex(p => p.id === id)
  users.splice(userIndex,1,{...req.body, id: id})
  
  res.status(201).json(userIndex)
}

exports.updateProduct =  (req,res) => {
  const id = +req.params.id
  const userIndex = users.findIndex(p => p.id === id)
  const user = users[userIndex]
  users.splice(userIndex,1,{...user, ...req.body, id: id})
  
  res.status(201).json(user)
}

exports.deleteProduct =  (req,res) => {
  const id = +req.params.id
  const userIndex = users.findIndex(p => p.id === id)
  const user = users[userIndex]
  users.splice(userIndex,1)
  
  res.status(201).json(user)
}
