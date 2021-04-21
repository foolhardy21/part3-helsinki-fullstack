const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./modules/person')
require('dotenv').config()

const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static('build'))

morgan.token('post',(req,res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post'))


let persons = [
  {
      "name": "Arti Hellas",
      "number": "040-44-1234567",
      "id": 1
    },
    {
      "name": "Rahul Kohli",
      "number": "089-12342111",
      "id": 2
    },
    {
      "name": "Bear Jew",
      "number": "022-49-1234567",
      "id": 3
    },
    {
      "name": "Emmanuel Skarsgard",
      "number": "067-98-1234567",
      "id": 4
    },
    {
      "name": "Harry Portman",
      "number": "067-98-198567",
      "id": 5
    }
]

app.get('/api/persons',(request, response) => {
  Person.find({}).then(persons => {
      response.json(persons)
  })
})

app.get('/api/persons/info',(request,response) => {
  const time = new Date()
  Person.find({}).then(persons => {
    response.send(`<p>Phonebook has info for ${persons.length} people</p><p>${time}</p>`)
  })
})

app.get('/api/persons/:id',(request,response) => {
  const id = request.params.id
  Person.findById(id).then(person => {
    response.send(`${person.name} ${person.number}`)
  })
})

app.delete('/api/persons/:id',(request,response) => {
  const id = request.params.id
  Person.findByIdAndRemove(id)
  .then(result => {
    response.status(204).end()
  })
  .catch(error => {
    response.status(204).json({error:'person not found'})
  })

})

app.post('/api/persons',(request,response) => {
  const person = request.body
  if(!person)
  {
    return response.status(400).json({
      error: 'body missing'
    })
  }
  if(person.name === "" || person. number === "")
  {
    return response.status(404).json({
      error: 'data missing'
    })
  }

  const personObject = new Person({
    name: person.name,
    number: person.number,
  })
  personObject.save().then(savedNote => {
      persons.concat(savedNote)
      response.json(savedNote)
  })


})

const PORT = process.env.PORT
app.listen(PORT,() => {
  console.log(`Server running on port ${PORT}`)
})
