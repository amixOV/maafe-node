  
  if(process.env.NODE_ENV !== 'production'){
    const dotenv = require('dotenv').config();
  }

  const express = require('express');
  const app = express();
  const path = require('path');
  const expressLayouts = require('express-ejs-layouts');
  
  const PORT = 5500;

  const indexRouter = require('./src/routes/index');
  const productRouter = require('./src/routes/product.js');

  app.set('views', path.join(__dirname, 'src/view'));
  app.set('view engine', 'ejs');
  app.set('layout', 'layouts/layout');
  app.use(expressLayouts)

  app.listen(process.env.PORT || PORT, () => {
    console.log('app listening in port :' + PORT);
  });

  app.use(express.static(__dirname + '/src/public'));
  app.get('/', indexRouter);
  app.get('/some_page', indexRouter);
  app.get('/product_item/:id/:name/:cost', indexRouter);
  app.get('/product', indexRouter);
  app.get('/customer', indexRouter);
  app.get('/customer_item/:name', indexRouter);
  app.get('/recipes', indexRouter);
  app.get('/help', indexRouter);
  app.get('/logs', indexRouter);
  
  app.post('/send_data', productRouter);
  app.post('/db_data', productRouter);
  app.post('/saveImage', productRouter);

  const newRouter = require('./src/routes/new_route.js')

  app.use('/abc', newRouter)
  
app.use( (req, res, next) => {
  res.status(404).send("Sorry can't find that!")
})
 