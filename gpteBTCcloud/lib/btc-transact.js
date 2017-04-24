var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var cors = require('cors');

function BTCTransact() {
    var query = new express.Router();
    var loc1 = 'https://api.blockcypher.com/v1/btc/main/txs/f854aebae95150b379cc1187d848d58225f3c4157fe992bcd166f58bd5063449';
    var loc2 = 'https://api.blockcypher.com/v1/btc/main/txs/583910b7bf90ab802e22e5c25a89b59862b20c8c1aeb24dfb94e7a508a70f121'
    var loc3 = 'https://api.blockcypher.com/v1/btc/main/txs/279ccbbab8605390a85fe6f0e4fb04ec1946ee6033054b16fec72e1304742d5d'

//    var height = '454448';

    query.use(cors());
    query.use(bodyParser());

    console.log('Listening for Bitcoin transaction data queries')

    query.get('/', function(req, res) {

        console.log(new Date(), 'Bitcoin Service GET / req.query=', req.query);

        var selection = req.query.selection;

        console.log("req.body=" + JSON.stringify(req.body));

        console.log("selection = " + selection);

        if (selection == "btc_t1") {
            console.log('>> Direct connection to Bitcoin API');

            request(loc1, function(error, response, body) {
                console.log("Body received from API call\n" + body);

                var stuff = JSON.parse(body);

                var output = {
                        "source" : "Direct connection to Bitcoin API",
                        "data" : stuff
                }

                console.log("Output sending to the client\n" + JSON.stringify(output));

                res.json(output);
            }) // end request

        } else if (selection == "btc_t2") {
            console.log('>> Direct connection to Bitcoin API');

            request(loc2, function(error, response, body) {
                console.log("Body received from API call\n" + body);

                var stuff = JSON.parse(body);

                var output = {
                        "source" : "Direct connection to Bitcoin API",
                        "data" : stuff
                }

                console.log("Output sending to the client\n" + JSON.stringify(output));

                res.json(output);
            }) // end request
        } // end else if
        else {
          console.log('>> Direct connection to Bitcoin API');

          request(loc3, function(error, response, body) {
              console.log("Body received from API call\n" + body);

              var stuff = JSON.parse(body);

              var output = {
                      "source" : "Direct connection to Bitcoin API",
                      "data" : stuff
              }

              console.log("Output sending to the client\n" + JSON.stringify(output));

              res.json(output);
          }) // end request
        } // end else

    });

    return query;
}

module.exports = BTCTransact;
