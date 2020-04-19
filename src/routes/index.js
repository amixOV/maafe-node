const express = require('express');
const flash = require('connect-flash');
const router = express.Router();

const logData = require('../models/log_data.js')
const style = '/css/style.css';

router.use(flash());
/*
let loginMsg;
router.use((req, res, next) => {
    loginMsg = req.flash('loginMsg');
    if (Object.keys(loginMsg).length === 0 ) {
        console.log('------');
        
        console.log( typeof loginMsg);
        loginMsg = false;
    }
    next();
})
*/
router.use((req, res, next) => {

    //req.session.sAmix = 'session amix';
    //res.locals.lAmix = 'local amix';
    //res.locals.loginMsg = 'you are connected !';
    //console.log( res.locals.loginMsg );
    //console.log( loginMsg );
    //console.log( req.session );
    //console.log( sAmix );
    //console.log( req.session.sAmix);
    //console.log( lAmix );
    //console.log( req.sessionID );
    //console.log(session.cookie.sAmix);
    //res.locals.msg = req.flash('msg');
    next();
})



router.get('/', async (req, res) => {
    /*
    const getCovid = require('./../models/apis/get_covid.js');
    const imgPath = require('./../models/img_path.js');

    let api;
    try {
        api = await getCovid();
        
    } catch (error) {
        api = error;
        console.log(error);
        
    }
    
    const imgArr = await imgPath();
    */
    res.render('index', { title: 'home page', style});//, imgArr, api
});


router.get('/about', (req, res) => {
    res.render('about', { title: 'about', style});
});

router.get('/product', (req, res) => {
    res.render('product', { title: 'product', style});   
});

router.get('/store', (req, res) => {  
    res.render('store', { title: 'store', style});
});

router.get('/contact', (req, res) => {
    res.render('contact', { title: 'contact', style});  
});

router.get('/logs', async (req, res) => {
    if (!req.session.loggedIn) {
        res.status(401).render('error/401', { title: '401', style });
    }
    //logData(req);
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

    //console.log(data[0].ip);
    res.render('logs', { title: 'logs', style, data });
})

router.get('/login', (req, res) => {
    res.render('login',{title: 'login', style})
})

router.get('/register', (req, res) => {
    res.render('register',{title: 'register', style })
})

router.get('/logout', (req, res) => {
    req.session.loggedIn = false;
    req.flash('loginMsg', 'you are disconnected from login !');
    res.redirect( '/' );
})
module.exports = router;