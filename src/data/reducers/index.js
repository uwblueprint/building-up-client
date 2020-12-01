import { combineReducers } from 'redux';
import shopifyState from './shopify';
import teamState from './team';
import auth from './auth';

export default combineReducers({ shopifyState, teamState, auth });
