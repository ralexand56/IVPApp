import {
  Client,
  ClientType,
  Comment,
  db,
  KnownAction,
  NameId,
  UserImport,
  SampleLink,
  TagItem,
  TagCategory,
  User,
  tagSort
} from '../datatypes';
import { AppThunkAction, ApplicationState } from '../store';
import firebase from 'firebase';

const checkClientType = (
  searchTxt: string,
  c: Client,
  clientTypes: ClientType[]
) => {
  if (!c.clientTypeId) {
    return false;
  }

  const fndClientType: ClientType | undefined = clientTypes.find(
    x => x.id === c.clientTypeId
  );

  if (!fndClientType) {
    return false;
  }

  return fndClientType.name!.toLowerCase().indexOf(searchTxt) > -1
    ? true
    : false;
};

const checkMajorTags = (searchTxt: string, c: Client) =>
  c.majorTags &&
  c.majorTags
    .filter(y => y.name !== undefined)
    .find(x => x.name!.toLowerCase().indexOf(searchTxt) > -1) !== undefined
    ? true
    : false;

const checkMinorTags = (searchTxt: string, c: Client) =>
  c.minorTags &&
  c.minorTags
    .filter(y => y.name !== undefined)
    .find(x => x.name!.toLowerCase().indexOf(searchTxt) > -1) !== undefined
    ? true
    : false;

const checkLinks = (searchTxt: string, c: Client) =>
  c.websites &&
  c.websites
    .filter(y => y.name !== undefined)
    .find(x => x.name!.toLowerCase().indexOf(searchTxt) > -1) !== undefined
    ? true
    : false;

const checkEmails = (searchTxt: string, c: Client) =>
  c.emails &&
  c.emails
    .filter(y => y.name !== undefined)
    .find(x => x.name!.toLowerCase().indexOf(searchTxt) > -1) !== undefined
    ? true
    : false;

const checkAffiliations = (searchTxt: string, c: Client) =>
  c.affiliations &&
  c.affiliations
    .filter(y => y.name !== undefined)
    .find(x => x.name!.toLowerCase().indexOf(searchTxt) > -1) !== undefined
    ? true
    : false;

const checkComments = (searchTxt: string, c: Client) =>
  c.comments &&
  c.comments
    .filter(y => y.body !== undefined)
    .find(x => x.body!.toLowerCase().indexOf(searchTxt) > -1) !== undefined
    ? true
    : false;

const actionCreators = {
  addComment: (
    cmt: Comment,
    client: Client,
    currentUser: User
  ): AppThunkAction<KnownAction> => (
    dispatch: (action: KnownAction) => void,
    getState: () => ApplicationState
  ) => {
    addComment(dispatch, cmt, client, currentUser);

    dispatch({
      type: 'SET_MESSAGE',
      message: 'Comment added...'
    });

    dispatch({
      type: 'SET_COMMENT_TEXT',
      newCommentText: ''
    });
  },

  addEmail: (email: NameId, client: Client): AppThunkAction<KnownAction> => (
    dispatch: (action: KnownAction) => void,
    getState: () => ApplicationState
  ) => {
    addEmail(dispatch, email, client);

    dispatch({
      type: 'SET_MESSAGE',
      message: 'Email added to client...'
    });
  },

  addWebsite: (link: NameId, client: Client): AppThunkAction<KnownAction> => (
    dispatch: (action: KnownAction) => void,
    getState: () => ApplicationState
  ) => {
    link.name =
      link.name.toLowerCase().startsWith('http') ||
      link.name.toLowerCase().startsWith('https') ||
      link.name.toLowerCase().startsWith('ftp')
        ? link.name
        : `http://${link.name}`;

    addWebsite(dispatch, link, client);

    dispatch({
      type: 'SET_MESSAGE',
      message: 'Link added to client...'
    });
  },

  addSampleWork: (
    linkText: string,
    isLocal: boolean,
    client: Client
  ): AppThunkAction<KnownAction> => (
    dispatch: (action: KnownAction) => void,
    getState: () => ApplicationState
  ) => {
    addSampleWork(dispatch, linkText, isLocal, client);

    dispatch({
      type: 'SET_MESSAGE',
      message: 'Sample link added...'
    });
  },

  addClient: (): AppThunkAction<KnownAction> => (
    dispatch: (action: KnownAction) => void,
    getState: () => ApplicationState
  ) => {
    const newClient: Client = {
      isActive: true,
      id: '',
      firstName: 'New',
      lastName: 'Client',
      clientTypeId: 'XWVplrztsYm7RQeFMWzt',
      created: new Date(),
      modified: new Date()
    };
    addClient(dispatch, newClient);

    dispatch({
      type: 'SET_MESSAGE',
      message: 'Adding a client...'
    });
  },

  addClientType: (name: string): AppThunkAction<KnownAction> => (
    dispatch: (action: KnownAction) => void,
    getState: () => ApplicationState
  ) => {
    addClientType(dispatch, name);

    dispatch({
      type: 'SET_MESSAGE',
      message: 'Adding a client type...'
    });
  },

  addAffiliation: (newAffiliation: TagItem): AppThunkAction<KnownAction> => (
    dispatch: (action: KnownAction) => void,
    getState: () => ApplicationState
  ) => {
    dispatch({
      type: 'SET_MESSAGE',
      message: 'Adding an affiliation...'
    });

    dispatch({ type: 'ADD_AFFILIATION', affiliation: newAffiliation });
  },

  addTag: (
    newTag: TagItem,
    isMinor: boolean = false
  ): AppThunkAction<KnownAction> => (
    dispatch: (action: KnownAction) => void,
    getState: () => ApplicationState
  ) => {
    dispatch({
      type: 'SET_MESSAGE',
      message: 'Adding a tag...'
    });

    dispatch({ type: 'ADD_TAG', tag: newTag, isMinor });
  },

  addAffiliationToClient: (
    affiliation: TagItem,
    client: Client
  ): AppThunkAction<KnownAction> => (
    dispatch: (action: KnownAction) => void,
    getState: () => ApplicationState
  ) => {
    const affiliations: TagItem[] =
      client.affiliations !== undefined ? client.affiliations : [];

    client.affiliations = [...affiliations, affiliation];

    updateClient(dispatch, client);

    dispatch({
      type: 'UPDATE_CLIENT',
      client
    });

    dispatch({
      type: 'SET_MESSAGE',
      message: `${affiliation.name} tag added to client...`
    });
  },

  addTagToClient: (
    tag: TagItem,
    client: Client,
    isMinor: boolean = false
  ): AppThunkAction<KnownAction> => (
    dispatch: (action: KnownAction) => void,
    getState: () => ApplicationState
  ) => {
    if (isMinor) {
      const minorTags: TagItem[] = client.minorTags ? client.minorTags : [];
      client.minorTags = [...minorTags, tag];
    } else {
      const majorTags: TagItem[] = client.majorTags ? client.majorTags : [];
      client.majorTags = [...majorTags, tag];
    }

    updateClient(dispatch, client);

    dispatch({
      type: 'UPDATE_CLIENT',
      client
    });

    dispatch({
      type: 'SET_MESSAGE',
      message: `${tag.name} tag added to client...`
    });
  },

  addTagToCategory: (
    name: string,
    tagCategory: TagCategory
  ): AppThunkAction<KnownAction> => (
    dispatch: (action: KnownAction) => void,
    getState: () => ApplicationState
  ) => {
    addTagToCategory(dispatch, name, tagCategory);

    dispatch({
      type: 'SET_MESSAGE',
      message: 'Adding a client...'
    });
  },

  deleteEmail: (id: string, client: Client): AppThunkAction<KnownAction> => (
    dispatch: (action: KnownAction) => void,
    getState: () => ApplicationState
  ) => {
    deleteEmail(dispatch, id, client);

    dispatch({
      type: 'SET_MESSAGE',
      message: 'Email deleted...'
    });
  },

  deleteLink: (id: string, client: Client): AppThunkAction<KnownAction> => (
    dispatch: (action: KnownAction) => void,
    getState: () => ApplicationState
  ) => {
    deleteLink(dispatch, id, client);

    dispatch({
      type: 'SET_MESSAGE',
      message: 'Email deleted...'
    });
  },

  toggleClientTag: (
    tagId: string,
    client: Client,
    isAdd: boolean
  ): AppThunkAction<KnownAction> => (
    dispatch: (action: KnownAction) => void,
    getState: () => ApplicationState
  ) => {
    toggleClientTag(dispatch, tagId, client, isAdd);

    dispatch({
      type: 'SET_MESSAGE',
      message: 'Adding tag to client...'
    });
  },

  addUser: (usr: User): AppThunkAction<KnownAction> => (
    dispatch: (action: KnownAction) => void,
    getState: () => ApplicationState
  ) => {
    addUser(dispatch, usr);

    dispatch({
      type: 'SET_MESSAGE',
      message: 'Adding a user...'
    });
  },

  deleteComment: (id: string, client: Client): AppThunkAction<KnownAction> => (
    dispatch: (action: KnownAction) => void,
    getState: () => ApplicationState
  ) => {
    deleteComment(dispatch, id, client);

    dispatch({
      type: 'SET_MESSAGE',
      message: 'Comment deleted...'
    });
  },

  deleteSampleLink: (
    id: string,
    client: Client
  ): AppThunkAction<KnownAction> => (
    dispatch: (action: KnownAction) => void,
    getState: () => ApplicationState
  ) => {
    deleteSampleLink(dispatch, id, client);

    dispatch({
      type: 'SET_MESSAGE',
      message: 'Sample link deleted...'
    });
  },

  init: (): AppThunkAction<KnownAction> => (
    dispatch: (action: KnownAction) => void,
    getState: () => ApplicationState
  ) => {
    setUsers(dispatch);
    setClients(dispatch);

    dispatch({
      type: 'SET_MESSAGE',
      message: 'Initializing...'
    });
  },

  searchClients: (
    searchText: string,
    clients: Client[],
    clientTypes: ClientType[]
  ): AppThunkAction<KnownAction> => (
    dispatch: (action: KnownAction) => void,
    getState: () => ApplicationState
  ) => {
    dispatch({ type: 'SET_CURRENT_CLIENT', clientId: undefined });

    const filteredClients = clients.filter(
      x =>
        (x.firstName &&
          x.firstName.toLowerCase().indexOf(searchText.toLowerCase()) > -1) ||
        (x.lastName &&
          x.lastName.toLowerCase().indexOf(searchText.toLowerCase()) > -1) ||
        (x.address1 &&
          x.address1.toLowerCase().indexOf(searchText.toLowerCase()) > -1) ||
        (x.address2 &&
          x.address2.toLowerCase().indexOf(searchText.toLowerCase()) > -1) ||
        (x.city &&
          x.city.toLowerCase().indexOf(searchText.toLowerCase()) > -1) ||
        (x.country &&
          x.country.toLowerCase().indexOf(searchText.toLowerCase()) > -1) ||
        (x.title &&
          x.title.toLowerCase().indexOf(searchText.toLowerCase()) > -1) ||
        (x.state &&
          x.state.toLowerCase().indexOf(searchText.toLowerCase()) > -1) ||
        (x.company &&
          x.company.toLowerCase().indexOf(searchText.toLowerCase()) > -1) ||
        (x.phone &&
          x.phone.toLowerCase().indexOf(searchText.toLowerCase()) > -1) ||
        checkClientType(searchText, x, clientTypes) ||
        checkComments(searchText, x) ||
        checkMajorTags(searchText, x) ||
        checkMinorTags(searchText, x) ||
        checkLinks(searchText, x) ||
        checkEmails(searchText, x) ||
        checkAffiliations(searchText, x)
    );

    //  x.tags && x.tags.findIndex(t => (t.name ? searchText
    //              .toLowerCase()
    //              .indexOf(
    //                t.name.toLowerCase(),
    //  ) > -1 : true)),

    dispatch({
      type: 'SET_SEARCH_RESULTS_VISIBILITY',
      isVisible: true
    });

    dispatch({
      type: 'SET_FILTERED_CLIENTS',
      filteredClients
    });
  },

  setSearchResultsVisibility: (isVisible: boolean) => ({
    type: 'SET_SEARCH_RESULTS_VISIBILITY',
    isVisible
  }),

  setClientAffiliations: (
    affiliations: TagItem[],
    client: Client
  ): AppThunkAction<KnownAction> => (
    dispatch: (action: KnownAction) => void,
    getState: () => ApplicationState
  ) => {
    client.affiliations = affiliations.sort(tagSort);

    updateClient(dispatch, client);

    dispatch({
      type: 'UPDATE_CLIENT',
      client
    });

    dispatch({
      type: 'SET_MESSAGE',
      message: `Client affiliation updated...`
    });
  },

  setClientTags: (
    tags: TagItem[],
    client: Client,
    isMinor: boolean = false
  ): AppThunkAction<KnownAction> => (
    dispatch: (action: KnownAction) => void,
    getState: () => ApplicationState
  ) => {
    isMinor
      ? (client.minorTags = tags.sort(tagSort))
      : (client.majorTags = tags.sort(tagSort));

    updateClient(dispatch, client);

    dispatch({
      type: 'UPDATE_CLIENT',
      client
    });

    dispatch({
      type: 'SET_MESSAGE',
      message: `Client tags updated...`
    });
  },

  setCurrentClient: (
    clientId: string | undefined
  ): AppThunkAction<KnownAction> => (
    dispatch: (action: KnownAction) => void,
    getState: () => ApplicationState
  ) => {
    clientId && dispatch({ type: 'SET_CURRENT_CLIENT', clientId: undefined });

    setCurrentClient(dispatch, getState, clientId);
  },

  setClientEditMode: (isInEditMode: boolean) => ({
    type: 'SET_CLIENT_EDIT_MODE',
    isInEditMode
  }),

  setClientTab: (selectedClientTabId: number) => ({
    type: 'SET_CLIENT_TAB',
    clientTabId: selectedClientTabId
  }),

  setInteractive: (isInteractive: boolean) => ({
    type: 'SET_INTERACTIVE',
    isInteractive
  }),

  updateClient: (
    client: Client,
    isDelete: boolean = false
  ): AppThunkAction<KnownAction> => (
    dispatch: (action: KnownAction) => void,
    getState: () => ApplicationState
  ) => {
    updateClient(dispatch, client);

    dispatch({
      type: 'UPDATE_CLIENT',
      client
    });

    const filteredClients = getState().clientSlice.filteredClients;

    isDelete &&
      filteredClients.length > 0 &&
      dispatch({
        type: 'SET_CURRENT_CLIENT',
        clientId: filteredClients[0].id
      });
  },

  updateCommentText: (newCommentText: string): AppThunkAction<KnownAction> => (
    dispatch: (action: KnownAction) => void,
    getState: () => ApplicationState
  ) =>
    dispatch({
      type: 'SET_COMMENT_TEXT',
      newCommentText
    })
};

// async ops
export const addClient = async (
  dispatch: (action: KnownAction) => void,
  newClient: Client
) => {
  const clientRef = await db.collection('clients').add(newClient);
  db
    .collection('clients')
    .doc(clientRef.id)
    .update({ id: clientRef.id });

  if ((newClient.id = '')) {
    newClient.id = clientRef.id;
  }

  dispatch({
    type: 'ADD_CLIENT',
    newClient
  });
};

export const addComment = async (
  dispatch: (action: KnownAction) => void,
  newComment: Comment,
  client: Client,
  user: User
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
    client
  });
};

export const addEmail = async (
  dispatch: (action: KnownAction) => void,
  newEmail: NameId,
  client: Client
) => {
  const clientRef = await db.collection('clients').doc(client.id);
  const newEmailRef = await clientRef.collection('emails').doc();

  newEmail.id = newEmailRef.id;

  const emails = [...(client.emails || []), newEmail];
  clientRef.update({ emails: emails });

  client.emails = emails;
  dispatch({
    type: 'UPDATE_CLIENT',
    client
  });
};

export const addWebsite = async (
  dispatch: (action: KnownAction) => void,
  newLink: NameId,
  client: Client
) => {
  const clientRef = await db.collection('clients').doc(client.id);
  const newLinkRef = await clientRef.collection('websites').doc();

  newLink.id = newLinkRef.id;

  const websites = [...(client.websites || []), newLink];
  clientRef.update({ websites: websites });

  client.websites = websites;
  dispatch({
    type: 'UPDATE_CLIENT',
    client
  });
};

export const addSampleWork = async (
  dispatch: (action: KnownAction) => void,
  src: string,
  isLocal: boolean,
  client: Client
) => {
  const newSampleLink: SampleLink = { isLocal, src, id: '' };
  const clientRef = await db.collection('clients').doc(client.id);
  const newSampleLinkRef = await clientRef.collection('sampleLinks').doc();

  newSampleLink.id = newSampleLinkRef.id;

  const sampleLinks = [...(client.sampleLinks || []), newSampleLink];
  clientRef.update({ sampleLinks: sampleLinks });

  client.sampleLinks = sampleLinks;
  dispatch({
    type: 'UPDATE_CLIENT',
    client
  });
};

export const addAffiliationToFireStore = async (name: string) => {
  if (name.trim() !== '') {
    const newAffiliation: TagItem = {
      name
    };

    const affiliationRef = await db
      .collection('affiliations')
      .add(newAffiliation);

    db
      .collection('affiliations')
      .doc(affiliationRef.id)
      .update({ id: affiliationRef.id });

    newAffiliation.id = affiliationRef.id;

    // dispatch({ type: 'ADD_TAG', tag: newTag, isMinor });

    return newAffiliation;
  }

  return null;
};

export const addTagToFireStore = async (name: string, isMinor: boolean) => {
  if (name.trim() !== '') {
    const catCollection = isMinor ? 'minorTags' : 'majorTags';
    const newTag: TagItem = {
      name
    };

    const categoriesRef = await db.collection(catCollection).add(newTag);

    db
      .collection(catCollection)
      .doc(categoriesRef.id)
      .update({ id: categoriesRef.id });

    newTag.id = categoriesRef.id;

    // dispatch({ type: 'ADD_TAG', tag: newTag, isMinor });

    return newTag;
  }

  return null;
};

export const addClientType = async (
  dispatch: (action: KnownAction) => void,
  name: string
) => {
  const newClientType: ClientType = {
    id: '',
    name
  };
  const clientTypesRef = await db.collection('clientTypes').add(newClientType);
  db
    .collection('clientTypes')
    .doc(clientTypesRef.id)
    .update({ id: clientTypesRef.id });
  newClientType.id = clientTypesRef.id;

  dispatch({
    type: 'ADD_CLIENT_TYPE',
    clientType: newClientType
  });
};

export const addTagToCategory = async (
  dispatch: (action: KnownAction) => void,
  name: string,
  tagCategory: TagCategory
) => {
  const newTag: TagItem = {
    id: '',
    name
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
    tagCategory
  });
};

export const toggleClientTag = async (
  dispatch: (action: KnownAction) => void,
  tagId: string,
  client: Client,
  isAdd: boolean
) => {
  const clientRef = await db.collection('clients').doc(client.id);

  const tagIds = isAdd
    ? [...(client.tagIds || []), tagId]
    : client.tagIds ? client.tagIds.filter(x => x !== tagId) : [];
  clientRef.update({ tagIds: tagIds });

  client.tagIds = tagIds;

  dispatch({
    type: 'UPDATE_CLIENT',
    client
  });
};

export const addUser = async (
  dispatch: (action: KnownAction) => void,
  newUser: User
) => {
  const userRef = await db.collection('users').add(newUser);
  db
    .collection('users')
    .doc(userRef.id)
    .update({ id: userRef.id });
  newUser.id = userRef.id;

  dispatch({
    type: 'ADD_USER',
    newUser
  });
};

export const deleteComment = async (
  dispatch: (action: KnownAction) => void,
  id: string,
  client: Client
) => {
  const clientRef = await db.collection('clients').doc(client.id);

  client.comments = client.comments && client.comments.filter(x => x.id !== id);
  clientRef.update(client);

  dispatch({
    type: 'UPDATE_CLIENT',
    client
  });
};

export const deleteEmail = async (
  dispatch: (action: KnownAction) => void,
  id: string,
  client: Client
) => {
  const clientRef = await db.collection('clients').doc(client.id);

  client.emails = client.emails && client.emails.filter(x => x.id !== id);
  clientRef.update(client);

  dispatch({
    type: 'UPDATE_CLIENT',
    client
  });
};

export const deleteLink = async (
  dispatch: (action: KnownAction) => void,
  id: string,
  client: Client
) => {
  const clientRef = await db.collection('clients').doc(client.id);

  client.websites = client.websites && client.websites.filter(x => x.id !== id);
  clientRef.update(client);

  dispatch({
    type: 'UPDATE_CLIENT',
    client
  });
};

export const deleteSampleLink = async (
  dispatch: (action: KnownAction) => void,
  id: string,
  client: Client
) => {
  const clientRef = await db.collection('clients').doc(client.id);

  client.sampleLinks =
    client.sampleLinks && client.sampleLinks.filter(x => x.id !== id);
  clientRef.update(client);

  dispatch({
    type: 'UPDATE_CLIENT',
    client
  });
};

export const setClients = async (dispatch: (action: KnownAction) => void) => {
  // const usersRef = await db.collection('users').get();
  // const users = await usersRef.docs.map((x: firebase.firestore.DocumentData) =>
  //   x.data(),
  // );

  const clientRef = await db
    .collection('clients')
    .where('isActive', '==', true)
    .orderBy('firstName', 'asc')
    .orderBy('lastName', 'asc');
  const clientsRef = await clientRef.get();
  const clients = await clientsRef.docs.map(
    (x: firebase.firestore.DocumentData) =>  ({ ...x.data(), id: x.id })
  );

  // console.dir(clients);
  // clients.map(x => {
  //   x.comments &&
  //     x.comments.map(
  //       (y: Comment) => (y.user = users.filter(z => z.id === y.userId)[0]),
  //     );
  // });

  dispatch({
    type: 'SET_FILTERED_CLIENTS',
    filteredClients: clients
  });

  dispatch({
    type: 'SET_CLIENTS',
    clients
  });
};

export const setTags = async (
  dispatch: (action: KnownAction) => void,
  isMinor: boolean
) => {
  const tagType = isMinor ? 'minorTags' : 'majorTags';
  const tagsRef = await db.collection(tagType);
  const tagsList = await tagsRef.orderBy('name').get();
  const tags: TagItem[] = await tagsList.docs.map(x => x.data());

  dispatch({
    type: 'SET_TAGS',
    tags,
    isMinor
  });
};

export const setAffiliations = async (
  dispatch: (action: KnownAction) => void
) => {
  const affiliationRef = await db.collection('affiliations');
  const affiliationList = await affiliationRef.orderBy('name').get();
  const affiliations: TagItem[] = await affiliationList.docs.map(x => x.data());

  dispatch({
    type: 'SET_AFFILIATIONS',
    affiliations
  });
};

export const setClientTypes = async (
  dispatch: (action: KnownAction) => void
) => {
  const clientTypesRef = await db.collection('clientTypes');
  const clientTypesList = await clientTypesRef.orderBy('name').get();
  const clientTypes = await clientTypesList.docs.map((x: firebase.firestore.DocumentData) =>
    x.data()
  );

  dispatch({
    type: 'SET_CLIENT_TYPES',
    clientTypes
  });
};

export const setCurrentClient = async (
  dispatch: (action: KnownAction) => void,
  getState: () => ApplicationState,
  clientId: string | undefined
) => {
  const user = getState().clientSlice.currentUser;
  const userId = user ? user.id : undefined;

  const currentClientRef = await db.collection('currentClientIds').doc(userId);

  currentClientRef.set({ clientId: clientId || null });

  // const currentClientFilteredRef = await currentClientRef.get();

  // db
  //   .collection('currentClientIds')
  //   .doc(userId)
  //   .update({ clientId: clientId || null });
  // : db.collection('currentClientIds').doc(currentClientLst.docs[0].id);
};

export const setTagCategories = async (
  dispatch: (action: KnownAction) => void
) => {
  const tagCategoriesRef = await db
    .collection('tagCategories')
    .orderBy('name', 'asc');
  const tagCategoriesList = await tagCategoriesRef.get();
  const tagCategories: TagCategory[] = await tagCategoriesList.docs.map(x =>
    x.data()
  );

  dispatch({
    type: 'SET_TAG_CATEGORIES',
    tagCategories
  });
};

export const setUsers = async (dispatch: (action: KnownAction) => void) => {
  const usersRef = await db
    .collection('users')
    .orderBy('firstName', 'asc')
    .orderBy('lastName', 'asc');
  const userListRef = await usersRef.get();
  const users: User[] = await userListRef.docs.map(
    (x: firebase.firestore.DocumentData) => x.data()
  );

  dispatch({
    type: 'SET_USERS',
    users
  });
};

export const importClients = (user: User) => {
  const newClients = UserImport;

  newClients.map(async x => {
    let fullName = x.ARTISTS.trim().split(' ');

    let newClient: Client = {
      isActive: true,
      id: '',
      firstName: fullName[0].trim(),
      lastName: fullName[fullName.length - 1].trim(),
      clientTypeId: 'emCjHShxZD2sSkvoIlHa',
      created: new Date(),
      modified: new Date()
    };

    const clientRef = await db.collection('clients').add(newClient);
    db
      .collection('clients')
      .doc(clientRef.id)
      .update({ id: clientRef.id });

    if ((newClient.id = '')) {
      newClient.id = clientRef.id;
    }

    // const newclientRef = await db.collection('clients').doc(clientRef.id);
    if (x.Medium.trim() !== '' || x.Notes.trim() !== '') {
      const comments = [
        {
          id: await clientRef.collection('comments').doc().id,
          body: `${x.Medium.trim()} | ${x.Notes.trim()}`,
          created: new Date(),
          user: user
        }
      ];
      clientRef.update({ comments: comments });
    }

    if (x.WEB.trim() !== '') {
      const websites = [
        {
          id: await clientRef.collection('websites').doc().id,
          name: x.WEB.trim(),
          alias: x.WEB.trim(),
          sort: 10
        }
      ];

      clientRef.update({ websites: websites });
    }

    // addClient(dispatch, newClient);
  });
};

export const init = (
  dispatch: (action: KnownAction) => void,
  getState: () => ApplicationState
) => {
  setUsers(dispatch);
  setClients(dispatch);
  setClientTypes(dispatch);
  setTags(dispatch, true);
  setTags(dispatch, false);
  setTagCategories(dispatch);
  watchClientChanges(dispatch, getState);
};

export const updateClient = async (
  dispatch: (action: KnownAction) => void,
  client: Client
) => {
  const clientRef = await db.collection('clients').doc(client.id);
  clientRef.update(client);
};

export const watchClientChanges = async (
  dispatch: (action: KnownAction) => void,
  getState: () => ApplicationState
) => {
  const user = getState().clientSlice.currentUser;
  const userId = user ? user.id : undefined;

  const currentClientRef = await db.collection('currentClientIds').doc(userId);

  currentClientRef.onSnapshot(snapShot => {
    snapShot.exists &&
      dispatch({
        type: 'SET_CURRENT_CLIENT',
        clientId: snapShot.data().clientId
      });
  });
};

// const getTagById = (tagCategories: TagCategory[], id: string) => {
//   let list = [];

//   tagCategories.forEach(x => {
//     x.tags && x.tags.filter(y => y.id === id).length > 0;
//   });
// };

// const findOne = (haystack: string[], arr: string[]) => {
//   return arr.some(v => {
//     return haystack.indexOf(v) >= 0;
//   });
// };

export default actionCreators;
