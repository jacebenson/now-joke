import {createCustomElement} from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import styles from './styles.scss';
//import {JOKE} from '../getJoke';
var http = require("https");
var joke = {};
var getJoke = function(callback){
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
			return callback(JSON.parse(body));
			//state.joke = JSON.parse(body);
        });
	});
	console.log(returnObj);
	req.end();
}
const view = (state, {updateState}) => {
	return (
		<div>
			<h3>
			I'm working with MAV to figure out NOW CLI stuff
			</h3>
			{JSON.stringify(state)}
			{joke}
		</div>
	);
};

createCustomElement('x-8821-now-joke', {
	renderer: {type: snabbdom},
	view,
	styles,
	properties: {
		name: {
			default: {"joke": "default", "punchline":"test"}
		},
	},
	//transformState: ({properties})=>(properties)
	transformState: function(properties){
		properties.joke = 'getJoke()';
		getJoke(function(joke){
			properties.jokeB = joke
			console.log('jokea', joke)
		});
		return properties.jokeB
	}
});