const mongoose = require('mongoose')

if(process.argv.length === 5)
{
  console.log('to be added')
  const password = process.argv[2]
  const name = process.argv[3]
  const phoneno = process.argv[4]
  const url = `mongodb+srv://foolhardy21:${password}@cluster0.fafup.mongodb.net/phonebook-app?retryWrites=true&w=majority`
  mongoose.connect(url,{useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify: false,useCreateIndex: true})

  const personSchema = new mongoose.Schema({
    name: String,
    number: String
  })

  const Person = mongoose.model('Person',personSchema)

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
  console.log('show all')
}
else {
  console.log('Type the required arguments.')
  process.exit(1)
}
