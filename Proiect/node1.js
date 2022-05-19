const express = require('express')
const cors = require('cors')
const res = require('express/lib/response')
const app = express()
//const session = require('express-session'); 
app.use(express.urlencoded({ extended: true }))
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

    res.render('reviews.ejs', { comments })
})

app.post('/reviews/new', (req, res) => {

    let dataToWrite = data
    dataToWrite['comments'].push(req.body)
    fs.writeFileSync('./data.json', JSON.stringify(dataToWrite))

    res.send(req.body)
})

app.post('/signIn', (req, res) => {
    console.log("REQUEST ON /SIGNIN")

    let sentUsername = req.body['Username']
    let sentPassword = req.body['Password']
    let usersData = data['users']

    let foundUsername = false

    for (let user of usersData) {
        if (user["Username"] == sentUsername && user["Password"] == sentPassword) {
            res.send(sentUsername)
            return
        }
        else if (user["Username"] == sentUsername)
            foundUsername = true
    }

    if (foundUsername == true)
        res.send("Parola gresita!")
    else
        res.send("Cont inexistent!")
})


app.post('/signUp', (req, res) => {
    console.log("REQUEST ON /SIGUP")

    let sentUsername = req.body['Username']
    let sentPassword = req.body['Password']
    let usersData = data['users']

    let foundUsername = false

    for (let user of usersData)
        if (user['Username'] == sentUsername) {
            res.send("Nume de utilizator deja existent!")
            return
        }

    let newUser = {
        "Username": sentUsername,
        "Password": sentPassword
    }

    res.send(sentUsername)

    let dataToWrite = data
    dataToWrite['users'].push(newUser)
    fs.writeFileSync('./data.json', JSON.stringify(dataToWrite))
})

