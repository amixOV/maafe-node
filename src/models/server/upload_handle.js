const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const util = require('util')


insertImg =  (req, res) => {
  return new Promise((response, rej) => {
    
    // Set The Storage Engine
    const storage = multer.diskStorage({
      destination: './src/public/img/',
      filename: function(req, file, cb){
        const fileName = file.fieldname + '-' + Date.now() + '-' + file.originalname;   
        cb(null, fileName);
      }
    });
    
    // Init Upload
    const upload = multer({
      storage: storage,
      limits:{fileSize: 100000000},
      fileFilter: function(req, file, cb){ 
        checkFileType(file, cb);
      }
    }).single('single_img');
    
    // Check File Type
    function checkFileType(file, cb){
    //  console.log('file from handle 29 : ' +  util.inspect(file, {showHidden: false, depth: null}) );
      
      // Allowed ext
      const filetypes = /jpeg|jpg|png|gif/;
      // Check ext
      const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
      // Check mime
      const mimetype = filetypes.test(file.mimetype);
    
      if(mimetype && extname){
        return cb(null, true);
      } else {
        cb('Error: Images Only!');
      }
    }

    upload(req, res, (err) => {
        
      //console.log( "file from handle 46 : " + util.inspect(req.file, {showHidden: false, depth: null}))
      if(err){
        console.log('some err : ' + err , req.file);
        rej( err );
      } else {
        if(req.file == undefined){
        console.log('file is undefined');
        rej( err );
        
        } else {
          console.log('File Uploaded!');
          res = req.file.filename;
          response( res ) ;
        }
      }
    });
  });
}
module.exports = insertImg;