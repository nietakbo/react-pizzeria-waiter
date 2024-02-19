import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import {thunk} from 'redux-thunk';
import initialState from './initialState';
import tablesReducer from './tableRedux';
import statusesReducer from './statusRedux';

const reducer = combineReducers({
  tables: tablesReducer,
  status: statusesReducer,
});

const store = createStore(
  reducer,
  initialState,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : f => f
  )
);

export default store;