const express = require('express');
const flash = require('connect-flash');
const router = express.Router();

const logData = require('../models/log_data.js');
const style = '/css/style.css';
/* 

app.get('/', indexRouter);
app.get('/help', indexRouter);
app.get('/about', indexRouter);
app.get('/product', indexRouter);
app.get('/store', indexRouter);
app.get('/contact', indexRouter);
app.get('/logs', indexRouter);
app.get('/login', indexRouter);
app.get('/register', indexRouter);
app.get('/logout', indexRouter);
 */
// obj global
// דפדפן חוסם קריאות של api
// port standart 80
// react port 3000
// exios
// svelt
// ... obj
router.use(flash());

router.get('/', async (req, res) => {
    res.render('index', { title: 'home page', style});
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