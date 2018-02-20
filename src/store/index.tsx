// import { createSelector } from 'reselect';
import AssetReducer from './AssetReducer';
import ClientReducer from './ClientReducer';
import { AssetState, ClientState } from '../datatypes';

// The top-level state object
export interface ApplicationState {
  assetSlice: AssetState;
  clientSlice: ClientState;
}

// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
export const reducers = {
  assetSlice: AssetReducer,
  clientSlice: ClientReducer
};

export interface AppThunkAction<TAction> {
  (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}

export default reducers;