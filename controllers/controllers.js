let Users = require('../models/userSchema');
const Shares = require("../models/subscriber");

module.exports.userSignup = function(req,res,next) {
    if (req.method == 'POST') {
        var user = new Users({
            username: req.body.username,
            firstName: req.body.firstname,
            lastName: req.body.lastname
        });
        user.save( (err, user) => {
            if(err) return res.status(500).send(err);
            return res.status(200).json(user);
        });
    } 
};

module.exports.sharesLookup = (req, res, next) => {
    Shares.find( {}, (error, subscribers) => {
        if (error) next(error);
        req.data = subscribers;
        next();
    });
}