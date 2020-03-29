var http = require('https');
var joke = {};
var getJoke = function (callback) {
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
			console.log(body.toString());
			joke = JSON.parse(body);
		});
	});
	console.log(returnObj);
	req.end();
}
export { joke, getJoke };
