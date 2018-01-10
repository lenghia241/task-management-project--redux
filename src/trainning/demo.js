import { createStore } from 'redux';

var initialState = {
	status:false,
	sort : {
		by : 'name',
		value: 1
	}
}

var myReducer = (state = initialState, action) => {
	return state;
}

const store = createStore(myReducer);
console.log('Default: ', store.getState());

var action = {type : 'TOGGLE_STATUS'}
store.dispatch(action);
console.log('TOGGLE_STATUS: ', store.getState());

var sortAction = {
	type : 'SORT',
	sort : {
		by: 'name',
		value: -1
	}
}
store.dispatch(sortAction);
console.log('SORT: ' ,store.getState());
