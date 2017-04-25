var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var cors = require('cors');

function BTCWallet() {
  var query = new express.Router();
  var loc = 'https://api.blockcypher.com/v1/btc/main/wallets?token=3f99a07ffbbb42ce8182b66aec07ad05';
  var apiloc = 'https://api-2445581559610.staging.apicast.io:443/v1/btc/main?user_key=cd9f81747d0c365cda0233f3217b76df';

  query.use(cors());
  query.use(bodyParser());

  console.log('Listening for Bitcoin Wallet requests')
  query.get('/', function(req, res) {

      console.log(new Date(), 'Bitcoin Service GET / req.query=', req.query);

//      var selection = req.query.selection;
      var selection = "list_wallet";

      console.log("req.body=" + JSON.stringify(req.body));
      console.log("selection = " + selection);

      if (selection == "list_wallet") {
          console.log('>> Retrieving Bitcoin Wallet list: ');

          request(loc, function(error, response, body) {
              console.log("Body received from API call\n" + body);

              var stuff = JSON.parse(body);

              // sort wallet names
              stuff.wallet_names.sort(sortByName);

              var output = {
                      source: "Retrieving Bitcoin Wallet list",
                      data: stuff
              }

              console.log("Output sending to the client\n" + JSON.stringify(output));

              res.json(output);
          }) //end request
      } else {
        console.log('>> Calling via 3Scale: ');

        request(apiloc, function(error, response, body) {
            console.log("Body received from API call\n" + body);

            var stuff = JSON.parse(body);

            // sort wallet names
            stuff.wallet_names.sort(sortByName);

            var output = {
                    source: "Direct call to Bitcoin data cloud",
                    data: stuff
            }

            console.log("Output sending to the client\n" + JSON.stringify(output));

            res.json(output);
        }) //end request

      } // end else

  });

  query.post('/', function(req, res) {

      console.log(new Date(), 'Bitcoin Service POST / req.query=', req.query);

      console.log("req.body=" + JSON.stringify(req.body));

      var walletName = req.body.walletName;

      console.log('>> Creating Bitcoin wallet: ' + walletName);

      var formData = {
        name: walletName,
        addresses: ["1JcX75oraJEmzXXHpDjRctw3BX6qDmFM8e"]
      };

      console.log('>> formData: ' + JSON.stringify(formData));

      request.post(loc, {
            form: JSON.stringify(formData)
          },
          function(error, response, body) {
            console.log("Body received from API call\n" + body);

            var stuff = JSON.parse(body);

            var output = {
            "source" : "Created BitCoin wallet",
            "data" : stuff
            }

            console.log("Output sending to the client\n" + JSON.stringify(output));

            res.json(output);
        }) //end request

  });

  return query;
}

function sortByName(x,y) {
  x = x.toLowerCase();
  y = y.toLowerCase();

  return ((x == y) ? 0 : ((x > y) ? 1 : -1 ));
}


module.exports = BTCWallet;
