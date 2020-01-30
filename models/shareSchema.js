let mongoose = require('mongoose')


// var shareSchema = new mongoose.Schema({
//     companyName: {
//         type: mongoose.Schema.Types.ObjectId, 
//         ref: 'Stock'
//     },
//     belongsTo: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User'
//     },
//     amount: {
//         type: Number
//     }
// })


var shareSchema = new mongoose.Schema({
    companyName: {
        type: String, 
    },
    belongsTo: {
        type: String
    },
    amount: {
        type: Number
    }
})


var Shares = module.exports = mongoose.model('Share', shareSchema);

module.exports.get = function (callback, limit) {
    Shares.find(callback).limit(limit);
}
