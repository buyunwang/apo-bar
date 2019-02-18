import { combineReducers } from 'redux';
import { beers, beersHasErrored, beersIsLoading } from './beers';
import { wines, winesHasErrored, winesIsLoading } from './wines';

export default combineReducers({
    beers,
    beersHasErrored,
    beersIsLoading,
    wines, 
    winesHasErrored, 
    winesIsLoading
});