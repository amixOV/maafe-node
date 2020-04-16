getData =  queryObj => {
    
    const option = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(queryObj)
    }
    
    turn('on');
    fetch('/db_data', option)
    .then(res => res.text())
    .then(data => {
        data = JSON.parse(data);
        return data;
    })
    .then(data => insertToHtml(data))
    .then( () => turn('off'))
    .catch ((err) => {
        errorMessege('ERROR : from fetch db data');
        console.error(err);
        console.error(err.name);
        console.error(err.messege);
    })
}