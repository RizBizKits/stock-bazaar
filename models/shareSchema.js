let mongoose = require('mongoose')

var shareSchema = new mongoose.Schema({
    companyName: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Stock'
    },
    belongsTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    Amount: {
        type: Number
    }
})


module.exports = mongoose.model('Share', shareSchema);
