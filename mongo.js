const mongoose = require('mongoose')

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})
const Person = mongoose.model('Person',personSchema)

const password = process.argv[2]

if(password === undefined) {
  console.log('Please provide the required arguments.')
  process.exit(1)
}

else if(process.argv.length === 5)
{
  const name = process.argv[3]
  const phoneno = process.argv[4]
  const url = `mongodb+srv://foolhardy21:${password}@cluster0.fafup.mongodb.net/phonebook-app?retryWrites=true&w=majority`
  mongoose.connect(url,{useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify: false,useCreateIndex: true})

  const person = new Person({
    name:name,
    number:phoneno
  })

  person.save().then(result => {
    console.log(`added ${result.name} number ${result.number}`)
    mongoose.connection.close()
  })
}
else if(process.argv.length === 3)
{

  const url = `mongodb+srv://foolhardy21:${password}@cluster0.fafup.mongodb.net/phonebook-app?retryWrites=true&w=majority`
  mongoose.connect(url,{useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify: false,useCreateIndex: true})
  console.log('phonebook:')
  Person.find({}).then(result => {
    result.forEach(person => {
        console.log(person.name,person.number)
    })
    mongoose.connection.close()
  })
}
