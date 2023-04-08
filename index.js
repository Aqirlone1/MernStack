const fs = require('fs')
const express = require('express')
const { json } = require('body-parser')




const index = fs.readFileSync('index.html', 'utf-8')
const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'))
const products = data.products

const server=express()

//-----middleware-------
// server.use((req,res,next) =>{
// console.log(req.method, req.ip, req.hostname)
// next()
// })

//middleware --
const auth = (req,res,next) => {
  console.log(req.query)
  if(req.query.password==123) {
    next()
  }else {
    res.sendStatus(401)
  }
  next()
}

// server.use(auth)
//server.use(express.json())
//server.use(express.json())
//api endpoint
server.get('/',auth, (req,res) =>{
  res.json({type: 'GET'})
})

server.post('/', (req,res) =>{
  res.json({type: 'POST'})
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

