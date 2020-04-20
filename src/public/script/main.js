document.addEventListener('DOMContentLoaded', function() {
    new Tablesort(document.getElementById('covid-table'));
    
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
       let x = 0;
       for (const key in data) {
           if (data.hasOwnProperty(key)) {
               const e = data[key];
               let row = covid.insertRow(x);

               let cell0 = row.insertCell(0);
               let cell1 = row.insertCell(1);
               let cell2 = row.insertCell(2);
               let cell3 = row.insertCell(3);
               let cell4 = row.insertCell(4);
               let cell5 = row.insertCell(5);
               let cell6 = row.insertCell(6);
               let cell7 = row.insertCell(7);
               let cell8 = row.insertCell(8);
               let cell9 = row.insertCell(9);
 
               let time = new Date(e.time);
               let dateTime = time.toLocaleDateString();
               let hourTime = time.toLocaleTimeString();
               
                cell0.innerHTML = e.country ; //=== null ? 0 : e.country;
                cell1.innerHTML = e.cases.new ; //=== null ? 0 : e.cases.new;
                cell2.innerHTML = e.cases.active ; //=== null ? 0 : e.cases.active;
                cell3.innerHTML = e.cases.critical ; //=== null ? 0 : e.cases.critical;
                cell4.innerHTML = e.cases.recovered ; //=== null ? 0 : e.cases.recovered ;
                cell5.innerHTML = e.cases.total ; //=== null ? 0 : e.cases.total;
                cell6.innerHTML = e.deaths.new ; //=== null ? 0 : e.deaths.new;
                cell7.innerHTML = e.deaths.total ; //=== null ? 0 : e.deaths.total;
                cell8.innerHTML = e.tests.total ; //=== null ? 0 : e.tests.total;
                cell9.innerHTML = dateTime +' ' + hourTime;
                x++
           }
       }
    }
})

    /*
    
    const getCellValue = (tr, idx) => tr.children[idx].innerText || tr.children[idx].textContent;

    const comparer = (idx, asc) => (a, b) => ((v1, v2) => 
        v1 !== '' && v2 !== '' && !isNaN(v1) && !isNaN(v2) ? v1 - v2 : v1.toString().localeCompare(v2)
        )(getCellValue(asc ? a : b, idx), getCellValue(asc ? b : a, idx));

    // do the work...
    document.querySelectorAll('th').forEach(th => th.addEventListener('click', (() => {
        const table = th.closest('table');
        Array.from(table.querySelectorAll('tr:nth-child(n+2)'))
            .sort(comparer(Array.from(th.parentNode.children).indexOf(th), this.asc = !this.asc))
            .forEach(tr => table.appendChild(tr) );
    })));
   
th = document.getElementsByTagName('th');

for(let x=0; x < th.length; x++){
    console.log(th[x]);
    
    th[x].addEventListener('click', () => {
        console.log(x)
        sortTable(x)
    })
    
}

function sortTable(c) {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("my-table");
  switching = true;
  /*Make a loop that will continue until
  no switching has been done:
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /*Loop through all table rows (except the
    first, which contains table headers):
    for (i = 1; i < rows.length; i++) { //(rows.length - 1)
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:
      x = rows[i].getElementsByTagName('TD')[c];
      y = rows[i + 1].getElementsByTagName('TD')[c];
      //check if the two rows should switch place:
      if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
        //if so, mark as a switch and break the loop:
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}
*/
