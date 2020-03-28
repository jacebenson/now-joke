import {createCustomElement} from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import styles from './styles.scss';

const view = (state, {updateState}) => {
	return (
		<div>I'm working with MAV to figure out NOW CLI stuff</div>
	);
};

createCustomElement('x-8821-now-joke', {
	renderer: {type: snabbdom},
	view,
	styles
});
