
document.addEventListener('DOMContentLoaded', function() {

    var ele_floatButton = document.querySelectorAll('.fixed-action-btn');
    var ins_floatButton = M.FloatingActionButton.init(ele_floatButton, {
       // toolbarEnabled: true,
        direction: 'buttom',
        hoverEnabled: false
    });

    let ele_side = document.querySelectorAll('.sidenav');
    let options = {};
    let instances_side = M.Sidenav.init(ele_side, options);


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
        numVisible: 7,
        padding: 15,
        dist: -120,
        indicators:true
    
    }
    let ins_carusel = M.Carousel.init(ele_carusel, optCarusel);
    let instance = M.Carousel.getInstance(ele_carusel);

}
    
    //turn('on');
    fetch('/carusel_img', { 
        method: 'POST'
    })
    .then(res => res.text())
    .then(data => {
        data = JSON.parse(data);
        console.log(data);
        return data;
    })
    .then(data => insertToCarusel(data))
    .then(() => initCArusel())
    //.then( () => turn('off'))
    .catch ((err) => {
       
        console.error(err);
       
    })
    let carusel = document.getElementById('carusel');
    
    insertToCarusel = (data) => {
        carusel.classList.add('carousel');
        data.forEach(e => {
            carusel.innerHTML += '<a class="carousel-item" id="carus" href="#one!" ><img src="' + e + '"></a>'
        });
       
        console.log(carusel);
    }

});


/*   Its done with CSS 

document.addEventListener('scroll', function(e){ 
    let footer = document.getElementById("footer_for_scroll");
    let header = document.getElementById("header_for_scroll");
    let panel = document.getElementById("panel_side");

    let x = document.body.clientHeight - footer.offsetHeight - header.offsetHeight - window.scrollY;

    panel.style.height = x + "px" ;

}, true);
*/