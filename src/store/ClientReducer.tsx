import { Reducer } from 'redux';
import {
    sampleClients,
    ClientState,
    KnownAction
} from '../datatypes';

const unloadedState: ClientState = {
    searchResultsIsVisible: true,
    clients: sampleClients,
    currentClientId: 2,
};

const reducer: Reducer<ClientState> = (state: ClientState, action: KnownAction) => {
    switch (action.type) {
        case 'SET_SEARCH_RESULTS_VISIBILITY':
            return {
                ...state,
                searchResultsIsVisible: action.isVisible,
            };

        case 'SET_CURRENT_CLIENT':
            return {
                ...state,
                currentClientId: action.clientId,
            };
            
        default:
            return state || unloadedState;
    }
};

export default reducer;