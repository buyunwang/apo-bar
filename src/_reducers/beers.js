import {
    BEERS_ERRORED,
    BEERS_LOADING,
    BEERS_SUCCEEDED,
    BEER_UPDATE_SUCCEEDED,
    BEER_DELETE_SUCCEEDED
} from "../_actions/types";

export function beersHasErrored(state = false, action) {
    switch (action.type) {
        case BEERS_ERRORED:
            return action.hasErrored;

        default:
            return state;
    }
}

export function beersIsLoading(state = false, action) {
    switch (action.type) {
        case BEERS_LOADING:
            return action.isLoading;

        default:
            return state;
    }
}

export function beers(state = [], action) {
    switch (action.type) {
        case BEERS_SUCCEEDED:
            return action.beers;

        case BEER_UPDATE_SUCCEEDED:
            return [
                ...state.filter(beer => beer.id !== action.beer.id),
                Object.assign({}, action.beer)
            ]

        case BEER_DELETE_SUCCEEDED: {
            return state.filter((beer) => beer.id !== action.id);
        }

        default:
            return state;
    }
}
