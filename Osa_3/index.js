const express = require('express')
const app = express()

let persons = [
  {
    name: "Arto Hellas",
    number: "050-12312312",
    id: 1
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3
	},
	{
		name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4
	},
	{
		name: "Mary Poppins",
    number: "39-23-6422122",
    id: 5
	}
]

app.get('/', (req, res) => {
	res.send('<h1>Home</h1>')
})

app.get('/info', (req, res) => {
	const numberOfPersons = persons.length
	const timeStamp = new Date();

	res.send(`<p>Phonebook has info for ${numberOfPersons} people</p>
		<p>${timeStamp}</p>`)
})

app.get('/api', (req, res) => {
	res.send(`<h1>Api</h1>`)
})

app.get('/api/persons', (req, res) => {
	res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
	const id = Number(req.params.id)
	const person = persons.find(person => person.id === id)
	
	if(person) {
		res.json(person)
	} else {
		res.status(404).end()
	}
})

const PORT = 3001
app.listen(PORT, () => {
	console.log(`Server running in port ${PORT}`)
})
