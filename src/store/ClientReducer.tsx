import { Reducer } from 'redux';
import {
    sampleClients,
    ClientState,
    KnownAction
} from '../datatypes';

const unloadedState: ClientState = {
    searchResultsIsVisible: true,
    clients: sampleClients,
    currentClientId: sampleClients[0].id,
    filteredClients: sampleClients,
    isInEditMode: false,
    selectedClientTabId: 1,
};

const reducer: Reducer<ClientState> = (state: ClientState, action: KnownAction) => {
    switch (action.type) {

        case 'ADD_CLIENT':
            return {
                ...state,
                clients: [...state.clients, action.newClient],
                currentClientId: action.newClient.id,
            };

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

        case 'SET_CLIENT_TAB':
            return {
                ...state,
                selectedClientTabId: action.clientTabId,
            };

        default:
            return state || unloadedState;
    }
};

export default reducer;