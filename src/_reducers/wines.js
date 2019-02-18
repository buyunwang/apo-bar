import {
    WINES_ERRORED,
    WINES_LOADING,
    WINES_SUCCEEDED
} from "../_actions/types";

export function winesHasErrored(state = false, action) {
    switch (action.type) {
        case WINES_ERRORED:
            return action.wineHasErrored;

        default:
            return state;
    }
}

export function winesIsLoading(state = false, action) {
    switch (action.type) {
        case WINES_LOADING:
            return action.wineIsLoading;

        default:
            return state;
    }
}

export function wines(state = [], action) {
    switch (action.type) {
        case WINES_SUCCEEDED:
            return action.wines;

        default:
            return state;
    }
}
