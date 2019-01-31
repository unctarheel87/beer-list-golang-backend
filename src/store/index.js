import { createStore, combineReducers } from "redux";
import beersReducer from "../reducers/beers";
import filtersReducer from "../reducers/filters";
import messagesReducer from '../reducers/messages';

export const store = createStore(combineReducers({
  beers: beersReducer,
  filters: filtersReducer,
  msg: messagesReducer
}), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());