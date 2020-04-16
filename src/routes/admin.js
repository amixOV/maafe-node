const express = require('express');
const flash = require('connect-flash');
const router = express.Router();

const logData = require('../models/log_data.js')
const style = '/css/style.css';

router.use(flash());
/*
let loginMsg;
router.use((req, res, next) => {
    //loginMsg = req.flash('loginMsg');
    if (Object.keys(loginMsg).length === 0 ) {
        console.log( typeof loginMsg);
        loginMsg = false;
    }
    next();
})
*/
router.get('/customer', (req, res) => {
    //logData(req);
    res.render('admin/customer', { title: 'customer', style });
})

router.get('/customer_item/:name', (req, res) => {
    //logData(req);
    res.render('admin/customer_item', {
        title: req.params.name,
        name: req.params.name,
        style
    });
})

router.get('/recipes', (req, res) => {
    //logData(req);
    res.render('admin/recipes', { title: 'recipes', style });
})

router.get('/productAdmin', (req, res) => {
    //logData(req);
    res.render('admin/productAdmin', { title: 'productAdmin', style });
})

router.get('/product_item/:id/:name/:cost', (req, res) => {
    //logData(req);
    const pro = {
        id:req.params.id,
        name:req.params.name,
        cost:req.params.cost
    }
    res.render('admin/product_item', { 
        title:'product item',
        style, 
        pro
    });
});

module.exports = router;