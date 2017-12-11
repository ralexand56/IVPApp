import {
  Client,
  Comment,
  db,
  KnownAction,
  Tag,
  TagCategory,
  User,
} from '../datatypes';
import { AppThunkAction, ApplicationState } from '../store';

const actionCreators = {
  addClient: ():
    AppThunkAction<KnownAction> => (dispatch: (action: KnownAction) => void, getState: () => ApplicationState) => {
      addClient(dispatch);

      dispatch({
        type: 'SET_MESSAGE',
        message: 'Adding a client...'
      });
    },

  addComment: (cmt: Comment, client: Client):
    AppThunkAction<KnownAction> => (dispatch: (action: KnownAction) => void, getState: () => ApplicationState) => {
      addComment(dispatch, cmt, client, getState().clientSlice.currentUser);

      dispatch({
        type: 'SET_MESSAGE',
        message: 'Adding a comment...',
      });
    },

  addTagCategory: (name: string):
    AppThunkAction<KnownAction> => (dispatch: (action: KnownAction) => void, getState: () => ApplicationState) => {
      addTagCategory(dispatch, name);

      dispatch({
        type: 'SET_MESSAGE',
        message: 'Adding a client...'
      });
    },

  addTagToCategory: (name: string, tagCategory: TagCategory):
    AppThunkAction<KnownAction> => (dispatch: (action: KnownAction) => void, getState: () => ApplicationState) => {
      addTagToCategory(dispatch, name, tagCategory);

      dispatch({
        type: 'SET_MESSAGE',
        message: 'Adding a client...'
      });
    },

  addUser: (usr: User):
    AppThunkAction<KnownAction> => (dispatch: (action: KnownAction) => void, getState: () => ApplicationState) => {
      addUser(dispatch, usr);

      dispatch({
        type: 'SET_MESSAGE',
        message: 'Adding a user...'
      });
    },

  deleteComment: (id: string, client: Client):
    AppThunkAction<KnownAction> => (dispatch: (action: KnownAction) => void, getState: () => ApplicationState) => {
      deleteComment(dispatch, id, client);

      dispatch({
        type: 'SET_MESSAGE',
        message: 'Deleting comment...'
      });
    },

  init: ():
    AppThunkAction<KnownAction> => (dispatch: (action: KnownAction) => void, getState: () => ApplicationState) => {
      setUsers(dispatch);
      setClients(dispatch);

      dispatch({
        type: 'SET_MESSAGE',
        message: 'Initializing...',
      });
    },

  setSearchResultsVisibility: (isVisible: boolean) => ({
    type: 'SET_SEARCH_RESULTS_VISIBILITY',
    isVisible,
  }),

  setCurrentClient: (clientId: string | undefined) => ({
    type: 'SET_CURRENT_CLIENT',
    clientId,
  }),

  setClientEditMode: (isInEditMode: boolean) => ({
    type: 'SET_CLIENT_EDIT_MODE',
    isInEditMode,
  }),

  setClientTab: (selectedClientTabId: number) => ({
    type: 'SET_CLIENT_TAB',
    clientTabId: selectedClientTabId,
  }),

  updateClient: (client: Client):
    AppThunkAction<KnownAction> => (dispatch: (action: KnownAction) => void, getState: () => ApplicationState) => {
      updateClient(dispatch, client);

      dispatch({
        type: 'UPDATE_CLIENT',
        client,
      });
    },
};

export const addClient = async (dispatch: (action: KnownAction) => void) => {
  const newClient: Client = {
    isActive: true,
    id: '',
    firstName: 'New',
    lastName: 'Client'
  };

  const clientRef = await db.collection('clients').add(newClient);
  db.collection('clients').doc(clientRef.id).update({ id: clientRef.id });
  newClient.id = clientRef.id;
  dispatch({
    type: 'ADD_CLIENT',
    newClient,
  });
};

export const addComment = async (
  dispatch: (action: KnownAction) => void,
  newComment: Comment, client: Client,
  user?: User) => {
  const clientRef = await db.collection('clients').doc(client.id);
  const newCommentRef = await clientRef.collection('comments').doc();

  newComment.id = newCommentRef.id;

  const comments = [...client.comments || [], newComment];
  clientRef.update({ comments: comments });

  comments.filter(x => x.id === newComment.id)[0].user = user;
  client.comments = comments;
  dispatch({
    type: 'UPDATE_CLIENT',
    client,
  });
};

export const addTagCategory = async (dispatch: (action: KnownAction) => void, name: string) => {
  const newTagCategory: TagCategory = {
    name,
  };
  const categoriesRef = await db.collection('tagCategories').add(newTagCategory);
  db.collection('tagCategories').doc(categoriesRef.id).update({ id: categoriesRef.id });
  newTagCategory.id = categoriesRef.id;

  dispatch({
    type: 'ADD_TAG_CATEGORY',
    tagCategory: newTagCategory,
  });
};

export const addTagToCategory = async (
  dispatch: (action: KnownAction) => void,
  name: string,
  tagCategory: TagCategory) => {
  const newTag: Tag = {
    name,
  };
  const tagCategoryRef = await db.collection('tagCategories').doc(tagCategory.id);
  const newTagRef = await tagCategoryRef.collection('tags').doc();

  newTag.id = newTagRef.id;
  const tags = [...tagCategory.tags || [], newTag];
  tagCategoryRef.update({ tags: tags });

  tagCategory.tags = tags;

  dispatch({
    type: 'UPDATE_TAG_CATEGORY',
    tagCategory,
  });
};

export const addUser = async (dispatch: (action: KnownAction) => void, newUser: User) => {

  const userRef = await db.collection('users').add(newUser);
  db.collection('users').doc(userRef.id).update({ id: userRef.id });
  newUser.id = userRef.id;

  dispatch({
    type: 'ADD_USER',
    newUser,
  });
};

export const deleteComment = async (dispatch: (action: KnownAction) => void, id: string, client: Client) => {
  const clientRef = await db.collection('clients').doc(client.id);

  client.comments = client.comments && client.comments.filter(x => x.id !== id);
  clientRef.update(client);

  dispatch({
    type: 'UPDATE_CLIENT',
    client,
  });
};

export const setClients = async (dispatch: (action: KnownAction) => void) => {
  const usersRef = await db.collection('users').get();
  const users: User[] = await usersRef.docs.map(x => x.data());

  const clientRef = await db.collection('clients').orderBy('firstName', 'asc').orderBy('lastName', 'asc');
  const clientsRef = await clientRef.get();
  const clients: Client[] = await clientsRef.docs.map(x => x.data());

  clients.map(x => {
    x.comments &&
      x.comments.map(y => y.user = users.filter(z => z.id === y.userId)[0]);
  });

  clients && clients.length > 0
    && dispatch({
      type: 'SET_CURRENT_CLIENT',
      clientId: clients[0].id,
    });

  dispatch({
    type: 'SET_CLIENTS',
    clients,
  });
};

export const setTagCategories = async (dispatch: (action: KnownAction) => void) => {
  const tagCategoriesRef = await db.collection('tagCategories').orderBy('name', 'asc');
  const tagCategoriesList = await tagCategoriesRef.get();
  const tagCategories: TagCategory[] = await tagCategoriesList.docs.map(x => x.data());

  dispatch({
    type: 'SET_TAG_CATEGORIES',
    tagCategories,
  });
};

export const setUsers = async (dispatch: (action: KnownAction) => void) => {
  const usersRef = await db.collection('users').orderBy('firstName', 'asc').orderBy('lastName', 'asc');
  const userListRef = await usersRef.get();
  const users: User[] = await userListRef.docs.map(x => x.data());

  dispatch({
    type: 'SET_USERS',
    users,
  });
};

export const init = (dispatch: (action: KnownAction) => void) => {
  setUsers(dispatch);
  setClients(dispatch);
  setTagCategories(dispatch);
};

export const updateClient = async (dispatch: (action: KnownAction) => void, client: Client) => {
  const clientRef = await db.collection('clients').doc(client.id);
  clientRef.update(client);
};

export default actionCreators;
