
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

  
    //console.log(instance);
    //instance.next();

    // instance.next(3);
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