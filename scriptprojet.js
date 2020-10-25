console.log("c'est ici qu'il faut coder votre javascript")

var result;
fetch('https://trouver.datasud.fr/dataset/973765d0-a2a8-442d-bf3b-aec4e70fdd69/resource/faa81490-2a38-42e5-8a43-3b326ba5fce9/download/geoserver-getfeature.application', { method: 'GET',
               headers: {},
               mode: 'cors',
               cache: 'default'}).then(
    function(response){
        response.json().then(function(data){
          console.log(data);
          result = data;
        })
    }
);



var oReq = new XMLHttpRequest();
var url = "https://trouver.datasud.fr/dataset/ddc457a2-6516-46ae-bcd0-49ac317c5c4a/resource/bf2bc02a-9db4-4485-8eb7-97fd3a859eea/download/oreca-vehicules-par-carburant_yzshdad.xls";
oReq.open("GET", url, true);
oReq.responseType = "arraybuffer";

oReq.onload = function(e) {
    var arraybuffer = oReq.response;

    /* convert data to binary string */
    var data = new Uint8Array(arraybuffer);
    var arr = new Array();
    for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
    var bstr = arr.join("");

    /* Call XLSX */
    var workbook = XLSX.read(bstr, {type:"binary"});

    /* DO SOMETHING WITH workbook HERE */
    var first_sheet_name = workbook.SheetNames[3];
    /* Get worksheet */
    var worksheet = workbook.Sheets[first_sheet_name];
    var worksheetf = XLSX.utils.sheet_to_json(worksheet,{raw:true});
    var fd = JSON.stringify(worksheetf)
    console.log(worksheetf[105]['Source : SDES-RSVERO ']) // genere le nom du departement
    console.log(worksheetf[105]['__EMPTY_15'])
    console.log(worksheetf[105])
}

oReq.send();


