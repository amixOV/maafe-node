document.addEventListener('DOMContentLoaded', function() {
    
initCArusel = () => {
    let ele_carusel = document.querySelectorAll('.carousel');
    let ele_carus = document.querySelector('#carus');

    const optCarusel = {
        //duration	Number	200	Transition duration in milliseconds.
        //dist	Number	-100	Perspective zoom. If 0, all items are the same size.
        //shift	Number	0	Set the spacing of the center item.
        //padding	Number	0	Set the padding between non center items.
        //numVisible	Number	5	Set the number of visible items.
        //fullWidth	Boolean	false	Make the carousel a full width slider like the second example.
        //indicators	Boolean	false	Set to true to show indicators.
        //noWrap	Boolean	false	Don't wrap around and cycle through items.
        //onCycleTo	Function	null	Callback for when a new slide is cycled to.
        duration:200,
        shift: 30,
        padding: 15,
        dist: -200,
        numVisible:7,
        indicators:true,
    
    }
    let ins_carusel = M.Carousel.init(ele_carusel, optCarusel);
    let instance = M.Carousel.getInstance(ele_carusel);

}
    
    fetch('/carusel_img', { 
        method: 'POST'
    })
    .then(res => res.text())
    .then(data => {
        data = JSON.parse(data);
        return data;
    })
    .then(data => insertToCarusel(data))
    .then(() => initCArusel())
    .catch ((err) => {
       
        console.error(err);
       
    })
    let carusel = document.getElementById('carusel');
    
    insertToCarusel = (data) => {
        carusel.classList.add('carousel');
        data.forEach(e => {
            carusel.innerHTML += '<a class="carousel-item" id="carus" href="#one!" ><img src="' + e + '"></a>'
        });
       
    }
    
    turn('on');
    fetch('/api_covid', { 
        method: 'POST'
    })
    .then(res => res.text())
    .then(data => {  
        data = JSON.parse(data);
        console.log(data) ;     
        return data;
    })
    .then(data => {
        turn('off')
        insertToCovid(data);

    })
    .catch((err) => {
        console.log(err); 
    })
    insertToCovid = data => {
       let covid = document.getElementById('covid');

       for (const key in data) {
           if (data.hasOwnProperty(key)) {
               const e = data[key];
               covid.innerHTML += `
               <tr>
                <td>${e.country}</td>
                <td>${e.cases.new}</td>
                <td>${e.cases.active}</td>
                <td>${e.cases.critical}</td>
                <td>${e.cases.recovered}</td>
                <td>${e.cases.total}</td>
                <td>${e.deaths.new}</td>
                <td>${e.deaths.total}</td>
                <td>${e.tests.total}</td>
                <td>${e.day}</td>
                <td>${e.time}</td>
               </tr>
               
               `
               
               
           }
       }
    }
})