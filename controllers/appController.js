// Import contact model
Stocks = require('../models/stockSchema');

// Handle index actions
exports.index = function (req, res) {
    Stocks.get(function (err, stocks) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Contacts retrieved successfully",
            data: stocks
        });
    });
};

// Handle create contact actions
exports.new = function (req, res) {
    var stock = new Stocks();
    stock.name = req.body.name;
    stock.symbol = req.body.symbol;
    stock.volume = req.body.volume;
    stock.currency = req.body.currency;
    stock.price = req.body.price;
    stock.tradingDate = req.body.tradingDate;
// save the stock and check for errors
    stock.save(function (err) {
        // if (err)
        //     res.json(err);
    res.json({
            message: 'New stock created!',
            data: stock
        });
    });
};

// Handle view contact info
exports.view = function (req, res) {
    Stocks.findById(req.params.name, function (err, stock) {
        if (err)
            res.send(err);
        res.json({
            message: 'Contact details loading..',
            data: stock
        });
    });
};

// Handle update contact info
exports.update = function (req, res) {
    Stocks.findById(req.params.stock_id, function (err, stock) {
        if (err)
            res.send(err);
        stock.name = req.body.name;
        stock.symbol = req.body.symbol;
        stock.volume = req.body.volume;
        stock.currency = req.body.currency;
        stock.price = req.body.price;
        stock.tradingDate = req.body.tradingDate;
        // save the stock and check for errors
        stock.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Stock Info updated',
                data: stock
            });
        });
    });
};

// Handle delete contact
exports.delete = function (req, res) {
    Contact.remove({
        _id: req.params.stock_id
    }, function (err, stock) {
        if (err)
            res.send(err);
    res.json({
            status: "success",
            message: 'Stock deleted'
        });
    });
};