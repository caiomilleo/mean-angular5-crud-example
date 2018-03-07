const express = require ('express')
const router = express.Router();
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors');

const product = require('./routes/product')

const app = express();

mongoose.connect('mongodb://localhost/mean-angular5-crud-example')

app.use(cors({ origin: '*' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/product', product)

app.use(express.static(__dirname + 'dist'));

app.listen(8080, () => {
    console.log('Listening 8080');
});

module.exports = app;