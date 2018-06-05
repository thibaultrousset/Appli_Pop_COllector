
// I will use express 
const express = require('express');
// I will use body parser
const bodyparser = require('body-parser');

const cors = require('cors');

// I set the back port to 3000
const PORT = 3000;

// I use the file api.js
const api = require('./routes/api')

// The app use express functionnalitys
const app = express();

// The app use cors functionnalitys
app.use(cors())


// The app use express  static functionnality with the folder static
app.use('/static', express.static('./static'));

// The app use bodyparser functionnalitys
app.use(bodyparser.json())

// The app get routes with api before
app.use('/api', api)


// app listen from port 3000 if compiled
app.listen(PORT, function () {
    console.log('server running on localhost' + PORT);
})