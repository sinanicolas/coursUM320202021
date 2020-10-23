console.log("c'est ici qu'il faut coder votre javascript")

var result;
fetch('https://trouver.datasud.fr/dataset/05880254-f77f-4200-b7ca-6e7930eed11c/resource/9610600d-2414-4d47-b86c-9024935591b5/download/geoserver-getfeature.application', { method: 'GET',
             headers: {},
             mode: 'cors',
             cache: 'default'}).then(
  function(response){
      response.json().then(function(data){
        console.log(data)
        result=data
      })
  }
)
