
const queryObj = {product_id: itemPro};
let imgSrc = document.getElementById('img_src');
let content = document.getElementById('content');
getData(queryObj)
insertToHtml = data => {
    data = data[0]
    console.log(data);
    content.innerHTML = data.pro_contant;
    cost.innerHTML = data.pro_cost;
    imgSrc.src = '/img/' + data.single_img;
    
}