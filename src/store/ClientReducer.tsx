import { Reducer } from 'redux';
import { defaultUser, ClientState, KnownAction } from '../datatypes';

const unloadedState: ClientState = {
  searchResultsIsVisible: true,
  clients: [],
  clientTypes: [],
  currentClientId: undefined,
  currentUser: defaultUser,
  filteredClients: [],
  isInEditMode: false,
  message: '',
  selectedClientTabId: 1,
  tagCategories: [],
  users: [],
};

const reducer: Reducer<ClientState> = (
  state: ClientState,
  action: KnownAction,
) => {
  switch (action.type) {
    case 'ADD_CLIENT':
      return {
        ...state,
        clients: [...state.clients, action.newClient],
        filteredClients: [...state.filteredClients, action.newClient],
        currentClientId: action.newClient.id,
        isInEditMode: true,
      };

    case 'ADD_TAG_CATEGORY':
      return {
        ...state,
        tagCategories: [...state.tagCategories, action.tagCategory],
      };

    case 'ADD_CLIENT_TYPE':
      return {
        ...state,
        clientTypes: [...state.clientTypes, action.clientType],
      };

    case 'SET_SEARCH_RESULTS_VISIBILITY':
      return { ...state, searchResultsIsVisible: action.isVisible };

    case 'SET_CLIENTS':
      return { ...state, clients: action.clients };

    case 'SET_CURRENT_CLIENT':
      return { ...state, currentClientId: action.clientId };

    case 'SET_CLIENT_EDIT_MODE':
      return { ...state, isInEditMode: action.isInEditMode };

    case 'SET_CLIENT_TAB':
      return { ...state, selectedClientTabId: action.clientTabId };

    case 'SET_CLIENT_TYPES':
      return { ...state, clientTypes: action.clientTypes };

    case 'SET_FILTERED_CLIENTS':
      return { ...state, filteredClients: action.filteredClients };

    case 'SET_MESSAGE':
      return { ...state, message: action.message };

    case 'SET_TAG_CATEGORIES':
      return { ...state, tagCategories: action.tagCategories };

    case 'SET_USERS':
      return { ...state, users: action.users };

    case 'UPDATE_CLIENT':
      return {
        ...state,
        clients: state.clients
          .map(x => (x.id === action.client.id ? action.client : x))
          .filter(c => c.isActive),
        filteredClients: state.filteredClients
          .map(x => (x.id === action.client.id ? action.client : x))
          .filter(c => c.isActive),
      };

    case 'UPDATE_TAG_CATEGORY':
      return {
        ...state,
        tagCategories: state.tagCategories.map(
          x => (x.id === action.tagCategory.id ? action.tagCategory : x),
        ),
      };

    default:
      return state || unloadedState;
  }
};

export default reducer;
