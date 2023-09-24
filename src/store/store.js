import {compose,createStore,applyMiddleware} from 'redux';
import {logger} from "redux-logger/src";
import {rootReducer} from "./root-reducer";

// before anything else the actions first hit the middleware
const middlewares = [logger];

const composedEnhancers = compose (applyMiddleware(...middlewares))
export const store = createStore(rootReducer, undefined,composedEnhancers)