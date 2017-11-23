// import {
//     KnownAction,
// } from '../datatypes';

const actionCreators = {
    setSearchResultsVisibility: (isVisible: boolean) => ({
        type: 'SET_SEARCH_RESULTS_VISIBILITY',
        isVisible,
    }),

    setCurrentClient: (clientId: number) => ({
            type: 'SET_CURRENT_CLIENT',
            clientId,
    }),
};

export default actionCreators;