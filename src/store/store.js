import { createStore, combineReducers, applyMiddleware } from 'redux';
import { routerReducer } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import ResourceReducer from './reducers/ResourceReducer';
import TranslationReducer from './reducers/TranslationReducer';
import Logger from './middlewares/LoggerMiddleware';

export default createStore(
  combineReducers({
    routing: routerReducer,
    resources: ResourceReducer,
    translation: TranslationReducer,
  }),
  composeWithDevTools(applyMiddleware(Logger))
);
