import { createCustomElement } from '@servicenow/ui-core';
import snabbdom, { Fragment, createRef} from '@servicenow/ui-renderer-snabbdom';
import styles from './styles.scss';
import {joke, getJoke} from '../getJoke';

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
					getJoke(updateState(
						joke
						/*{//this works but only sets the "joke" not the punchline
						path: 'joke',
						value: joke.joke,
						operation: 'set'
					}*/));
				}
				}>Submit</button>
			</div>
			<div>
				<pre>
				    JSON.stringify(state):{JSON.stringify(state, '', ' ')}
				</pre>
			</div>
			<div> state.joke: {state.joke} </div>
		</Fragment>
	);
};

createCustomElement('x-8821-now-joke', {
	renderer: { type: snabbdom },
	view,
	styles,
	initialState: {
		joke: "initial",
		punchline: "punch"
	}
});