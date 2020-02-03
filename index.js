  
  //   -- to make server here with express --
  if(process.env.NODE_ENV !== 'production'){
    const dotenv = require('dotenv').config();
  }

  const express = require('express');
  const app = express();
  const PORT = 5500;
  const indexRouter = require('./src/routes/index');
  
  app.listen(process.env.PORT || PORT, () => {
    console.log('app listening in port :' + PORT);
  });

  app.use(express.static(__dirname + '/src/public'));

  app.get('/some_page', indexRouter);
  app.get('/mmm/:id', indexRouter);
  app.get('/product', indexRouter)
  
  app.use(express.json({limit:"100kb"}));
  app.post('/api',  async (req, res, next) => {
  const insertToDB = require('./src/models/server/send_data.js');

      try {
        let ans = await insertToDB(req.body);
        res.send(ans);
        res.end();
        
      } catch (error) {
        return next('from the main index : ' + error);
        
      }
  });

  app.get('/db_data', async (req, res, next) => {
    const dataFromDB = require('./src/models/server/get_data.js');
    const obj = await dataFromDB();
    res.send(obj);
    res.end();
  });

  app.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that!")
  })
