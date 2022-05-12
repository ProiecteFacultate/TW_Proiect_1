const express = require('express')
const cors = require('cors')
const res = require('express/lib/response')
const app = express()
app.use(express.urlencoded({extended : true}))
app.use(express.json())
app.set('view engine', 'ejs')
app.use(express.static('html'))
app.use('/css', express.static(__dirname + '/css'))
app.use('/Images', express.static(__dirname + '/Images'))
app.use('/js', express.static(__dirname + '/js'))
app.use(cors())

let comments = [
    {
        'id' : 1,
        'Author' : "John Lenn",
        'Comment': "This is a comment"
    },
    {
        'id' : 2,
        'Author' : "Mark Lenn",
        'Comment': "This is"
    },
    {
        'id' : 3,
        'Author' : "Ann Kerm",
        'Comment': "Not on"
    }
]

const server = app.listen(8080, () => {
    console.log("LISTENING")
})

app.get('/reviews', (req, res) => {
    console.log("REQUEST ON /REVIEWS")
    res.render('reviews.ejs', {comments})
})

app.post('/reviews/new', (req, res) => {
    console.log("REQUEST ON /REVIEWS/NEW")
    const body = req.body
    let newCom = {
        'id': comments.length + 1,
        'Author' : body['name'],
        'Comment' : body['comment']
    }
    comments.push(newCom)
    res.render('reviews.ejs', {comments})
})

app.post('/test', (req, res) => {
    console.log(req.body)
    res.send(req.body)
})

