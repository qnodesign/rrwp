import { createStore, combineReducers, applyMiddleware } from 'redux';
import { routerReducer } from 'react-router-redux';
import ResourceReducer from './reducers/ResourceReducer';
import TranslationReducer from './reducers/TranslationReducer';
import Logger from './middlewares/LoggerMiddleware';

export default createStore(
  combineReducers({
    routing: routerReducer,
    resources: ResourceReducer,
    translation: TranslationReducer,
  }),
  applyMiddleware(Logger)
);
