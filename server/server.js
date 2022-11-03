const express = require('express')
const app = express();
const cors = require('./middlewares/cors')
const port = 3030;

app.use(express.json())
app.use(cors())


app.listen(port, ()=>console.log('Server listening on port ' + port))