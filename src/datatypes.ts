import ThemeInterface from './theme';

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

export const theme: ThemeInterface = {
    headingBackground1: '#784D62',
    headingBackground2: '#B87580',
};