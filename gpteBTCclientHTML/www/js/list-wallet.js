document.getElementById('listwallet').onclick = function () {

  document.getElementById('cloudResponse').innerHTML = "<p>Retrieving wallet list. Calling Bitcoin Cloud App.....</p>";

  $fh.cloud(
      {
        path: 'summit-bitcoin-wallet',
        method: "GET"
  //      data: {
          // selection : document.getElementById('selection').value
  //        selection : checkWalletName('walname')
  //      }
      },
      function (res) {

        console.log('Got response from cloud:' + JSON.stringify(res));
        document.getElementById('cloudResponse').innerHTML = "<p>Here is the Bitcoin Wallet List you wanted</p>";

        // get list of wallet names
        var walletNames = res.data.wallet_names;

        // build an unordered list
        var htmlUL = makeUL(walletNames);

        // add this to the response response
        document.getElementById('cloudResponse_walname').appendChild(htmlUL);
        },

      function (code, errorprops, params) {
        console.log(errorprops);
        
        alert('An error occured: ' + code + ' : ' + JSON.stringify(errorprops));
      }
  );
};

function checkWalletName(TextField)
    {
        var walname = document.getElementsByName(TextField);

        return walname;
    }

function makeUL(array) {
    // Create the list element:
    var list = document.createElement('ul');

    for(var i = 0; i < array.length; i++) {
        // Create the list item:
        var item = document.createElement('li');

        // Set its contents:
        item.appendChild(document.createTextNode(array[i]));

        // Add it to the list:
        list.appendChild(item);
    }

    // Finally, return the constructed list:
    return list;
}