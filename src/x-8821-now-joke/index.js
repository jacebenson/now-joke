import { createCustomElement } from '@servicenow/ui-core';
import snabbdom, { Fragment, createRef} from '@servicenow/ui-renderer-snabbdom';
import styles from './styles.scss';

/*
import {createHttpEffect} from '@servicenow/ui-effect-http';

const USER_FETCH_SUCCESS = 'USER_FETCH_SUCCESS'
const jokeURL = "https://wizardly-wing-66188a.netlify.com/.netlify/functions/server/"

const fetchUserEffect = createHttpEffect(jokeURL, {
     method: 'GET',
     //headers: {},
     //pathParams: '',
     //dataParam: '',
     successActionType: USER_FETCH_SUCCESS
});
*/
var http = require("https");
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
const view = (state, { updateState }) => {
	const buttonRef = createRef();
	return (
		<Fragment>
			<div>
				<h3>
					I'm working with MAV to figure out NOW CLI stuff
			</h3>
			</div>
			<div ref={buttonRef}>
				<button on-click={function(){
					getJoke(updateState({
						joke: joke
					}));
					//dispatchEvent('USER_FETCHED')
					/*updateState({
						joke: "Updated Joke",
						punchline: "Updated Punchline"
					})*/
					console.log('I can do something with a ref here', buttonRef.current);
					console.log(state);
				}
				}>Submit</button>
			</div>
			<div>
				{JSON.stringify(state)}
				{joke}
			</div>
		</Fragment>
	);
};

createCustomElement('x-8821-now-joke', {
	renderer: { type: snabbdom },
	view,
	styles,
	properties: {
		name: {
			default: { "joke": "default", "punchline": "test" }
		},
	},
	//transformState: ({properties})=>(properties)
	transformState: function (properties) {
		return properties.jokeB
	}/*,
	actionHandlers: {
        'USER_FETCHED': fetchUserEffect,
        [USER_FETCH_SUCCESS]: ({action, updateState}) => {
			console.log('action', action);
		}
    }*/
});