#!/usr/bin/env node

// Step 1 and step 2 code goes here
const express = require('express')

// create an express, aka web server, instance
const app = express()

const port = 6297

app.get('/hw2', (req, res) => {
  res.send('<h1>hello world</h1>')
})
app.listen(port, () => {
  console.log(`listening on port: ${port}`)
})
app.use(express.static(`${__dirname}/dist`))
app.get('/response', (req, res) => {
  res.send(`${req.query.id}`)
})
app.get('/add-response', (req, res) => {
  var arr = new Array();
  arr.push(`${req.query.addId}`);
  arr.push(`${req.query.addName}`);

  res.send(arr);
})
