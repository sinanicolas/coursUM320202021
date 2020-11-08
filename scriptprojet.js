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
            console.log(result["features"][0]["properties"]["lib_dep"])
        })
    }
);





var oReq = new XMLHttpRequest();
var url = "https://trouver.datasud.fr/dataset/ddc457a2-6516-46ae-bcd0-49ac317c5c4a/resource/bf2bc02a-9db4-4485-8eb7-97fd3a859eea/download/oreca-vehicules-par-carburant_yzshdad.xls";
oReq.open("GET", url, true);
oReq.responseType = "arraybuffer";

var worksheetf

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
    worksheetf = XLSX.utils.sheet_to_json(worksheet,{raw:true});

    var fd = JSON.stringify(worksheetf)
    console.log(worksheetf)
    console.log(worksheetf[104]['Source : SDES-RSVERO '].toUpperCase()) // genere le nom du departement
    console.log(worksheetf[105]['__EMPTY_15'].toString()  + " beb")
    console.log(typeof worksheetf[105]['Source : SDES-RSVERO ']);
    console.log(typeof worksheetf[105]['__EMPTY_15'].toString());
}

oReq.send();


function Affichage() {
    // document.getElementById("demo").innerHTML = worksheetf[105]['Source : SDES-RSVERO '];
    //document.getElementById("demo").innerHTML = worksheetf[106]['Source : SDES-RSVERO '];
    var i;
    for (i = 104; i!=110; i++) {
        var paragraph = document.getElementById("demo");
        var e = document.getElementById("dep");
        var strUser = e.options[e.selectedIndex].text;
        // console.log(e.options[e.selectedIndex].text)
        // console.log(worksheetf[i]['Source : SDES-RSVERO '].toUpperCase())


        if(e.options[e.selectedIndex].text.toUpperCase() === worksheetf[i]['Source : SDES-RSVERO '].toUpperCase() ){
            document.getElementById("demo").innerHTML = "";


            var str1 = document.createTextNode(worksheetf[i]['Source : SDES-RSVERO '] + "  " +
                worksheetf[i]['__EMPTY'].toString() + "  " + worksheetf[i]['__EMPTY_1'].toString());
            var saut = document.createElement("br");
            paragraph.appendChild(str1);
            paragraph.appendChild(saut);

            var width = 900,
            height = 300,
            pad = 20,
            left_pad = 100;
            var x = d3.scale.ordinal().rangeRoundBands([left_pad, width-pad], 0.1);
            var y = d3.scale.linear().range([height-pad, pad]);
            var xAxis = d3.svg.axis().scale(x).orient("bottom");
            var yAxis = d3.svg.axis().scale(y).orient("left");
            var svg = d3.select("#graph")
            .append("svg")
            .attr("width", width)
            .attr("height", height);
            d3.json('https://trouver.datasud.fr/dataset/973765d0-a2a8-442d-bf3b-aec4e70fdd69/resource/faa81490-2a38-42e5-8a43-3b326ba5fce9/download/geoserver-getfeature.application', function (data) {
              data = d3.keys(data).map(function (key) {
                return {bucket: Number(key),
                  N: data[key]};
                });
              x.domain(data.map(function (d) { return d.bucket; }));
              y.domain([0, d3.max(data, function (d) { return d.N; })]);
              svg.append("g")
              .attr("class", "axis")
              .attr("transform", "translate(0, "+(height-pad)+")")
              .call(xAxis);
              svg.append("g")
              .attr("class", "axis")
              .attr("transform", "translate("+(left_pad-pad)+", 0)")
              .call(yAxis);
              svg.selectAll('rect')
              .data(data)
              .enter()
              .append('rect')
              .attr('class', 'bar')
              .attr('x', function (d) { return x(d.bucket); })
              .attr('width', x.rangeBand())
              .attr('y', height-pad)
              .transition()
              .delay(function (d) { return d.bucket*20; })
              .duration(800)
              .attr('y', function (d) { return y(d.N); })
              .attr('height', function (d) { return height-pad - y(d.N); });
              });


        }

    }
}
