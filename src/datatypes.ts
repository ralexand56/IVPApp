import { Client } from './datatypes';
import { keyframes } from 'styled-components';
import ThemeInterface from './theme';
import firebase from 'firebase';

export const config = {
  apiKey: 'AIzaSyD6TDZWzU46rY07IHpz93778CpAVzLohcY',
  authDomain: 'ivpdb-1399c.firebaseapp.com',
  databaseURL: 'https://ivpdb-1399c.firebaseio.com',
  projectId: 'ivpdb-1399c',
  storageBucket: 'ivpdb-1399c.appspot.com',
  messagingSenderId: '390995409712'
};

export let db: firebase.firestore.Firestore;

export const initializeDB = () => {
  firebase.initializeApp(config);

  db = firebase.firestore();
};

export const defaultUser = {
  id: 'CTnkHtETIl0J5qxwloss',
  isActive: true,
  firstName: 'Irina',
  lastName: 'Panasyuk',
  imgSrc: 'irina.jpg',
  created: new Date(),
  userName: 'admin',
  pwd: 'Sn6gf!Wk2'
};

export interface ClientState {
  clients: Client[];
  clientTypes: ClientType[];
  currentClientId?: string;
  currentUser?: User;
  filteredClients: Client[];
  isInEditMode: boolean;
  searchResultsIsVisible: boolean;
  selectedClientTabId: number;
  message: string;
  users: User[];
  tagCategories: TagCategory[];
}

export interface AssetState { }

export interface Client {
  id?: string;
  isActive?: boolean;
  firstName?: string;
  lastName?: string;
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  country?: string;
  phone?: string;
  imgUrl?: string;
  email?: string;
  website?: string;
  title?: string;
  company?: string;
  clientTypeId?: string;
  assets?: Asset[];
  comments?: Comment[];
  interactions?: Interaction[];
  tagIds?: string[];
  tags?: Tag[];
}

export interface ClientType {
  id?: string;
  name?: string;
}

export interface Asset {
  id: number;
  worth: number;
  url: string;
  type: string;
}

export interface Comment {
  id?: string;
  body: string;
  created: Date;
  userId?: string;
  user?: User;
}

export interface Interaction {
  id: number;
  body: string;
  created: Date;
}

export interface User {
  id?: string;
  isActive?: boolean;
  firstName?: string;
  lastName?: string;
  userName?: string;
  pwd?: string;
  created?: Date;
  imgSrc?: string;
}

export interface TagCategory {
  id?: string;
  name?: string;
  tags?: Tag[];
}

export interface Tag {
  id: string;
  category?: TagCategory;
  name?: string;
}

export type KnownAction =
  | AddClientAction
  | AddTagCategoryAction
  | AddClientTypeAction
  | AddUserAction
  | DeleteCommentAction
  | InitAction
  | SetFilteredClientsAction
  | SetClientEditModeAction
  | SetClientTabAction
  | SetClientTypesAction
  | SetSearchResultsVisibilityAction
  | SetClientsAction
  | SetCurrentClientAction
  | SetMessageAction
  | SetTagCategoriesAction
  | SetUsersAction
  | UpdateClientAction
  | UpdateTagCategory;

export interface AddClientAction {
  type: 'ADD_CLIENT';
  newClient: Client;
}

export interface AddClientTypeAction {
  type: 'ADD_CLIENT_TYPE';
  clientType: ClientType;
}

export interface AddTagCategoryAction {
  type: 'ADD_TAG_CATEGORY';
  tagCategory: TagCategory;
}

export interface AddUserAction {
  type: 'ADD_USER';
  newUser: User;
}

export interface DeleteCommentAction {
  type: 'DELETE_COMMENT';
  id: string;
}

export interface SetClientsAction {
  type: 'SET_CLIENTS';
  clients: Client[];
}

export interface SetClientEditModeAction {
  type: 'SET_CLIENT_EDIT_MODE';
  isInEditMode: boolean;
}

export interface SetClientTabAction {
  type: 'SET_CLIENT_TAB';
  clientTabId: number;
}

export interface SetClientTypesAction {
  type: 'SET_CLIENT_TYPES';
  clientTypes: ClientType[];
}

export interface SetFilteredClientsAction {
  type: 'SET_FILTERED_CLIENTS';
  filteredClients: Client[];
}

export interface SetSearchResultsVisibilityAction {
  type: 'SET_SEARCH_RESULTS_VISIBILITY';
  isVisible: boolean;
}

export interface SetTagCategoriesAction {
  type: 'SET_TAG_CATEGORIES';
  tagCategories: TagCategory[];
}

export interface SetMessageAction {
  type: 'SET_MESSAGE';
  message: string;
}

export interface SetUsersAction {
  type: 'SET_USERS';
  users: User[];
}

export interface InitAction {
  type: 'INIT';
}

export interface SetCurrentClientAction {
  type: 'SET_CURRENT_CLIENT';
  clientId: string | undefined;
}

export interface UpdateClientAction {
  type: 'UPDATE_CLIENT';
  client: Client;
}

export interface UpdateTagCategory {
  type: 'UPDATE_TAG_CATEGORY';
  tagCategory: TagCategory;
}

export const theme: ThemeInterface = {
  headingBackground1: '#98323C',
  headingBackground2: '#CF4A59',
  bodyBackground: '#EBEAE7',
  bodyForeground: '#86A0CC'
};

export const fadeIn = () => keyframes`
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
`;
