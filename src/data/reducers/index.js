import { combineReducers } from 'redux';
import shopifyState from './shopify';
import teamState from './team';

export default combineReducers({ shopifyState, teamState });
