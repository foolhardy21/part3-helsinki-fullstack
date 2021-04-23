const personsRouter = require('express').Router()
const Person = require('../modules/person')

personsRouter.get('/',(request, response) => {
  Person.find({}).then(persons => {
      response.json(persons)
  })
})

personsRouter.get('/info',(request,response) => {
  const time = new Date()
  Person.find({}).then(persons => {
    response.send(`<p>Phonebook has info for ${persons.length} people</p><div>${time}</div>`)
  })
})

personsRouter.get('/:id',(request,response,next) => {
  const id = request.params.id
  Person.findById(id).then(person => {
    response.json(person)
  })
  .catch(error => next(error))
})

personsRouter.delete('/:id',(request,response,next) => {
  const id = request.params.id
  Person.findByIdAndRemove(id)
  .then(result => {
    response.status(204).end()
  })
  .catch(error => next(error))
})

personsRouter.put('/:id',(request,response,next) => {

  Person.findByIdAndUpdate(request.params.id,request.body,{new:true,runValidators:true})
  .then(updatedPerson => {
    response.json(updatedPerson)
  })
  .catch(error => next(error))
})

personsRouter.post('/',(request,response,next) => {
  const person = request.body

  const personObject = new Person({
    name: person.name,
    number: person.number,
  })
  personObject.save().then(savedPerson => {
      persons.concat(savedPerson)
      response.json(savedPerson)
  })
  .catch(error => next(error))
})

module.exports = personsRouter
