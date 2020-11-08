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
            result["features"][3]["properties"]["lib_dep"] = "BOUCHES-DU-RHÔNE";

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


    console.log(worksheetf)
    console.log(worksheetf[104]['Source : SDES-RSVERO '].toUpperCase()) // genere le nom du departement
    console.log(worksheetf[104]['__EMPTY'].toString()  + " beb")
    console.log(typeof worksheetf[105]['Source : SDES-RSVERO ']);
    console.log(typeof worksheetf[105]['__EMPTY_15'].toString());
    console.log(typeof worksheetf)
    MiseEnFormeJson()
    //console.log(worksheetf[104]['2.P.R.2. Parc au 1er janvier 2017 des voitures particulières d\'âge inférieur ou égal à 15 ans par département, région, source d\'énergie et classe de puissance administrative ']);

}

oReq.send();




function Affichage() {
    //console.log(result["features"][0]["properties"]["pm10_kg"])
    //console.log(result["features"][0]["properties"]["so2_kg"])
    //console.log(result["features"][0]["properties"]["lib_dep"])
    // document.getElementById("demo").innerHTML = worksheetf[105]['Source : SDES-RSVERO '];
    //document.getElementById("demo").innerHTML = worksheetf[106]['Source : SDES-RSVERO '];
    var i;
    for (i = 104; i!=110; i++) {
        var paragraph = document.getElementById("demo");
        var e = document.getElementById("dep");
        var strUser = e.options[e.selectedIndex].text;
        // console.log(e.options[e.selectedIndex].text.toUpperCase())
        // console.log(worksheetf[i]['Source : SDES-RSVERO '].toUpperCase())

        console.log(e.options[e.selectedIndex].text.toUpperCase())
        console.log(worksheetf[i]['departement'].toUpperCase())
        if(e.options[e.selectedIndex].text.toUpperCase() === worksheetf[i]['departement'].toUpperCase()){
            console.log("ddjdj")
            for(z=0;z<=5;z++){
                console.log(result["features"][z]["properties"]["lib_dep"].toUpperCase())
                if(e.options[e.selectedIndex].text.toUpperCase() === result["features"][z]["properties"]["lib_dep"].toUpperCase()){
                    document.getElementById("demo").innerHTML = "";
                    document.getElementById("pop").innerHTML = "";

                    var str1 = document.createTextNode(worksheetf[i]['departement'] + "  " +
                        worksheetf[i]['TotalVoiture'].toString() + "  " + worksheetf[i]['CamTotal'].toString()+ " " +
                        result["features"][z]["properties"]["so2_kg"] + " " + result["features"][z]["properties"]["pm10_kg"]);
                    var saut = document.createElement("br");
                    paragraph.appendChild(str1);
                    paragraph.appendChild(saut);
                }
            }



        }

    }
    if(e.options[e.selectedIndex].text.toUpperCase() === "VUE GENERALE"){
        document.getElementById("demo").innerHTML = "";
        document.getElementById("pop").innerHTML = "";

        var body = document.getElementById("pop")
        tbl  = document.createElement('table');


        for(var i = 103; i < 110; i++){
            var tr = tbl.insertRow();
            for(var j = 0; j < 3; j++){
                if (i==103){
                    var td = tr.insertCell();
                    td.appendChild(document.createTextNode("Departement"));
                    var td2 = tr.insertCell();
                    td2.appendChild(document.createTextNode("TotalVoitures"));
                    var td3 = tr.insertCell();
                    td3.appendChild(document.createTextNode("Total Camions"));
                    var td4 = tr.insertCell();
                    td4.appendChild(document.createTextNode("Masse de particules en kg"));
                    var td5 = tr.insertCell();
                    td5.appendChild(document.createTextNode("Masse de dioxyde de soufre en kg"));
                    j=3;
                }else{
                    var td = tr.insertCell();
                    td.appendChild(document.createTextNode(worksheetf[i]['departement']))
                    var td2 = tr.insertCell();
                    td2.appendChild(document.createTextNode(worksheetf[i]['TotalVoiture']));
                    var td3 = tr.insertCell();
                    td3.appendChild(document.createTextNode(worksheetf[i]['CamTotal']));
                    var td4 = tr.insertCell();
                    td4.appendChild(document.createTextNode(result["features"][i - 104]["properties"]["pm10_kg"]));
                    var td5 = tr.insertCell();
                    td5.appendChild(document.createTextNode(result["features"][i - 104]["properties"]["so2_kg"]));

                    break;
                }



            }
        }
        body.appendChild(tbl);

    }



}

function MiseEnFormeJson() {
    //console.log(worksheetf[104]['Source : SDES-RSVERO '].toUpperCase())

    for (i = 104; i!=110; i++) {
        worksheetf[i]['departement'] = worksheetf[i]['Source : SDES-RSVERO '].toUpperCase();
        delete worksheetf[i]['Source : SDES-RSVERO '];
        worksheetf[i]['EssenceEtSupethInf6CV'] = worksheetf[i]["2.P.R.2. Parc au 1er janvier 2017 des voitures particulières d\'âge inférieur ou égal à 15 ans par département, région, source d\'énergie et classe de puissance administrative "];
        delete worksheetf[i]["2.P.R.2. Parc au 1er janvier 2017 des voitures particulières d\'âge inférieur ou égal à 15 ans par département, région, source d\'énergie et classe de puissance administrative "];
        worksheetf[i]['EssenceEtSupeth6CV7CV'] = worksheetf[i]['__EMPTY'];
        delete worksheetf[i]['__EMPTY'];
        worksheetf[i]['EssenceEtSupethSupEgale8CV'] = worksheetf[i]['__EMPTY_1'];
        delete worksheetf[i]['__EMPTY_1'];
        worksheetf[i]['ElectriciteEssenceInf6CV'] = worksheetf[i]['__EMPTY_2'];
        delete worksheetf[i]['__EMPTY_2'];
        worksheetf[i]['ElectriciteEssenceSupEgale6CV'] = worksheetf[i]['__EMPTY_3'];
        delete worksheetf[i]['__EMPTY_3'];
        worksheetf[i]['GazoleInf6CV'] = worksheetf[i]['__EMPTY_4'];
        delete worksheetf[i]['__EMPTY_4'];
        worksheetf[i]['GazoleSupEgale6CV'] = worksheetf[i]['__EMPTY_5'];
        delete worksheetf[i]['__EMPTY_5'];
        worksheetf[i]['EssenceGPLInf6CV'] = worksheetf[i]['__EMPTY_6'];
        delete worksheetf[i]['__EMPTY_6'];
        worksheetf[i]['EssenceGPLSupEgale6CV'] = worksheetf[i]['__EMPTY_7'];
        delete worksheetf[i]['__EMPTY_7'];
        worksheetf[i]['Electricite'] = worksheetf[i]['__EMPTY_8'];
        delete worksheetf[i]['__EMPTY_8'];
        worksheetf[i]['GazoleElectricite'] = worksheetf[i]['__EMPTY_9'];
        delete worksheetf[i]['__EMPTY_9'];
        worksheetf[i]['Autres'] = worksheetf[i]['__EMPTY_10'];
        delete worksheetf[i]['__EMPTY_10'];
        worksheetf[i]['TotalVoiture'] = worksheetf[i]['__EMPTY_11'];
        delete worksheetf[i]['__EMPTY_11'];
        worksheetf[i]['CamGazole'] = worksheetf[i]["5.P.R.3. Parc au 1er janvier 2017 des camionnettes et camions d\'âge inférieur ou égal à 20 ans par département, région et source d\'énergie"];
        delete worksheetf[i]["5.P.R.3. Parc au 1er janvier 2017 des camionnettes et camions d\'âge inférieur ou égal à 20 ans par département, région et source d\'énergie"];
        worksheetf[i]['CamEssence'] = worksheetf[i]['__EMPTY_13'];
        delete worksheetf[i]['__EMPTY_13'];
        worksheetf[i]['CamEssenceGPL'] = worksheetf[i]['__EMPTY_14'];
        delete worksheetf[i]['__EMPTY_14'];
        worksheetf[i]['CamElectricite'] = worksheetf[i]['__EMPTY_15'];
        delete worksheetf[i]['__EMPTY_15'];
        worksheetf[i]['CamAutres'] = worksheetf[i]['__EMPTY_16'];
        delete worksheetf[i]['__EMPTY_16'];
        worksheetf[i]['CamTotal'] = worksheetf[i]['__EMPTY_17'];
        delete worksheetf[i]['__EMPTY_17'];


    }
    console.log(worksheetf)
}




