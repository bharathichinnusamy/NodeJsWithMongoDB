const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const exhbs = require('express-handlebars')
const dbo = require('./db')
const ObjectId = dbo.objectID

app.engine('hbs', exhbs.engine(
    { layoutsDir: 'views/', defaultLayout: 'main', extname: 'hbs' }
))
app.set('view engine', 'hbs')
app.set('views', 'views')
app.use(bodyparser.urlencoded())

app.get('/', async (req, res) => {
    var hello = "success"
    const database = await dbo.getDatabase()
    const collection = database.collection('Books')
    const curse = collection.find({})
    const books = await curse.toArray()
    let edit_id, edit_book
    if (req.query.edit_id) {
        edit_id = req.query.edit_id
        edit_book = await collection.findOne({ _id: new ObjectId(edit_id) })
        console.log(edit_book)
    }

    if (req.query.delete_id) {
        let delete_id = req.query.delete_id
        await collection.deleteOne({ _id: new ObjectId(delete_id) })
        return res.redirect('/')

    }

    res.render('main', { hello, books, edit_id, edit_book })

})
app.post('/store_books', async (req, res) => {
    const database = await dbo.getDatabase()
    const collection = database.collection('Books')
    let book = { title: req.body.title, author: req.body.author }
    //console.log(book)
    await collection.insertOne(book)
    return res.redirect('/')


})
app.post('/update_books/:edit_id', async (req, res) => {
    const database = await dbo.getDatabase()
    const collection = database.collection('Books')
    let book = { title: req.body.title, author: req.body.author }
    let edit_id = req.params.edit_id
    await collection.updateOne({ _id: new ObjectId(edit_id) }, { $set: book })
    return res.redirect('/')


})
app.listen(3000)