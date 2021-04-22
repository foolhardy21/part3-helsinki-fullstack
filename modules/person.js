const mongoose = require('mongoose')

require('dotenv').config()

const url = process.env.MONGODB_URI
console.log(url)
mongoose.connect(url,{useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify: false,useCreateIndex: true})
.then(result => {
  console.log('connected to mongoDB')
})
.catch(error => {
  console.log(error.message)
})

const personSchema = new mongoose.Schema({
  name: {
    type:String,
    required:true,
    unique:true,
    minlength:3},
  number: {
    type:String,
    required:true,
    minlength:8},
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
