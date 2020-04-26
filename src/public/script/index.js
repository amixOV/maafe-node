console.log(todoList[2].completed);
let button = document.getElementById('butt');
button.addEventListener('click', () => {
    fetch('/aaa', {
        method: 'POST',
        body: todoList[2].completed
    })
    .then(data => {
        console.log(data);
        
    })
    
})
/* 
document.addEventListener('DOMContentLoaded', function() {
    
    var ele_tooltipped = document.querySelectorAll('.tooltipped');
    var instances = M.Tooltip.init(ele_tooltipped, {});
    
    var ele_floatButton = document.querySelectorAll('.fixed-action-btn');
    var ins_floatButton = M.FloatingActionButton.init(ele_floatButton, {
       // toolbarEnabled: true,
       direction: 'buttom',
       hoverEnabled: false
    });

    //let options = {};
    let ele_side = document.querySelectorAll('.sidenav');
    let instances_side = M.Sidenav.init(ele_side, {});



});

 */
/*   Its done with CSS 

document.addEventListener('scroll', function(e){ 
    let footer = document.getElementById("footer_for_scroll");
    let header = document.getElementById("header_for_scroll");
    let panel = document.getElementById("panel_side");

    let x = document.body.clientHeight - footer.offsetHeight - header.offsetHeight - window.scrollY;

    panel.style.height = x + "px" ;

}, true);
*/