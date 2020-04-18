
const button = document.getElementById('button');
let table = document.getElementById('table');
let errorTag = document.getElementById('error');
let idArr = [];
let nameArr = [];
let myForm = document.getElementById('myForm');
let img = document.getElementById('single_img');

    // insert product to DB
    button.addEventListener('click', () => {
        turn('on');
        let formData = new FormData(myForm);        
        let formobj = {}
        for(var pair of formData.entries()) {
            if(pair[0] === 'pro_cost'){
                pair[1] = parseInt(pair[1]);
            }
            if(pair[0] === 'single_img'){
                pair[1] = img.value;
                console.log(pair[1]);
                
            }
            console.log(pair[0]+ ', '+ pair[1]); 
            console.log(pair);
            
            formobj[pair[0]] = pair[1];
         }
        console.log(formobj);
        const id = formobj.product_id;
        const name = formobj.product_name;
        const cost = formobj.pro_cost;
    
        if (!id) {
            errorMessege('the id is required');
        }
        for (let i = 0; i < idArr.length; i++) {
           
            if (id === idArr[i]) {
                errorMessege('this id already taken');
            }
        }
        
        if (!name) {
            errorMessege('the name is required');
        }
        for (let i = 0; i < nameArr.length; i++) {
            
            if (name === nameArr[i]) {
                errorMessege('this name already taken');
            }
        }
        if (!cost) {
            errorMessege('the cost is required');
        }
        if(!img){
            errorMessege('one img is required');
        }

        
        const option = {
            method: 'POST',
            body: JSON.stringify(formobj),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        
        fetch('/send_data', option)
        /*
        .then(res => {
            if (!res.ok) throw new Error(res.status);
        })
        */
        .then(res => res.text())
        //.then(res => console.log(res))
        .then(data => {
            console.log(data);
             data = JSON.parse(data);
             data = [data];
             return data;
        })
        .then(data => insertToHtml(data))
       
        .then(data =>{
            console.log("המוצר : " + data + " נוצר בהצלחה ");
            
             turn('off')
        })
        .catch ((err) => {
            console.error(err);
            errorMessege('some err from fetch post api');
        });
        
    }); 

    document.querySelector('#up_single_img').addEventListener('change', event => {
        handleImageUpload(event)
       
    })

    const handleImageUpload = event => {
        turn2('on');
        event.preventDefault();
        const files = event.target.files
        const formData = new FormData()
        formData.append('single_img', files[0]);

        fetch('/saveImage', {
          method: 'POST',
          body: formData
        })
        
        .then(response => response.text())
        //.then(response => response.json())
        .then(data => {
            img.value = data;
         //   console.log(img);
         //   console.log(data)
         turn2('off');
        })
        .catch(error => {
          console.error(error)
          turn2('off');
        })
        
    }
    
    // fetch data for table from DB
    const queryObj = {}; //all data
    getData(queryObj);
    insertToHtml = data => {
        try {
            let tWithData = '';
            
            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    const ele = data[key];
                    let href = `/product_item/${ele.product_id}/${ele.product_name}/${ele.pro_cost}`
                    tWithData += `
                        <tr class="item_row" onclick="document.location = '${href}'";>
                            <td>${ele.product_id}</td>
                            <td>${ele.product_name}</td>
                            <td>${ele.pro_cost}</td>
                        </tr>
                    `;
                    idArr.push(ele.product_id);
                    nameArr.push(ele.product_name);
                }
            }
            table.innerHTML += tWithData;
        } catch (err) {
            throw new error(err)
        }
    }
