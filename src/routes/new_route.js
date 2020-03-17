const express = require('express');
const router = express.Router();

const funfun = () => {
    return 'text';
}

router.use((req, res, next) => {  
    funfun();
    next()
})

router.get('/', (req, res ) => {
    res.send('index page');
})

router.get('/a', (req,res) => {
    res.send('aaaaa page');
})

module.exports = router;