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
	}
]

app.get('/', (req, res) => {
	res.send('<h1>Home</h1>')
})

app.get('/api', (req, res) => {
	res.send('<h1>Phonebook</h1>')
})

app.get('/api/persons', (req, res) => {
	res.json(persons)
})

const PORT = 3001
app.listen(PORT, () => {
	console.log(`Server running in port ${PORT}`)
})
