import {
    BEERS_ERRORED,
    BEERS_LOADING,
    BEERS_SUCCEEDED,
    BEER_UPDATE_SUCCEEDED,
    BEER_DELETE_SUCCEEDED
} from "./types";

export function beersHasErrored(bool) {
    return {
        type: BEERS_ERRORED,
        hasErrored: bool
    };
}

export function beersIsLoading(bool) {
    return {
        type: BEERS_LOADING,
        isLoading: bool
    };
}

export function beersFetchDataSuccess(beers) {
    return {
        type: BEERS_SUCCEEDED,
        beers
    };
}

export function updateBeerSuccess(updatedBeer) {
    return { 
        type: BEER_UPDATE_SUCCEEDED,
         updatedBeer }
}

export function deleteBeerSuccess(deletedBeer) {
    return { 
        type: BEER_DELETE_SUCCEEDED,
        deletedBeer }
}

export function beersFetchData(url) {
    return (dispatch) => {
        dispatch(beersIsLoading(true));

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                
                dispatch(beersIsLoading(false));

                return response;
            })
            .then((response) => response.json())
            .then((beers) => dispatch(beersFetchDataSuccess(beers)))
            .catch(() => dispatch(beersHasErrored(true)));
    };
}

export function beersUpdateData(url, id, data) {
    return (dispatch) => {
        fetch(url + id,{
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response;
            })
            .then((response) => response.json())
            .then((beer) => dispatch(updateBeerSuccess(beer)))
    };
}

export function beersDeleteData(url, id) {
    return (dispatch) => {
        fetch(url + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response;
            })
            .then((beer) => dispatch(deleteBeerSuccess(beer)))
    };
}

