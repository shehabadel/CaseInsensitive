const express = require('express');
const bp = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const routes = require('./human.router');

const port = process.env.NODE_ENV || 3000;

const app = express();
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }))
app.use(morgan('dev'));

app.use('/', routes);

mongoose
    .connect("mongodb://localhost:27017/casein", { useNewUrlParser: true })
    .then(() => {
        console.log("Connected to Database")
    })
    .catch(()=>
    {
        console.log("Can't connect to this port, please use another port")
    })

app.listen(port, () => {
    console.log(`Server running correctly on port ${port}`)
})