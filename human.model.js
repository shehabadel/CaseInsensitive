const mongoose = require('mongoose');

const humanSchema = new mongoose.Schema({
    name:{
        type: String
    },
    talents:{
        type:[String]
    }
});

const Human = mongoose.model('Human', humanSchema);
module.exports = Human;