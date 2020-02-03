const httpServer = require('http').Server;
const fs = require('fs');
const path = require('path');

class MyServer extends httpServer {

    constructor() {
        super();
        this.listen(3000);
        this.on('request', this.requestHandler);
    }
    requestHandler(request, response) {
       
        //response.write('Hello World');
        
        //const src = fs.createReadStream( __dirname + './../public/index.html');
        const src = fs.createReadStream( path.join(__dirname, '../public/index.html'));
        src.pipe(response);
    }
}
const myServer = new MyServer();
//module.exports.myServer = myServer;
module.exports = MyServer;