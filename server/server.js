import express from 'express'
import cors from 'cors'
import { readdirSync } from 'fs'
import mongoose from 'mongoose'

const morgan = require('morgan')
require('dotenv').config()

// create express app
const app = express()

// db connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log('**DB CONNECTED**'))
  .catch((err) => console.log('DB CONNECTION ERR=>', err))

// apply middlewares

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use((req, res, next) => {
  console.log(`this is my own middleware`)
  next()
})

// route
readdirSync('./routes').map((r) => {
  return app.use('/api/v1', require(`./routes/${r}`))
})

// port
const port = process.env.PORT || 8000

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})