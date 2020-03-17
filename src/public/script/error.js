
errorMessege = err => {
    errorTag.style.display = 'block';
    errorTag.innerHTML = `Error :  ${err} `;
    setTimeout(() => {
        errorTag.style.display = 'none';
    }, 4000);
    turn('off');
    throw new Error(err);
}
