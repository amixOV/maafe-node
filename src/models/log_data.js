const os = require( 'os' );
const fs = require( 'fs' );
logData = (req) =>{

    const broswerData = {
        'from': req.path,
        'host': req.headers.host,
        'ip': req.ip,
        'Language': req.headers["accept-language"],
        'Browser': req.headers["user-agent"]
    }
    
    let ipJson = {};
    ipJson.time = new Date();
    ipJson.ip = os.networkInterfaces();
    ipJson.broswer = broswerData;
    
    fs.exists('log_data.json', function (exists) {
        if (exists) {
            fs.readFile('log_data.json', function (err, data) {
                if (err) throw err;
                let json = JSON.parse(data)
                json.push(ipJson);
        
                fs.writeFile("log_data.json", JSON.stringify(json), (err, r) => {
                    if (err) throw err;
                    
                })
            });
        }else{
            const data = [];
            data.push(ipJson);
            const json = JSON.stringify(data);
            fs.appendFile('log_data.json', json , function (err) {
                if (err) throw err;
                
            });
        }
    })
}

module.exports = logData;