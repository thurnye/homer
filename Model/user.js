//database connection happens here

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const user = new Schema({
    name: [{
        firstName: {
            type: String,
            require: true
        },
        lastName: {
            type: String,
            require: true
        }
    }],
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        required: true
      }

  
})

//we create a model
module.exports = mongoose.model('user', user);
