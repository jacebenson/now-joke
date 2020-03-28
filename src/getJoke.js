var http = require("https");
var getJoke = function(){
    console.log('in getJoke');
    var returnObj = {};
    var options = {
        method: "GET",
        hostname: "wizardly-wing-66188a.netlify.com",
        path: "/.netlify/functions/server",
        headers: {}
    };
    var req = http.request(options, function (res) {
        var chunks = [];
    
        res.on("data", function (chunk) {
            chunks.push(chunk);
        });
    
        res.on("end", function () {
            var body = Buffer.concat(chunks);
            //console.log(body.toString());
            returnObj = JSON.parse(body);
        });
    });
    req.end(); 
    return returnObj || {"crap":"didnt work"};
}

//export const joke = getJoke();
export const JOKE = {"joke": "I'm funny", "punchline": "not really"};
