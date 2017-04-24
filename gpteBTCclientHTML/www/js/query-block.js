document.getElementById('getinfo').onclick = function () {

  document.getElementById('cloudResponse').innerHTML = "<p>Calling Bitcoin Cloud App.....</p>";

  $fh.cloud(
      {
        path: 'summit-bitcoin-block',
        method: "GET",
        data: {
          selection : checkedRadioBtn('selection')
        }
      },
      function (res) {
        console.log('Got response from cloud:' + JSON.stringify(res));
        document.getElementById('cloudResponse').innerHTML = "<p>Here is the Bitcoin information you wanted</p>";
        document.getElementById('cloudResponse_source').innerHTML = "Source: " + res.source;

        document.getElementById('cloudResponse_name').innerHTML = "Block Name: " + res.data.name;
        document.getElementById('cloudResponse_height').innerHTML = "Block Height: " + res.data.height;
        document.getElementById('cloudResponse_hash').innerHTML = "Block Hash: " + res.data.hash;
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
