
    const button = document.getElementById('button');
    const loader = document.getElementById('loader');
    let table = document.getElementById('table');
    // switch for the loader
    turn = (a) => {
        if (a === 'on') {
            loader.style.display = 'block';
        }
        if (a === 'off') {
            loader.style.display = 'none';
        }
    }
    // insert product to DB
    button.addEventListener('click', () => {
        turn('on');
        
        let id = document.getElementById('id').value;
        let name = document.getElementById('name').value;
        let cost = document.getElementById('cost').value;
        let error = document.getElementById('error');
        data = {
            'product_id' : id,
            'product_name' : name,
            'pro_cost': cost 
        }
        
        const option = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        fetch('/api', option)
        .then(res => res.text())
        .then(data => {
             console.log(data);
             data = JSON.parse(data);
             data = [data];
             return data;

        })
        .then(data => loopIt(data))
        .then( () => turn('off'))
        .catch ((err) => {
            turn('off');
            error.style.display = 'block';
            error.innerHTML = 'Error : the id and the name require';
            console.error(err );
        });
    }); 
    
    // fetch data for table from DB
    (() => {
        turn('on');
        fetch('/db_data')
        .then(res => res.text())
        .then(data => {
            console.log(data);
            data = JSON.parse(data);
            return data;
        })
        .then(data => loopIt(data))
        .then( () => turn('off'))
        .catch ((err) => {
            error.style.display = 'block';
            error.innerHTML = 'ERROR : some error';
            console.error(err);
            turn('off')
        })
    })()
    
    loopIt = data => {
        let tWithData = '';
        
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                const ele = data[key];
                tWithData += `<tr>
                                <td>${ele.product_id}</td>
                                <td>${ele.product_name}</td>
                                <td>${ele.pro_cost}</td>
                              </tr>`;
            }
        }
        table.innerHTML += tWithData;
    }
