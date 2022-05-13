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

const data = require('./data.json')
const fs = require('fs')


const server = app.listen(8080, () => {
    console.log("LISTENING")
})

app.get('/reviews', (req, res) => {
    console.log("REQUEST ON /REVIEWS")
    let comments = data["comments"]
    
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
  
    let dataToWrite = data
    dataToWrite['comments'].push(req.body)
    fs.writeFileSync('./data.json', JSON.stringify(dataToWrite))
    
    res.send(req.body)
})

