export interface ClientState {
    searchResultsIsVisible: boolean;
}

export interface AssetState {

}

export type KnownAction =
    InitAction |
    SetSearchResultsVisibilityAction
;

export interface InitAction {
    type: 'INIT';
}

export interface SetSearchResultsVisibilityAction {
    type: 'SET_SEARCH_RESULTS_VISIBILITY';
    isVisible: boolean;
}