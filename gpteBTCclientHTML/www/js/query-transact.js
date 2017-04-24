document.getElementById('getinfo').onclick = function () {

  document.getElementById('cloudResponse').innerHTML = "<p>Calling Bitcoin Cloud App.....</p>";

  $fh.cloud(
      {
        path: 'summit-bitcoin-transaction',
        method: "GET",
        data: {
          selection : checkedRadioBtn('selection')
        }
      },
      function (res) {
        console.log('Got response from cloud:' + JSON.stringify(res));
        document.getElementById('cloudResponse').innerHTML = "<p>Here is the Bitcoin information you wanted</p>";
        document.getElementById('cloudResponse_source').innerHTML = "Source: " + res.source;

        document.getElementById('cloudResponse_blockhash').innerHTML = "Block Hash: " + res.data.block_hash;
        document.getElementById('cloudResponse_blockheight').innerHTML = "Block Height: " + res.data.block_height;
        document.getElementById('cloudResponse_transhash').innerHTML = "Transaction Hash: " + res.data.hash;
        document.getElementById('cloudResponse_total').innerHTML = "Value: " + res.data.total + " Satoshis";
        document.getElementById('cloudResponse_fees').innerHTML = "Fees: " + res.data.fees;
        document.getElementById('cloudResponse_confirmation').innerHTML = "Confirmation: " + res.data.confirmations;
        document.getElementById('cloudResponse_confirmed').innerHTML = "Confirmed: " + res.data.confirmed;
        document.getElementById('cloudResponse_received').innerHTML = "Received: " + res.data.received;
        document.getElementById('cloudResponse_size').innerHTML = "Size: " + res.data.size + " Bytes";
      },

      function (code, errorprops, params) {
        alert('An error occured: ' + code + ' : ' + errorprops);
      }
  );
};

function checkedRadioBtn(sGroupName)
    {
        var group = document.getElementsByName(sGroupName);

        for ( var i = 0; i < group.length; i++) {
            if (group.item(i).checked) {
                return group.item(i).id;
            } else if (group[0].type !== 'radio') {
                //if you find any in the group not a radio button return null
                return null;
            }
        }
    }
