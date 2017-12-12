import {
  Client,
  ClientType,
  Comment,
  db,
  KnownAction,
  Tag,
  TagCategory,
  User,
} from '../datatypes';
import { AppThunkAction, ApplicationState } from '../store';

const actionCreators = {
  addClient: (): AppThunkAction<KnownAction> => (
    dispatch: (action: KnownAction) => void,
    getState: () => ApplicationState,
  ) => {
    addClient(dispatch);

    dispatch({
      type: 'SET_MESSAGE',
      message: 'Adding a client...',
    });
  },

  addComment: (cmt: Comment, client: Client): AppThunkAction<KnownAction> => (
    dispatch: (action: KnownAction) => void,
    getState: () => ApplicationState,
  ) => {
    addComment(dispatch, cmt, client, getState().clientSlice.currentUser);

    dispatch({
      type: 'SET_MESSAGE',
      message: 'Adding a comment...',
    });
  },

  addClientType: (name: string): AppThunkAction<KnownAction> => (
    dispatch: (action: KnownAction) => void,
    getState: () => ApplicationState,
  ) => {
    addClientType(dispatch, name);

    dispatch({
      type: 'SET_MESSAGE',
      message: 'Adding a client type...',
    });
  },

  addTagCategory: (name: string): AppThunkAction<KnownAction> => (
    dispatch: (action: KnownAction) => void,
    getState: () => ApplicationState,
  ) => {
    addTagCategory(dispatch, name);

    dispatch({
      type: 'SET_MESSAGE',
      message: 'Adding a client...',
    });
  },

  addTagToCategory: (
    name: string,
    tagCategory: TagCategory,
  ): AppThunkAction<KnownAction> => (
    dispatch: (action: KnownAction) => void,
    getState: () => ApplicationState,
    ) => {
      addTagToCategory(dispatch, name, tagCategory);

      dispatch({
        type: 'SET_MESSAGE',
        message: 'Adding a client...',
      });
    },

  toggleClientTag: (
    tagId: string,
    client: Client,
    isAdd: boolean,
  ): AppThunkAction<KnownAction> => (
    dispatch: (action: KnownAction) => void,
    getState: () => ApplicationState,
    ) => {
      toggleClientTag(dispatch, tagId, client, isAdd);

      dispatch({
        type: 'SET_MESSAGE',
        message: 'Adding tag to client...',
      });
    },

  addUser: (usr: User): AppThunkAction<KnownAction> => (
    dispatch: (action: KnownAction) => void,
    getState: () => ApplicationState,
  ) => {
    addUser(dispatch, usr);

    dispatch({
      type: 'SET_MESSAGE',
      message: 'Adding a user...',
    });
  },

  deleteComment: (id: string, client: Client): AppThunkAction<KnownAction> => (
    dispatch: (action: KnownAction) => void,
    getState: () => ApplicationState,
  ) => {
    deleteComment(dispatch, id, client);

    dispatch({
      type: 'SET_MESSAGE',
      message: 'Deleting comment...',
    });
  },

  init: (): AppThunkAction<KnownAction> => (
    dispatch: (action: KnownAction) => void,
    getState: () => ApplicationState,
  ) => {
    setUsers(dispatch);
    setClients(dispatch);

    dispatch({
      type: 'SET_MESSAGE',
      message: 'Initializing...',
    });
  },

  searchClients: (
    searchText: string,
    clients: Client[],
  ): AppThunkAction<KnownAction> => (
    dispatch: (action: KnownAction) => void,
    getState: () => ApplicationState,
    ) => {
      const cats = getState().clientSlice.tagCategories.filter(x => x.tags !== undefined).map(y => y.tags || []);

      const tags = cats.reduce((x, y) => x.concat(y), []).filter(z => z.id !== undefined).map(c => c.id);
      // const t2 = tags.filter(x => x !== undefined);

      // clients.map(x => (x.tags = []));
      // console.dir(t);

      const filteredClients = clients.filter(x => (x.firstName && x.firstName
        .toLowerCase()
        .indexOf(
        searchText.toLowerCase(),
      ) > -1) || (x.lastName && x.lastName
        .toLowerCase()
        .indexOf(
        searchText.toLowerCase(),
      ) > -1) || (x.address1 && x.address1
        .toLowerCase()
        .indexOf(
        searchText.toLowerCase(),
      ) > -1) || (x.address2 && x.address2
        .toLowerCase()
        .indexOf(
        searchText.toLowerCase(),
      ) > -1) || (x.city && x.city
        .toLowerCase()
        .indexOf(
        searchText.toLowerCase(),
      ) > -1) || (x.country && x.country
        .toLowerCase()
        .indexOf(
        searchText.toLowerCase(),
      ) > -1) || (x.title && x.title
        .toLowerCase()
        .indexOf(
        searchText.toLowerCase(),
      ) > -1) || (x.company && x.company
        .toLowerCase()
        .indexOf(
        searchText.toLowerCase(),
      ) > -1) || (x.phone && x.phone
        .toLowerCase()
        .indexOf(
        searchText.toLowerCase(),
      ) > -1) || (x.email && x.email
        .toLowerCase()
        .indexOf(
        searchText.toLowerCase(),
      ) > -1) || (x.website && x.website
        .toLowerCase()
        .indexOf(searchText.toLowerCase()) > -1) ||
        (x.tagIds !== undefined
          && findOne(x.tagIds, tags))
      );

      //  x.tags && x.tags.findIndex(t => (t.name ? searchText
      //              .toLowerCase()
      //              .indexOf(
      //                t.name.toLowerCase(),
      //              ) > -1 : true)), dispatch({
      //      type: 'SET_SEARCH_RESULTS_VISIBILITY',
      //      isVisible: true,
      //    });

      dispatch({
        type: 'SET_FILTERED_CLIENTS',
        filteredClients,
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

  updateClient: (
    client: Client,
    isDelete: boolean = false,
  ): AppThunkAction<KnownAction> => (
    dispatch: (action: KnownAction) => void,
    getState: () => ApplicationState,
    ) => {
      updateClient(dispatch, client);

      dispatch({
        type: 'UPDATE_CLIENT',
        client,
      });

      const filteredClients = getState().clientSlice.filteredClients;

      isDelete &&
        filteredClients.length > 0 &&
        dispatch({
          type: 'SET_CURRENT_CLIENT',
          clientId: filteredClients[0].id,
        });
    },
};

export const addClient = async (dispatch: (action: KnownAction) => void) => {
  const newClient: Client = {
    isActive: true,
    id: '',
    firstName: 'New',
    lastName: 'Client',
    clientTypeId: 'XWVplrztsYm7RQeFMWzt',
  };

  const clientRef = await db.collection('clients').add(newClient);
  db
    .collection('clients')
    .doc(clientRef.id)
    .update({ id: clientRef.id });
  newClient.id = clientRef.id;
  dispatch({
    type: 'ADD_CLIENT',
    newClient,
  });
};

export const addComment = async (
  dispatch: (action: KnownAction) => void,
  newComment: Comment,
  client: Client,
  user?: User,
) => {
  const clientRef = await db.collection('clients').doc(client.id);
  const newCommentRef = await clientRef.collection('comments').doc();

  newComment.id = newCommentRef.id;

  const comments = [...(client.comments || []), newComment];
  clientRef.update({ comments: comments });

  comments.filter(x => x.id === newComment.id)[0].user = user;
  client.comments = comments;
  dispatch({
    type: 'UPDATE_CLIENT',
    client,
  });
};

export const addTagCategory = async (
  dispatch: (action: KnownAction) => void,
  name: string,
) => {
  const newTagCategory: TagCategory = {
    name,
  };
  const categoriesRef = await db
    .collection('tagCategories')
    .add(newTagCategory);
  db
    .collection('tagCategories')
    .doc(categoriesRef.id)
    .update({ id: categoriesRef.id });
  newTagCategory.id = categoriesRef.id;

  dispatch({
    type: 'ADD_TAG_CATEGORY',
    tagCategory: newTagCategory,
  });
};

export const addClientType = async (
  dispatch: (action: KnownAction) => void,
  name: string,
) => {
  const newClientType: ClientType = {
    name,
  };
  const clientTypesRef = await db.collection('clientTypes').add(newClientType);
  db
    .collection('clientTypes')
    .doc(clientTypesRef.id)
    .update({ id: clientTypesRef.id });
  newClientType.id = clientTypesRef.id;

  dispatch({
    type: 'ADD_CLIENT_TYPE',
    clientType: newClientType,
  });
};

export const addTagToCategory = async (
  dispatch: (action: KnownAction) => void,
  name: string,
  tagCategory: TagCategory,
) => {
  const newTag: Tag = {
    id: '',
    name,
  };
  const tagCategoryRef = await db
    .collection('tagCategories')
    .doc(tagCategory.id);
  const newTagRef = await tagCategoryRef.collection('tags').doc();

  newTag.id = newTagRef.id;
  const tags = [...(tagCategory.tags || []), newTag];
  tagCategoryRef.update({ tags: tags });

  tagCategory.tags = tags;

  dispatch({
    type: 'UPDATE_TAG_CATEGORY',
    tagCategory,
  });
};

export const toggleClientTag = async (
  dispatch: (action: KnownAction) => void,
  tagId: string,
  client: Client,
  isAdd: boolean,
) => {
  const clientRef = await db.collection('clients').doc(client.id);

  const tagIds = isAdd
    ? [...(client.tagIds || []), tagId]
    : client.tagIds ? client.tagIds.filter(x => x !== tagId) : [];
  clientRef.update({ tagIds: tagIds });

  client.tagIds = tagIds;

  dispatch({
    type: 'UPDATE_CLIENT',
    client,
  });
};

export const addUser = async (
  dispatch: (action: KnownAction) => void,
  newUser: User,
) => {
  const userRef = await db.collection('users').add(newUser);
  db
    .collection('users')
    .doc(userRef.id)
    .update({ id: userRef.id });
  newUser.id = userRef.id;

  dispatch({
    type: 'ADD_USER',
    newUser,
  });
};

export const deleteComment = async (
  dispatch: (action: KnownAction) => void,
  id: string,
  client: Client,
) => {
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

  const clientRef = await db
    .collection('clients')
    .where('isActive', '==', true)
    .orderBy('firstName', 'asc')
    .orderBy('lastName', 'asc');
  const clientsRef = await clientRef.get();
  const clients: Client[] = await clientsRef.docs.map(x => x.data());

  clients.map(x => {
    x.comments &&
      x.comments.map(y => (y.user = users.filter(z => z.id === y.userId)[0]));
  });

  clients &&
    clients.length > 0 &&
    dispatch({
      type: 'SET_CURRENT_CLIENT',
      clientId: clients[0].id,
    });

  dispatch({
    type: 'SET_FILTERED_CLIENTS',
    filteredClients: clients,
  });

  dispatch({
    type: 'SET_CLIENTS',
    clients,
  });
};

export const setClientTypes = async (
  dispatch: (action: KnownAction) => void,
) => {
  const clientTypesRef = await db.collection('clientTypes');
  const clientTypesList = await clientTypesRef.orderBy('name').get();
  const clientTypes: ClientType[] = await clientTypesList.docs.map(x =>
    x.data(),
  );

  dispatch({
    type: 'SET_CLIENT_TYPES',
    clientTypes,
  });
};

export const setTagCategories = async (
  dispatch: (action: KnownAction) => void,
) => {
  const tagCategoriesRef = await db
    .collection('tagCategories')
    .orderBy('name', 'asc');
  const tagCategoriesList = await tagCategoriesRef.get();
  const tagCategories: TagCategory[] = await tagCategoriesList.docs.map(x =>
    x.data(),
  );

  dispatch({
    type: 'SET_TAG_CATEGORIES',
    tagCategories,
  });
};

export const setUsers = async (dispatch: (action: KnownAction) => void) => {
  const usersRef = await db
    .collection('users')
    .orderBy('firstName', 'asc')
    .orderBy('lastName', 'asc');
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
  setClientTypes(dispatch);
  setTagCategories(dispatch);
};

export const updateClient = async (
  dispatch: (action: KnownAction) => void,
  client: Client,
) => {
  const clientRef = await db.collection('clients').doc(client.id);
  clientRef.update(client);
};

// const getTagById = (tagCategories: TagCategory[], id: string) => {
//   let list = [];

//   tagCategories.forEach(x => {
//     x.tags && x.tags.filter(y => y.id === id).length > 0;
//   });
// };

const findOne = (haystack: string[], arr: string[]) => {
  return arr.some((v) => {
    return haystack.indexOf(v) >= 0;
  });
};

export default actionCreators;
