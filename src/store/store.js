import { createStore, combineReducers, applyMiddleware } from 'redux';
import { routerReducer } from 'react-router-redux';
import ResourceReducer from './reducers/ResourceReducer';
import Logger from './middlewares/LoggerMiddleware';

export default createStore(
  combineReducers({
    resources: ResourceReducer,
  }),
  applyMiddleware(Logger)
);
