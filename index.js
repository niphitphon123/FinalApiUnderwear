const express = require('express')
const app = express()
var cors = require('cors')
const fs = require('fs');
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

const books = require("./db")
const foods = require("./products")
const sizes = require("./size")

const saveBook = (data) => {
    let results = JSON.stringify(data);
    fs.writeFileSync("db.json", results)
}

app.get('/books', (req, res) => {
    books.map(x => {
        x.name = foods.find(f=> f.id == x.productsId)?.name
    })
    res.send(books)
})

app.get('/books/:id', (req, res) => {
    res.send(books.find(x => x.id == req.params.id))
})

app.post('/books', (req, res) => {
    req.body.id = Math.max(...books.map(o => o.id), 0) + 1;
    books.push(req.body)
    saveBook(books)
    res.status(201).json(req.body)
})

app.put('/books/:id', (req, res) => {
    const updateIndex = books.findIndex(x => x.id == req.params.id)
    Object.assign(books[updateIndex], req.body)
    saveBook(books)
    res.status(200).json(req.body)
})

app.delete('/books/:id', (req, res) => {
    const deletedIndex = books.findIndex(book => book.id == req.params.id)
    if (deletedIndex > -1)
        books.splice(deletedIndex, 1)
    saveBook(books)
    res.status(204).send()
})



app.get('/foods', (req, res) => {
    res.send(foods)
})

app.get('/foods/:id', (req, res) => {
    res.send(foods.find(x => x.id == req.params.id))
})

app.post('/foods', (req, res) => {
    req.body.id = Math.max(...foods.map(o => o.id), 0) + 1;
    foods.push(req.body)
    saveBook(foods)
    res.status(201).json(req.body)
})

app.put('/foods/:id', (req, res) => {
    const updateIndex = foods.findIndex(x => x.id == req.params.id)
    Object.assign(foods[updateIndex], req.body)
    saveBook(foods)
    res.status(200).json(req.body)
})

app.delete('/foods/:id', (req, res) => {
    const deletedIndex = foods.findIndex(foods => foods.id == req.params.id)
    if (deletedIndex > -1)
        foods.splice(deletedIndex, 1)
    saveBook(foods)
    res.status(204).send()
})
app.listen(3000, () => {
    console.log('Start server at port 3000.')
})


