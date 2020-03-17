const loader = document.getElementById('loader');

turn = (a) => {
    if (a === 'on') {
        loader.style.display = 'block';
    }
    if (a === 'off') {
        loader.style.display = 'none';
    }
}