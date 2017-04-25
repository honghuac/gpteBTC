var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var cors = require('cors');

function BTCQuery() {
    var query = new express.Router();
    var loc = 'https://api.blockcypher.com/v1/btc/main';
    var apiloc = 'https://api-2445581559610.staging.apicast.io:443/v1/btc/main?user_key=cd9f81747d0c365cda0233f3217b76df'
    var height = '454448';

    query.use(cors());
    query.use(bodyParser());

    console.log('Listening for Blockchain data queries')

    query.get('/', function(req, res) {

        console.log(new Date(), 'Bitcoin Service GET / req.query=', req.query);

        var selection = req.query.selection;

        console.log("req.body=" + JSON.stringify(req.body));

        console.log("selection = " + selection);

        if (selection == "btcledger_direct") {
            console.log('>> Direct connection to Bitcoin API');

            request(loc, function(error, response, body) {
                console.log("Body received from API call\n" + body);

                var stuff = JSON.parse(body);

                var output = {
                        "source" : "Direct connection to Bitcoin API",
                        "data" : stuff
                }

                console.log("Output sending to the client\n" + JSON.stringify(output));

                res.json(output);
            })

        } else {
            console.log('>> Calling via 3Scale: ');

            request(apiloc, function(error, response, body) {
                console.log("Body received from API call\n" + body);

                var stuff = JSON.parse(body);

                var output = {
                        "source" : "Called via 3Scale",
                        "data" : stuff
                }

                console.log("Output sending to the client\n" + JSON.stringify(output));

                res.json(output);
            })
        }

    });

    return query;
}

module.exports = BTCQuery;
