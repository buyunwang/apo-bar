import {
    WINES_ERRORED,
    WINES_LOADING,
    WINES_SUCCEEDED
} from "./types";

export function winesHasErrored(bool) {
    return {
        type: WINES_ERRORED,
        wineHasErrored: bool
    };
}

export function winesIsLoading(bool) {
    return {
        type: WINES_LOADING,
        wineIsLoading: bool
    };
}

export function winesFetchDataSuccess(wines) {
    return {
        type: WINES_SUCCEEDED,
        wines
    };
}

export function winesFetchData(url) {
    return (dispatch) => {
        dispatch(winesIsLoading(true));

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                
                dispatch(winesIsLoading(false));

                return response;
            })
            .then((response) => response.json())
            .then((beers) => dispatch(winesFetchDataSuccess(beers)))
            .catch(() => dispatch(winesHasErrored(true)));
    };
}