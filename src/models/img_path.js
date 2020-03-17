const path = require('path');
const fs = require('fs');

imgPath = () =>{
    const imgPath = './src/public/img';
    return new Promise( (res, rej)  => {
        fs.readdir(imgPath, (err, files) => {
            if(err) rej(err);
            let imgFile;
            let imgArr = [];
            files.forEach(file => {
                imgFile = path.join('/img/' + file);
                imgArr.push(imgFile);
            });
            res(imgArr);
        });
    })
}  

module.exports = imgPath;