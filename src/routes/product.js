const express = require('express');
const router = express.Router();
const path = require('path');

router.use(express.json({limit:"100kb"}));
router.post('/send_data',  async (req, res, next) => {

  const insertToDB = require('./../models/server/send_data.js');
  
    try {
      const page = path.basename(req.headers.referer);
      let ans = await insertToDB(req.body, page);
      res.send(ans);
      res.end();
      
    } catch (error) {
      return next('from product routes insert to DB : ' + error);
      
    }
});

router.post('/db_data', async (req, res, next) => {
  const dataFromDB = require('./../../src/models/server/get_data.js');
  const queryObj = req.body;
 
  let page = path.normalize(req.headers.referer);
  page = page.split(path.sep);
  page = page[2];// http[0]://localhost:5500[1]/nnnn[--2--]/mmmm[3]
  const obj = await dataFromDB(queryObj, page);
  res.send(obj);
  res.end();
});  

router.post('/saveImage', async (req, res, next) => {
  const sendImg = require('../models/server/upload_handle.js');
  try {
    let ans = await sendImg(req, res);
    res.send(ans);
    res.end();
    
  } catch (error) {
    return next('from product routes save img : ' + error);

  }
 
}); 
module.exports = router;