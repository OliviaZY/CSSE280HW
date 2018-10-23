const express = require('express');

const bodyParser = require('body-parser'); 

const contactRoutes = require('./routes/contacts');

const app = express();

require('./models/db');

const port = 3000;

// Only parse JSON bodies
app.use(bodyParser.json()); 

app.use(bodyParser.urlencoded({extended: true})); 

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/contacts', contactRoutes);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});