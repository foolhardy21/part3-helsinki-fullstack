const mongoose = require('mongoose')

require('dotenv').config()

const url = process.env.MONGODB_URL

mongoose.connect(url,{useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify: false,useCreateIndex: true})
.then(result => {
  console.log('connected to mongoDB')
})
.catch(error => {
  console.log(error.message)
})

const personSchema = new mongoose.Schema({
  name: {type:String,
    required:true,
  unique:true},
  number: {type:String,
  required:true},
})

const Person = mongoose.model('Person',personSchema)
personSchema.set('toJSON',{
  transform: (document,returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = Person
