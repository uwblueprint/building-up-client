import { combineReducers } from 'redux';
import shopifyState from './shopify';
import auth from './auth';

export default combineReducers({ shopifyState, auth });
