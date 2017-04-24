document.getElementById('submitname').onclick = function () {

  document.getElementById('cloudResponse').innerHTML = "<p>Wallet creation starting. Calling Bitcoin Cloud App.....</p>";

  $fh.cloud(
      {
        path: 'summit-bitcoin-wallet',
        method: "POST",
        data: {
          walletName : document.getElementById('walname').value
        }
      },
      function (res) {
        console.log('Got response from cloud:' + JSON.stringify(res));
        document.getElementById('cloudResponse').innerHTML = "<p>Here is the Bitcoin information you wanted</p>";
        document.getElementById('cloudResponse_source').innerHTML = "Source: " + res.source;

        document.getElementById('cloudResponse_walname').innerHTML = "Name: " + res.data.name;
        document.getElementById('cloudResponse_waladdress').innerHTML = "Wallet Address: " + res.data.addresses;
        document.getElementById('cloudResponse_token').innerHTML = "STMBCD Client Token: " + res.data.token;
      },

      function (code, errorprops, params) {
        alert('An error occured: ' + code + ' : ' + errorprops);
      }
  );
};
