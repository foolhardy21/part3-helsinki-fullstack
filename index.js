const express = require('express')
const app = express()
app.use(express.json())

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
    }
]

app.get('/api/persons',(request, response) => {
  response.json(persons)
})

app.get('/info',(request,response) => {
  const info = `Phonebook has info for ${persons.length} people.`
  const time = new Date()
  response.send(`<p>${info}</p><p>${time}</p>`)
})

app.get('/api/persons/:id',(request,response) => {
  const id = request.params.id
  const person = persons.find(p => p.id.toString() === id)
  if(person)
  {
      response.send(`<p>${person.name}</p><p>${person.number}</p>`)
  }
  else {
    response.status(404).end()
  }
})

app.delete('/delete/persons/:id',(request,response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)
  response.status(204).end()
})

app.post('/api/postperson',(request,response) => {
  const id = Math.floor(Math.random()*1000)
  const person = request.body
  if(!person)
  {
    return response.status(400).json({
      error: 'body missing'
    })
  }
  if(person.name === "" || person. number === "")
  {
    return response.status(400).json({
      error: 'data missing'
    })
  }
  if(persons.find(p => p.name === person.name))
  {
    return response.status(400).json({
      error: 'name must be unique'
    })
  }
  const note = {
    name: person.name,
    number: person.number,
    id: id
  }
  persons.concat(note)
  response.json(note)
})

const PORT = 3001
app.listen(PORT,() => {
  console.log(`Server running on port ${PORT}`)
})
