fetch('https://trouver.datasud.fr/dataset/973765d0-a2a8-442d-bf3b-aec4e70fdd69/resource/faa81490-2a38-42e5-8a43-3b326ba5fce9/download/geoserver-getfeature.application', 
    { method: 'GET',
               headers: {},
               mode: 'cors',
               cache: 'default'}).then(
    function(response){
        response.text().then(function(data){result = data})
            }
)


