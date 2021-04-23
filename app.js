const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const personsRouter = require('./controllers/persons')
app.use('/api/persons',personsRouter)
const middleware = require('./utils/middleware')
const config = require('./utils/config')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

logger.info('connecting to',config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI,{useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify: false,useCreateIndex: true})
.then(result => {
  logger.info('connected to mongoDB')
})
.catch(error => {
  logger.info(error.message)
})

app.use(cors())
app.use(express.json())
app.use(express.static('build'))
app.use(middleware.errorHandler)

morgan.token('post',(req,res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post'))

module.exports = app
