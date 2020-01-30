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
    latest_trading_day: {
        type: Date
    },
    open: {
        type: String
    },
    high: {
        type: String
    },
    low: {
        type: String
    },
    previous_close: {
        type: String
    },
    change: {
        type: String
    },
    change_percent: {
        type: String
    },
    type: {
        type: String
    },
    region: {
        type: String
    },
    marketOpen: {
        type: String
    },
    marketClose: {
        type: String
    },
    timezone: {
        type: String
    },
    matchScore: {
        type: String
    }
})


var Stocks = module.exports = mongoose.model('stock', stockSchema);

module.exports.get = function (callback, limit) {
    Stocks.find(callback).limit(limit);
}
