const express = require('express')

const cors = require('./middlewares/cors')
const mongoose = require("mongoose");

const port = 3030;
const CONNECTION_STR = 'mongodb://localhost:27017/furniture'

//Controllers...
const authController = require('./controllers/authController')
const dataController = require('./controllers/dataController')
start();

async function start() {
    const app = express();

    try {
       await mongoose.connect(CONNECTION_STR)
        console.log('DATABASE connected!')
    } catch (err) {
        console.error(err.message)
    }

    app.use(express.json())
    app.use(cors())
    
    app.get('/', (req,res)=>{
       res.json({
           message: 'REST service operational!'
       })
    });
    app.use('/users', authController)
    app.use('/data', dataController)
    app.listen(port, ()=>console.log('Server listening on port ' + port))
}


