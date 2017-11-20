// import {
//     KnownAction,
// } from '../datatypes';

const actionCreators = {
    setSearchResultsVisibility: (isVisible: boolean) => ({
        type: 'SET_SEARCH_RESULTS_VISIBILITY',
        isVisible,
    }),
};

export default actionCreators;