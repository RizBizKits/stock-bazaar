const fetch = require('node-fetch');

const express = require('express');
const mongoose = require("mongoose");
var bodyParser = require('body-parser');
// let apiRoutes = require("./api-routes");


const app = express();

const userShare = require("./models/userSchema");
const stockDB = require("./models/stockSchema");
const shareDB = require("./models/shareSchema");

let apiRoutes = require("./routes/appRoutes");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(bodyParser.json());

app.set('view engine', 'ejs');

// Connect to Mongoose and set connection variable
mongoose.connect('mongodb://localhost/bazaardb', { useNewUrlParser: true});
var db = mongoose.connection;

// Added check for DB connection
if(!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")


const new_port = 8000;

// Send message for default URL
app.get('/', (req, res) => res.render('sample'));

app.get('/findStock', async (req, res) => {

    stockDB.findOne({'symbol': req.query.stock_finder }, async (err, result) => {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        if (result) {
            // we have a result
            res.render("shares", { 'shares': result});
            console.log("it lives!!!!!!!!");
        } else {
            const company = req.query.stock_finder;
            // console.log(company);
        
            const stock_url = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" + company + "&interval=5min&apikey=J8X1G4JTKSYRC1T5"
            console.log(stock_url);
        
            const stock_response = await fetch(stock_url);
            const stock_data = await stock_response.json();
        
            const symbol_name = stock_data["Global Quote"]["01. symbol"];
            
            const company_url = "https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=" + symbol_name + "&apikey=J8X1G4JTKSYRC1T5"
            const company_response = await fetch(company_url);
            const company_data = await company_response.json();
        
            let v = company_data['bestMatches'];
            let s = stock_data["Global Quote"];
        
            const data = Object.assign( s, (v.length > 0 ? v[0] : {}) );
        
            const fdata = {};
            Object.keys(data).forEach(key => {
                fdata[key.split(". ")[1].replace(/ /g,"_")] = data[key];
            });

            // a document instance
            var stockInstance = new stockDB(fdata);

            stockInstance.save(function (err, stockDeets) {
                if (err) return console.error(err);
                console.log(stockDeets.name + " saved to the Stock DB.");
              });
            res.render("shares", { 'shares': fdata});
        }
    });
});

app.get('/shares', async (req, res) => {
    res.render("myShares", { 'shares': res});
});



// app.use(express.static('public'));

app.use(express.static(__dirname + '/assets'));


// Use Api routes in the App
app.use('/api', apiRoutes);

// Launch app to listen to specified port
app.listen(new_port, function () {
    console.log("Running RestHub on port " + new_port);
});

