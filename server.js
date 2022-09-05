
require('dotenv').config()
const multer = require('multer')
const express = require("express")
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const File = require('./models/File')

const app = express()
app.set('view engine', 'ejs')

const upload = multer({ dest:"uploads"})

mongoose.connect(process.env.DATABASE_URL)

app.get("/", (req,res) => {
  res.render('index')

})

app.post("/upload", upload.single('file'), async (req,res) =>{
  const fileData = {
    path: req.file.path,
    originalName: req.file.originalName
  }
  if (req.body.password != null && req.body.password !== ""){
    fileData.password = await bcrypt.hash(req.body.password, 10)
  }

  const file = await File.create(fileData)
  console.log(file)
})

app.listen(process.env.PORT)