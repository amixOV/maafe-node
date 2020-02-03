const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/some_page', (req, res) => {
    res.send('this text come from router');
})

router.get('/mmm/:id', (req, res) => {
    res.send('this is moshe page : ' +  req.params.id +
            '<br>you can change the number : '+
            '<br>by changing the number in the url' )
    console.log( req.params.id );
        
});

router.get('/product', (req, res) => {
    res.sendFile(path.resolve(__dirname + './../view/product.html') );
});

/*
router.get('/help', (req, res) => {
    const helpPage = path.join(__dirname, 'src/public/help.html');
    fs.readFile(helpPage, (err, data) => {
    res.write(data);
    res.end();
    });
});
*/
module.exports = router;