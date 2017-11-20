import { Reducer } from 'redux';
import {
    AssetState,
    KnownAction
} from '../datatypes';

const unloadedState: AssetState = {

};

const reducer: Reducer<AssetState> = (state: AssetState, action: KnownAction) => {
    switch (action.type) {

        default:
            return state || unloadedState;
    }
};

export default reducer;