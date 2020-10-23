fetch(JSON.parse('https://raw.githubusercontent.com/jpatokal/openflights/master/data/airlines.dat'), { method: 'GET',
               headers: {},
               mode: 'cors',
               cache: 'default'}).then(
    function(response){
        response.text().then(function(data){result = data})
            }
)
