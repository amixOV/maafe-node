const express = require('express');
const router = express.Router();
const logData = require('../models/log_data.js')
const style = '/css/style.css';

router.get('/some_page', (req, res) => {
    res.send('this text come from router');
})

router.get('/', async (req, res) => {
    logData(req);
    const getCovid = require('./../models/apis/get_covid.js');
    const imgPath = require('./../models/img_path.js');
    const api = await getCovid();
    const imgArr = await imgPath();
    
    res.render('index', { title: 'home page', style, imgArr, api});
});

router.get('/customer', (req, res) => {
    logData(req);
    res.render('customer', { title: 'customer', style });
})

router.get('/customer_item/:name', (req, res) => {
    logData(req);
    res.render('customer_item', {
        title: req.params.name,
        name: req.params.name,
        style
    });
})

router.get('/recipes', (req, res) => {
    logData(req);
    res.render('recipes', { title: 'recipes', style });
})

router.get('/product', (req, res) => {
    logData(req);
    res.render('product', { title: 'product', style });
})

router.get('/product_item/:id/:name/:cost', (req, res) => {
    logData(req);
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

router.get('/logs', async (req, res) => {
    logData(req);
    const fs = require('fs');
    
    getData = () => {
        return new Promise( (res, rej)  => {
            fs.readFile('log_data.json', (err, data) => {
                if(err) rej(err);
                //console.log(data);
                data = JSON.parse(data);
                res(data)
            })
        })

    }
    let data = await getData();
    let object = data[0].ip;
    for (const key in object) {
        if (object.hasOwnProperty(key)) {
            const object2 = object[key];
            for (const key2 in object2) {
                if (object2.hasOwnProperty(key2)) {
                    const object3 = object2[key2];
                    for (const key3 in object3) {
                        if (object3.hasOwnProperty(key3)) {
                            const element = object3[key3];
                            
                            console.log(key3, element);
                            console.log('--------------------------');
                        }
                    }
                }
            }
            
            
        }
    }

    //console.log(data[0].ip);
    res.render('logs', { title: 'logs', style, data });
})

module.exports = router;