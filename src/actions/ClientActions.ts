// import {
//     KnownAction,
// } from '../datatypes';

const actionCreators = {
    addClient: (clientId: number) => ({
        type: 'ADD_CLIENT',
        newClient: {
            id: clientId,
            firstName: 'New',
            lastName: 'Client',
        }
    }),

    setSearchResultsVisibility: (isVisible: boolean) => ({
        type: 'SET_SEARCH_RESULTS_VISIBILITY',
        isVisible,
    }),

    setCurrentClient: (clientId: number) => ({
        type: 'SET_CURRENT_CLIENT',
        clientId,
    }),

    setClientTab: (selectedClientTabId: number) => ({
        type: 'SET_CLIENT_TAB',
        clientTabId: selectedClientTabId,
    }),
};

export default actionCreators;