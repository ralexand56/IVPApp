import { Reducer } from 'redux';
import {
    ClientState,
    KnownAction
} from '../datatypes';

const unloadedState: ClientState = {
    searchResultsIsVisible: true,
};

const reducer: Reducer<ClientState> = (state: ClientState, action: KnownAction) => {
    switch (action.type) {
        case 'SET_SEARCH_RESULTS_VISIBILITY':
            return {
                ...state,
                searchResultsIsVisible: action.isVisible,
            };
            
        default:
            return state || unloadedState;
    }
};

export default reducer;