const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

require('./model/db');

const index = require('./routes/index');
const books = require('./routes/books');


const app = express();

app.use(cors());

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(cookieParser());

app.use('/', index);
app.use('/books', books);

module.exports = app;