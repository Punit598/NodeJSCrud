const express = require('express')
const bodyparser = require('body-parser')
const fs = require('fs')
const cors = require('cors')
const morgan = require('morgan')
const router = require('./routes/route')
const path = require('path')
const app = express()

app.use(function (req, res, next) {  
    res.header("Access-Control-Allow-Origin", "*");  
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");  
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');  
    next();  
    }); 
app.use(cors())

//For parsing application form
app.use(bodyparser.urlencoded({extended:false}))

//For parsing application json
app.use(bodyparser.json())


// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, '/logs/access.log'), { flags: 'a' })
 
// setup the logger
app.use(morgan('combined', { stream: accessLogStream }))

app.use(router)

const port = 3000;

app.listen(process.env.PORT || port,(err) => {

    if(err)
    console.log('Unable to start the server!')
    else
    console.log('Server started running on : ' + port)
    })
