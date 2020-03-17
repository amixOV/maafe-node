const queryObj = {customer_name: name};
let phone = document.getElementById('phone');
let email = document.getElementById('email');
getData(queryObj)
insertToHtml = data => {
    data = data[0]
    phone.innerHTML = data.customer_phone;
    email.innerHTML = data.customer_mail;
    
}