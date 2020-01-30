// Import contact model
Shares = require('../models/shareSchema');

// Handle create contact actions
exports.add_new_share = function (req, res) {
    var shares = new Shares();
    shares.companyName = req.body.companyName;
    shares.belongsTo = req.body.belongsTo;
    shares.amount = req.body.amount;
    // save the shares and check for errors
    shares.save(function (err) {
        // if (err)
        //     res.json(err);
    res.json({
            message: 'New share created!',
            data: shares
        });
    });
};

// Handle create contact actions
exports.view_all_shares = function (req, res) {
    Shares.get(function (err, shares) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Contacts retrieved successfully",
            data: shares
        });
    });
};


// Handle update contact info
exports.buy_share = function (req, res) {
    Shares.findById(req.params.share_id, function (err, shares) {
        if (err)
            res.send(err);
        shares.amount = req.body.amount;
        // save the stock and check for errors
        shares.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Stock Info updated',
                data: shares
            });
        });
    });
};