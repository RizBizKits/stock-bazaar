let mongoose = require('mongoose')

var stockSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    symbol: {
        type: String,
        unique: true
    },
    volume: {
        type: Number,
    },
    currency: {
        type: String,
    },
    price: {
        type: String
    },
    tradingDate: {
        type: Date
    }
})


var Stocks = module.exports = mongoose.model('stock', stockSchema);

module.exports.get = function (callback, limit) {
    Stocks.find(callback).limit(limit);
}
