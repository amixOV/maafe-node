const loader = document.getElementById('loader');
const loader2 = document.getElementById('loader2');
const botton = document.getElementById('botton');
turn = (a) => {
    if (a === 'on') {
        loader.style.display = 'block';
    }
    if (a === 'off') {
        loader.style.display = 'none';
    }
}

turn2 = (a) => {
    if (a === 'on') {
        loader2.style.display = 'block';
        button.classList.add("disabled"); // 'preloader-wrapper big disabled';

    }
    if (a === 'off') {
        loader2.style.display = 'none';
        button.classList.remove("disabled");
    }
}