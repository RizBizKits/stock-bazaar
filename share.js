const fetch = require('node-fetch');
const new_port = 9000;
const express = require('express');
const app = express();
const shareRouter = express.Router();
const Datastore = require('nedb');
app.engine('html', require('ejs').renderFile);

const database = new Datastore('database.db');
const sharesDB = new Datastore('myShares.db');

sharesDB.loadDatabase();
database.loadDatabase();


app.use(express.static('public'));
app.use(express.json()); 
app.use(express.urlencoded({ extended: false}));

app.get('/index.html', function(req, res){
    res.sendFile(_dirname + "/" + "index.html");
});

app.get('/stocks', async (req, res) => {

    const company = req.query.stock_finder;
    console.log(company);

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

    res.json(fdata);

    database.insert(fdata, function(err, doc) {
        console.log('Inserted', doc, 'with ID', doc._id);
    });

});


app.post('/transaction/buy', (req, res) => {
    var share = req.body.transaction_finder;
    const shareJson =  JSON.stringify(share);
    console.log(shareJson);

    database.findOne({symbol: share}, async (err, docs) => { 
        if(null === docs){
        var companyAdd = req.body.transaction_finder;
        console.log(companyAdd);

        const companyAdd_url = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" + companyAdd + "&interval=5min&apikey=J8X1G4JTKSYRC1T5"
        console.log(companyAdd_url);

        const companyAdd_response = await fetch(companyAdd_url);
        const companyAdd_data = await companyAdd_response.json();

        const symbol_namee = companyAdd_data["Global Quote"]["01. symbol"];

        const companyAddInfo_url = "https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=" + symbol_namee + "&apikey=J8X1G4JTKSYRC1T5"
        const companyAddInfo_response = await fetch(companyAddInfo_url);
        const companyAddInfo_data = await companyAddInfo_response.json();

        let v = companyAddInfo_data['bestMatches'];
        let s = companyAdd_data["Global Quote"];

        const dataa = Object.assign( s, (v.length > 0 ? v[0] : {}) );

        const ndata = {};
        Object.keys(dataa).forEach(key => {
            ndata[key.split(". ")[1].replace(/ /g,"_")] = dataa[key];
        });

        database.insert(ndata, function(err, doc) {
            console.log('Inserted', doc, 'with ID', doc._id);
            var i = doc.volume;
            console.log(i);
            let buy = ++i;
            database.update({symbol: share}, {$set: {volume: buy}}, {});

        });

        res.render(__dirname + '/public/bought.html', ndata);


        } else {

            var obj = docs.volume;
            console.log(obj);
            var finobj = ++obj;

            console.log(docs);

            database.update({
                symbol: share
              }, {
            $set: {
              volume: finobj
            }
          }, {});

          console.log(docs);
          res.render(__dirname + '/public/bought.html');

        }
    
    });

});


app.post('/transaction/sell', (req, res) => {
    var share = req.body.transaction_finder;
    const shareJson =  JSON.stringify(share);
    console.log(shareJson);

    database.findOne({symbol: share}, async (err, docs) => { 
        if(null === docs){
        var companyAdd = req.body.transaction_finder;
        console.log(companyAdd);

        const companyAdd_url = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" + companyAdd + "&interval=5min&apikey=J8X1G4JTKSYRC1T5"
        console.log(companyAdd_url);

        const companyAdd_response = await fetch(companyAdd_url);
        const companyAdd_data = await companyAdd_response.json();

        const symbol_namee = companyAdd_data["Global Quote"]["01. symbol"];

        const companyAddInfo_url = "https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=" + symbol_namee + "&apikey=J8X1G4JTKSYRC1T5"
        const companyAddInfo_response = await fetch(companyAddInfo_url);
        const companyAddInfo_data = await companyAddInfo_response.json();

        let v = companyAddInfo_data['bestMatches'];
        let s = companyAdd_data["Global Quote"];

        const dataa = Object.assign( s, (v.length > 0 ? v[0] : {}) );

        const ndata = {};
        Object.keys(dataa).forEach(key => {
            ndata[key.split(". ")[1].replace(/ /g,"_")] = dataa[key];
        });

        database.insert(ndata, function(err, doc) {
            console.log('Inserted', doc, 'with ID', doc._id);
            var i = doc.volume;
            console.log(i);
            let buy = --i;
            database.update({symbol: share}, {$set: {volume: buy}}, {});

        });

        res.render(__dirname + '/public/sell.html', ndata);


        } else {

            var obj = docs.volume;
            console.log(obj);
            var finobj = ++obj;

            console.log(docs);

            database.update({
                symbol: share
              }, {
            $set: {
              volume: finobj
            }
          }, {});

          console.log(docs);
          res.render(__dirname + '/public/sell.html');

        }
    
    });

});


app.listen(new_port, function() { console.log('listening on ' + new_port)});

