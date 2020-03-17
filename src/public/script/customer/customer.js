
const button = document.getElementById('button');
let table = document.getElementById('table');
let errorTag = document.getElementById('error');
let nameArr = [];
let myForm = document.getElementById('myForm');

    // insert customer to DB
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
        const name = formobj.customer_name;
        const phone = formobj.customer_phone;
        const mail = formobj.customer_mail;
    
        if (!name) {
            errorMessege('the name is required');
        }
        for (let i = 0; i < nameArr.length; i++) {
           
            if (name === nameArr[i]) {
                errorMessege('this name already taken');
            }
        }
      
        const option = {
            method: 'POST',
            body: JSON.stringify(formobj),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        
        fetch('/send_data', option)
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
            console.log("הלקוח : " + data + " נוצר בהצלחה ");
            
             turn('off')
        })
        .catch ((err) => {
            console.error(err);
            errorMessege('some err from fetch post api');
        });
        
    }); 

    // fetch data for table from DB
    const queryObj = {}; //all data
    getData(queryObj);
    insertToHtml = data => {
        try {
            let tWithData = '';
            
            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    const ele = data[key];
                    let href = `/customer_item/${ele.customer_name}`
                    tWithData += `
                        <tr class="item_row" onclick="document.location = '${href}'";>
                            <td>${ele.customer_name}</td>
                            <td>${ele.customer_phone}</td>
                            <td>${ele.customer_mail}</td>
                        </tr>
                    `;
                    nameArr.push(ele.customer_name);
                }
            }
            table.innerHTML += tWithData;
        } catch (err) {
            throw new error(err)
        }
    }
