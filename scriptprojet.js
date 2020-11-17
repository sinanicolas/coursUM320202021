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

            var chart = new CanvasJS.Chart("chartContainer3", {
                animationEnabled: true,

                title:{
                    text:"Comparaison masse de monoxyde de carbone en kg entre les départements "
                },
                axisX:{
                    interval: 1
                },
                axisY2:{
                    interlacedColor: "rgba(255,165,0,.2)",
                    gridColor: "rgba(255,165,0,.1)",
                    title: ""
                },
                data: [{
                    type: "bar",
                    name: "companies",
                    axisYType: "secondary",
                    color: "orange",
                    dataPoints: [
                        { y: result["features"][0]["properties"]["co_kg"], label: result["features"][0]["properties"]["lib_dep"] },
                        { y: result["features"][1]["properties"]["co_kg"], label: result["features"][1]["properties"]["lib_dep"] },
                        { y: result["features"][2]["properties"]["co_kg"], label: result["features"][2]["properties"]["lib_dep"] },
                        { y: result["features"][3]["properties"]["co_kg"], label: result["features"][3]["properties"]["lib_dep"] },
                        { y: result["features"][4]["properties"]["co_kg"], label: result["features"][4]["properties"]["lib_dep"] },
                        { y: result["features"][5]["properties"]["co_kg"], label: result["features"][5]["properties"]["lib_dep"] }
                    ]
                }]
            });
            chart.render();

        })
    }
);





var oReq = new XMLHttpRequest();
var url = "https://trouver.datasud.fr/dataset/ddc457a2-6516-46ae-bcd0-49ac317c5c4a/resource/bf2bc02a-9db4-4485-8eb7-97fd3a859eea/download/oreca-vehicules-par-carburant_yzshdad.xls";
oReq.open("GET", url, true);
oReq.responseType = "arraybuffer";

var worksheetf
var worksheetf2007
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

    var second_sheet_name = workbook.SheetNames[13];
    var worksheet2 = workbook.Sheets[second_sheet_name];
    worksheetf2007 =  XLSX.utils.sheet_to_json(worksheet2,{raw:true});

    console.log(worksheetf)
    console.log(worksheetf[104]['Source : SDES-RSVERO '].toUpperCase()) // genere le nom du departement
    console.log(worksheetf[104]['__EMPTY'].toString()  + " beb")
    console.log(typeof worksheetf[105]['Source : SDES-RSVERO ']);
    console.log(typeof worksheetf[105]['__EMPTY_15'].toString());
    console.log(typeof worksheetf)
    MiseEnFormeJson(worksheetf,103,110)

    MiseEnFormeJson2007(worksheetf2007,110,116)
    console.log(worksheetf2007)

}

oReq.send();




function Affichage() {
    //console.log(result["features"][0]["properties"]["pm10_kg"])
    //console.log(result["features"][0]["properties"]["so2_kg"])
    //console.log(result["features"][0]["properties"]["lib_dep"])
    // document.getElementById("demo").innerHTML = worksheetf[105]['Source : SDES-RSVERO '];
    //document.getElementById("demo").innerHTML = worksheetf[106]['Source : SDES-RSVERO '];
    var i;
    for (i = 103; i!=110; i++) {
        var paragraph = document.getElementById("demo");
        var e = document.getElementById("dep");
        var strUser = e.options[e.selectedIndex].text;
        // console.log(e.options[e.selectedIndex].text.toUpperCase())
        // console.log(worksheetf[i]['Source : SDES-RSVERO '].toUpperCase())

        //console.log(e.options[e.selectedIndex].text.toUpperCase())
        //console.log(worksheetf[i]['departement'].toUpperCase())
        if(e.options[e.selectedIndex].text.toUpperCase() === worksheetf[i]['departement'].toUpperCase()){
            document.getElementById("demo").innerHTML = "";
            document.getElementById("pop").innerHTML = "";

            var body = document.getElementById("pop")
            tbl  = document.createElement('table');




                for(var j = 0; j < 3; j++){
                    var tr = tbl.insertRow();
                    if (j==0){

                        var td = tr.insertCell();
                        td.appendChild(document.createTextNode("Departement"));
                        var td2 = tr.insertCell();
                        td2.appendChild(document.createTextNode("TotalVoitures"));
                        var td3 = tr.insertCell();
                        td3.appendChild(document.createTextNode("Total Camions"));
                        var td4 = tr.insertCell();
                        td4.appendChild(document.createTextNode("Masse de particules en suspension en kg"));
                        var td5 = tr.insertCell();
                        td5.appendChild(document.createTextNode("Masse de dioxyde de soufre en kg"));
                        var td6 = tr.insertCell();
                        td6.appendChild(document.createTextNode("Masse de particules fines en kg"));
                        var td7 = tr.insertCell();
                        td7.appendChild(document.createTextNode("Masse de monoxyde de carbone en kg"));
                        var td8 = tr.insertCell();
                        td8.appendChild(document.createTextNode("Masse d'oxydes d'azote en kg"));
                        var td9 = tr.insertCell();
                        td9.appendChild(document.createTextNode("Masse de benzène en kg"));
                        var td10 = tr.insertCell();
                        td10.appendChild(document.createTextNode("Masse de nitrate en kg"));

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
                        var td6 = tr.insertCell();
                        td6.appendChild(document.createTextNode(result["features"][i - 104]["properties"]["pm25_kg"]));
                        var td7 = tr.insertCell();
                        td7.appendChild(document.createTextNode(result["features"][i - 104]["properties"]["co_kg"]));
                        var td8 = tr.insertCell();
                        td8.appendChild(document.createTextNode(result["features"][i - 104]["properties"]["nox_kg"]));
                        var td9 = tr.insertCell();
                        td9.appendChild(document.createTextNode(result["features"][i - 104]["properties"]["c6h6_kg"]));
                        var td10 = tr.insertCell();
                        td10.appendChild(document.createTextNode(result["features"][i - 104]["properties"]["ni_kg"]));

                        break;
                    }



                }

            body.appendChild(tbl);
            body.appendChild(document.createElement("br"));
            carsPlot(worksheetf,i)
            body.appendChild(document.createElement("br"));
            PollutionPlot(result,i-104)

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
                    td4.appendChild(document.createTextNode("Masse de particules en suspension en kg"));
                    var td5 = tr.insertCell();
                    td5.appendChild(document.createTextNode("Masse de dioxyde de soufre en kg"));
                    var td6 = tr.insertCell();
                    td6.appendChild(document.createTextNode("Masse de particules fines en kg"));
                    var td7 = tr.insertCell();
                    td7.appendChild(document.createTextNode("Masse de monoxyde de carbone en kg"));
                    var td8 = tr.insertCell();
                    td8.appendChild(document.createTextNode("Masse d'oxydes d'azote en kg"));
                    var td9 = tr.insertCell();
                    td9.appendChild(document.createTextNode("Masse de benzène en kg"));
                    var td10 = tr.insertCell();
                    td10.appendChild(document.createTextNode("Masse de nitrate en kg"));
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
                    var td6 = tr.insertCell();
                    td6.appendChild(document.createTextNode(result["features"][i - 104]["properties"]["pm25_kg"]));
                    var td7 = tr.insertCell();
                    td7.appendChild(document.createTextNode(result["features"][i - 104]["properties"]["co_kg"]));
                    var td8 = tr.insertCell();
                    td8.appendChild(document.createTextNode(result["features"][i - 104]["properties"]["nox_kg"]));
                    var td9 = tr.insertCell();
                    td9.appendChild(document.createTextNode(result["features"][i - 104]["properties"]["c6h6_kg"]));
                    var td10 = tr.insertCell();
                    td10.appendChild(document.createTextNode(result["features"][i - 104]["properties"]["ni_kg"]));

                    break;
                }



            }
        }
        body.appendChild(tbl);

    }




}


function MiseEnFormeJson(data,deb,fin) {
    //console.log(worksheetf[104]['Source : SDES-RSVERO '].toUpperCase())

    for (i = deb; i!=fin; i++) {
        data[i]['departement'] = data[i]['Source : SDES-RSVERO '].toUpperCase();
        delete data[i]['Source : SDES-RSVERO '];
        data[i]['EssenceEtSupethInf6CV'] = data[i]["2.P.R.2. Parc au 1er janvier 2017 des voitures particulières d\'âge inférieur ou égal à 15 ans par département, région, source d\'énergie et classe de puissance administrative "];
        delete data[i]["2.P.R.2. Parc au 1er janvier 2017 des voitures particulières d\'âge inférieur ou égal à 15 ans par département, région, source d\'énergie et classe de puissance administrative "];
        data[i]['EssenceEtSupeth6CV7CV'] = data[i]['__EMPTY'];
        delete data[i]['__EMPTY'];
        data[i]['EssenceEtSupethSupEgale8CV'] = data[i]['__EMPTY_1'];
        delete data[i]['__EMPTY_1'];
        data[i]['ElectriciteEssenceInf6CV'] = data[i]['__EMPTY_2'];
        delete data[i]['__EMPTY_2'];
        data[i]['ElectriciteEssenceSupEgale6CV'] = data[i]['__EMPTY_3'];
        delete data[i]['__EMPTY_3'];
        data[i]['GazoleInf6CV'] = data[i]['__EMPTY_4'];
        delete data[i]['__EMPTY_4'];
        data[i]['GazoleSupEgale6CV'] = data[i]['__EMPTY_5'];
        delete data[i]['__EMPTY_5'];
        data[i]['EssenceGPLInf6CV'] = data[i]['__EMPTY_6'];
        delete data[i]['__EMPTY_6'];
        data[i]['EssenceGPLSupEgale6CV'] = data[i]['__EMPTY_7'];
        delete data[i]['__EMPTY_7'];
        data[i]['Electricite'] = data[i]['__EMPTY_8'];
        delete data[i]['__EMPTY_8'];
        data[i]['GazoleElectricite'] = data[i]['__EMPTY_9'];
        delete data[i]['__EMPTY_9'];
        data[i]['Autres'] = data[i]['__EMPTY_10'];
        delete data[i]['__EMPTY_10'];
        data[i]['TotalVoiture'] = data[i]['__EMPTY_11'];
        delete data[i]['__EMPTY_11'];
        data[i]['CamGazole'] = data[i]["5.P.R.3. Parc au 1er janvier 2017 des camionnettes et camions d\'âge inférieur ou égal à 20 ans par département, région et source d\'énergie"];
        delete data[i]["5.P.R.3. Parc au 1er janvier 2017 des camionnettes et camions d\'âge inférieur ou égal à 20 ans par département, région et source d\'énergie"];
        data[i]['CamEssence'] = data[i]['__EMPTY_13'];
        delete data[i]['__EMPTY_13'];
        data[i]['CamEssenceGPL'] = data[i]['__EMPTY_14'];
        delete data[i]['__EMPTY_14'];
        data[i]['CamElectricite'] = data[i]['__EMPTY_15'];
        delete data[i]['__EMPTY_15'];
        data[i]['CamAutres'] = data[i]['__EMPTY_16'];
        delete data[i]['__EMPTY_16'];
        data[i]['CamTotal'] = data[i]['__EMPTY_17'];
        delete data[i]['__EMPTY_17'];


    }
}

function MiseEnFormeJson2007(data,deb,fin) {
    //console.log(worksheetf[104]['Source : SDES-RSVERO '].toUpperCase())

    for (i = deb; i!=fin; i++) {
        data[i]['departement'] = data[i]['__EMPTY'].toUpperCase();
        delete data[i]['__EMPTY'];
        data[i]['EssenceInf6CV'] = data[i]["2.P.R.2. Parc au 1er janvier 2007 des voitures particulières de moins de 15 ans par département, région, "];
        delete data[i]["2.P.R.2. Parc au 1er janvier 2007 des voitures particulières de moins de 15 ans par département, région, "];
        data[i]['Essence6CV7CV'] = data[i]['__EMPTY_1'];
        delete data[i]['__EMPTY_1'];
        data[i]['EssenceSupEgale8CV'] = data[i]['__EMPTY_2'];
        delete data[i]['__EMPTY_2'];
        data[i]['GazoleInf6CV'] = data[i]['__EMPTY_3'];
        delete data[i]['__EMPTY_3'];
        data[i]['GazoleSupEgale6CV'] = data[i]['__EMPTY_4'];
        delete data[i]['__EMPTY_4'];
        data[i]['EssenceGPLInf6CV'] = data[i]['__EMPTY_5'];
        delete data[i]['__EMPTY_5'];
        data[i]['EssenceGPLSupEgale6CV'] = data[i]['__EMPTY_6'];
        delete data[i]['__EMPTY_6'];
        data[i]['Electricite'] = data[i]['__EMPTY_7'];
        delete data[i]['__EMPTY_7'];
        data[i]['TotalVoitures'] = data[i]['__EMPTY_9'];
        delete data[i]['__EMPTY_9'];
        data[i]['VoitureAutres'] = data[i]['__EMPTY_8'];
        delete data[i]['__EMPTY_8'];
        data[i]['CamEssence'] = data[i]["5.P.R.3. Parc au 1er janvier 2007 des camionnettes et camions d'âge inférieur ou égal à 20 ans par département, région et source d'énergie"];
        delete data[i]["5.P.R.3. Parc au 1er janvier 2007 des camionnettes et camions d'âge inférieur ou égal à 20 ans par département, région et source d'énergie"];
        data[i]['CamGazole'] = data[i]['__EMPTY_11'];
        delete data[i]['__EMPTY_11'];
        data[i]['CamEssenceGPL'] = data[i]['__EMPTY_12'];
        delete data[i]['__EMPTY_12'];
        data[i]['CamAutres'] = data[i]['__EMPTY_13'];
        delete data[i]['__EMPTY_13'];
        data[i]['CamTotal'] = data[i]['__EMPTY_14'];
        delete data[i]['__EMPTY_14'];

    }
}


function carsPlot(data,i) {


    console.log(data)
    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,

        title:{
            text:"Les types de vehicules dans le departement : " + data[i]['departement']
        },
        axisX:{
            interval: 1
        },
        axisY2:{
            interlacedColor: "rgba(1,77,101,.2)",
            gridColor: "rgba(1,77,101,.1)",
            title: "Nombres"
        },
        data: [{
            type: "bar",
            name: "companies",
            axisYType: "secondary",
            color: "#014D65",
            dataPoints: [
                { y: data[i]['TotalVoiture'], label: "TotalVoitures" },
                { y: data[i]['EssenceEtSupethInf6CV'], label: "EssenceEtSupethInf6CV" },
                { y: data[i]['EssenceEtSupeth6CV7CV'], label: "EssenceEtSupeth6CV7CV" },
                { y: data[i]['EssenceEtSupethSupEgale8CV'], label: "EssenceEtSupethSupEgale8CV" },
                { y: data[i]['ElectriciteEssenceInf6CV'], label: "ElectriciteEssenceInf6CV" },
                { y: data[i]['GazoleInf6CV'], label: "GazoleInf6CV" },
                { y: data[i]['GazoleSupEgale6CV'], label: "GazoleSupEgale6CV" },
                { y: data[i]['GazoleSupEgale6CV'], label: "GazoleSupEgale6CV" },
                { y: data[i]['EssenceGPLInf6CV'], label: "EssenceGPLInf6CV" },
                { y: data[i]['EssenceGPLSupEgale6CV'], label: "EssenceGPLSupEgale6CV" },
                { y: data[i]['Electricite'], label: "Electricite" },
                { y: data[i]['GazoleElectricite'], label: "GazoleElectricite" },
                { y: data[i]['Autres'], label: "Autres Voitures" },
                { y: data[i]['CamGazole'], label: "CamGazole" },
                { y: data[i]['CamEssence'], label: "CamEssence" },
                { y: data[i]['CamElectricite'], label: "CamElectricite" },
                { y: data[i]['CamAutres'], label: "CamAutres" },
                { y: data[i]['CamTotal'], label: "CamTotal" }
            ]
        }]
    });
    chart.render();


}


function PollutionPlot(data,i) {


    console.log(data)
    var chart = new CanvasJS.Chart("chartContainer2", {
        animationEnabled: true,

        title:{
            text:"Les principales données polluante dans ce departement"
        },
        axisX:{
            interval: 1
        },
        axisY2:{
            interlacedColor: "rgba(240,43,96,.2)",
            gridColor: "rgba(240,43,96,.1)",
            title: ""
        },
        data: [{
            type: "bar",
            name: "companies",
            axisYType: "secondary",
            color: "#B50000",
            dataPoints: [
                { y: data["features"][i]["properties"]["pm10_kg"], label: "Masse de particules en suspension en kg" },
                { y: data["features"][i]["properties"]["so2_kg"], label: "Masse de dioxyde de soufre en kg" },
                { y: data["features"][i]["properties"]["pm25_kg"], label: "Masse de particules fines en kg" },
                { y: data["features"][i]["properties"]["co_kg"], label: "Masse de monoxyde de carbone en kg" },
                { y: data["features"][i]["properties"]["nox_kg"], label: "Masse d'oxydes d'azote en kg" },
                { y: data["features"][i]["properties"]["c6h6_kg"], label: "Masse de benzène en kg" },
                { y: data["features"][i]["properties"]["ni_kg"], label: "Masse de nitrate en kg" }
            ]
        }]
    });
    chart.render();


}
