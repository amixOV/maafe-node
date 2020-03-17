const express = require('express');
const router = express.Router();

const style = '/css/style.css';

router.get('/some_page', (req, res) => {
    res.send('this text come from router');
})

router.get('/', async (req, res) => {
    const getCovid = require('./../models/apis/get_covid.js');
    const imgPath = require('./../models/img_path.js');
    const api = await getCovid();
    const imgArr = await imgPath();
    
    res.render('index', { title: 'home page', style, imgArr, api});
});

router.get('/customer', (req, res) => {
    res.render('customer', { title: 'customer', style });
})

router.get('/customer_item/:name', (req, res) => {
    res.render('customer_item', {
        title: req.params.name,
        name: req.params.name,
        style
    });
})

router.get('/recipes', (req, res) => {
    res.render('recipes', { title: 'recipes', style });
})

router.get('/product', (req, res) => {
    res.render('product', { title: 'product', style });
})

router.get('/product_item/:id/:name/:cost', (req, res) => {
    const pro = {
        id:req.params.id,
        name:req.params.name,
        cost:req.params.cost
    }
    res.render('product_item', { 
        title:'product item',
        style, 
        pro
    });
});

module.exports = router;