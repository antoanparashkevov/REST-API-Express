const express = require('express')
const app = express();
const cors = require('./middlewares/cors')
const mongoose = require("mongoose");
const port = 3030;
const CONNECTION_STR = 'mongodb://localhost:27017/furniture'

start();

async function start() {

    try {
        mongoose.connect(CONNECTION_STR, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
        console.log('DATABASE connected!')
    } catch (err) {
        console.error(err.message)
    }

    app.use(express.json())
    app.use(cors())
}


app.listen(port, ()=>console.log('Server listening on port ' + port))