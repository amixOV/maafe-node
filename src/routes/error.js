const express = require('express');
const flash = require('connect-flash');
const router = express.Router();

const logData = require('../models/log_data.js')
const style = '/css/style.css';

router.get('/401', (req, res) =>{
    res.render('error/401', {title:'product item', style});
});

router.get('/404', (req, res) =>{
    res.render('error/404', {title:'product item', style});
})

module.exports = router