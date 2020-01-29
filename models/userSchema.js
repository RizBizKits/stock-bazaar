let mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
    username: {
        type: String,
        index: true,
        required: true,
        unique: true
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    }
})

module.exports = mongoose.model('User', userSchema);

