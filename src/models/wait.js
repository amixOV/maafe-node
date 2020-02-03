wait = (data) => {
   
    return new Promise(resolve => {
        setTimeout(() => {
            data = "this " + data + " from wait ";
            resolve(data);
        }, 5000);
    });
}
/*
wait = (data) => {
    
    data = "this " + data + " from wait ";
    return data;
}
 */
module.exports = wait;