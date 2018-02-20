import { TagItem, ClientType } from './datatypes';
import { keyframes } from 'styled-components';
import ThemeInterface from './theme';
import firebase from 'firebase';
import styled from 'styled-components';
export const config = {
  apiKey: 'AIzaSyD6TDZWzU46rY07IHpz93778CpAVzLohcY',
  authDomain: 'ivpdb-1399c.firebaseapp.com',
  databaseURL: 'https://ivpdb-1399c.firebaseio.com',
  projectId: 'ivpdb-1399c',
  storageBucket: 'ivpdb-1399c.appspot.com',
  messagingSenderId: '390995409712'
};

export let db: firebase.firestore.Firestore;
export let storage: firebase.storage.Storage;
export const initializeDB = () => {
  firebase.initializeApp(config);

  db = firebase.firestore();
  storage = firebase.storage();
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
  clientIsVisible: boolean;
  clientTypes: ClientType[];
  currentClientId?: string;
  currentUser?: User;
  filteredClients: Client[];
  isInEditMode: boolean;
  isInteractive: boolean;
  majorTags: TagItem[];
  minorTags: TagItem[];
  newCommentText: string;
  affiliations: TagItem[];
  searchResultsIsVisible: boolean;
  selectedClientTabId: number;
  stateList: State[];
  message: string;
  users: User[];
  tagCategories: TagCategory[];
}

export interface State {
  id: string;
  name: string;
}

export interface AssetState {}

export interface Client {
  id: string;
  isActive?: boolean;
  firstName: string;
  lastName: string;
  note?: string;
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  country?: string;
  zip?: string;
  fax?: string;
  phone?: string;
  imgUrl?: string;
  emails?: NameId[];
  websites?: NameId[];
  title?: string;
  salutation?: number;
  company?: string;
  clientTypeId?: string;
  emailList?: boolean;
  mailList?: boolean;
  affiliations?: TagItem[];
  majorTags?: TagItem[];
  minorTags?: TagItem[];
  assets?: Asset[];
  comments?: Comment[];
  interactions?: Interaction[];
  sampleLinks?: SampleLink[];
  tagIds?: string[];
  tags?: TagItem[];
  created: Date;
  modified: Date;
}

export interface ClientType {
  id: string;
  name: string;
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
  user: User;
}

export interface Interaction {
  id: number;
  body: string;
  created: Date;
}

export interface NameId {
  id?: string;
  name: string;
  alias?: string;
  sort: number;
}

export interface SampleLink {
  id: string;
  src: string;
  isLocal: boolean;
}

export interface User {
  id?: string;
  isActive?: boolean;
  firstName: string;
  lastName: string;
  userName: string;
  pwd: string;
  created: Date;
  imgSrc?: string;
}

export interface TagCategory {
  id?: string;
  name?: string;
  tags?: TagItem[];
}

export interface TagItem {
  id?: string;
  name?: string;
}

export const clientTypeSort = (
  a: Client,
  b: Client,
  clientTypes: ClientType[]
) => {
  const clientSort = clientTypes.find(x => x.id === a.clientTypeId)!.name
    .toLocaleLowerCase()
    .localeCompare(
      clientTypes.find(x => x.id === b.clientTypeId)!.name.toLocaleLowerCase()
    );

  const nameSort = `${b.firstName} ${b.lastName}`
    .toLocaleLowerCase()
    .localeCompare(`${a.firstName} ${a.lastName}`.toLocaleLowerCase());

  return clientSort || Math.abs(nameSort);
};
// a.clientTypeId &&
// b.clientTypeId &&
// clientTypes.find(x => x.id === a.clientTypeId)!.name <
//   clientTypes.find(x => x.id === b.clientTypeId)!.name
//   ? -1
//   : clientTypes.find(x => x.id === a.clientTypeId)!.name >
//     clientTypes.find(x => x.id === b.clientTypeId)!.name
//     ? 1
//     : a.firstName < b.firstName ? -1 : a.firstName > b.firstName ? 1 : 0;

export const tagSort = (a: TagItem, b: TagItem) =>
  a.name && a.name.toLowerCase() > b.name!.toLowerCase() ? 1 : -1;

export const validateEmail = (inputText: string) => {
  const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const retVal = inputText.match(mailformat) ? true : false;

  return retVal;
};

export const validateUrl = (inputText: string) => {
  // const linkFormat = /^(ftp|http|https):\/\/[^ "]+$/;
  // const retVal = inputText.match(linkFormat) ? true : false;

  return inputText !== undefined && inputText.trim() !== '';
};

export type KnownAction =
  | AddAffiliationAction
  | AddClientAction
  | AddSampleLinkAction
  | AddTagCategoryAction
  | AddClientTypeAction
  | AddTagAction
  | AddUserAction
  | DeleteCommentAction
  | InitAction
  | SetAffiliationsAction
  | SetFilteredClientsAction
  | SetClientEditModeAction
  | SetClientTabAction
  | SetClientTypesAction
  | SetInteractiveAction
  | SetSearchResultsVisibilityAction
  | SetClientsAction
  | SetCommentTextAction
  | SetCurrentClientAction
  | SetTagsAction
  | SetMessageAction
  | SetTagCategoriesAction
  | SetUsersAction
  | UpdateClientAction
  | UpdateTagCategory;

export interface AddAffiliationAction {
  type: 'ADD_AFFILIATION';
  affiliation: TagItem;
}

export interface AddClientAction {
  type: 'ADD_CLIENT';
  newClient: Client;
}

export interface AddSampleLinkAction {
  type: 'ADD_SAMPLE_LINK';
  sampleLink: SampleLink;
}

export interface AddClientTypeAction {
  type: 'ADD_CLIENT_TYPE';
  clientType: ClientType;
}

export interface AddTagAction {
  type: 'ADD_TAG';
  tag: TagItem;
  isMinor: boolean;
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

export interface SetAffiliationsAction {
  type: 'SET_AFFILIATIONS';
  affiliations: TagItem[];
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

export interface SetCommentTextAction {
  type: 'SET_COMMENT_TEXT';
  newCommentText: string;
}

export interface SetFilteredClientsAction {
  type: 'SET_FILTERED_CLIENTS';
  filteredClients: Client[];
}

export interface SetInteractiveAction {
  type: 'SET_INTERACTIVE';
  isInteractive: boolean;
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

export interface SetTagsAction {
  type: 'SET_TAGS';
  tags: TagItem[];
  isMinor: boolean;
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
  headingBackground1: '#867290',
  headingBackground2: '#64c1a1',
  bodyBackground: '#EBEAE7',
  bodyForeground: '#86A0CC'
};

export const fadeIn = () => keyframes`
    0% {
        opacity: 0;
        transform: scale(0);
    }
    100% {
        opacity: 1;
        transform: scale(1);
    }
`;

export const fadeOut = () => keyframes`
    0% {
        opacity: 1;
        transform: scale(1);
    }
    100% {
        opacity: 0;
        transform: scale(0);
    }
`;

export const slideIn = () => keyframes`
    0% {
        transform: scaleY(0);
    }
    50% 100% {
       transform: scaleY(1);
    }
    100% {
        transform: scaleY(1);
    }
`;

export const slideOut = () => keyframes`
   0% {
        opacity: 1;
        max-height: 100%;
    }
    100% {
        opacity: 1;
        max-height: 0%;
    }
`;

export const HeaderStyle = styled.div`
  background: #64c1a1;
  color: #fff;
  padding: 3px 9px;
  font-size: 0.6rem;
  font-weight: bold;
  letter-spacing: 4px;
  margin: 0px 0px 0px 0px;
  text-transform: uppercase;
`;

export const formatPhone = (phonenum: string) => {
  var regexObj = /^(?:\+?1[-. ]?)?(?:\(?([0-9]{3})\)?[-. ]?)?([0-9]{3})[-. ]?([0-9]{4})$/;
  if (regexObj.test(phonenum)) {
    let parts = phonenum.match(regexObj);
    let phone = '';
    if (parts && parts[1]) {
      phone += '+1 (' + parts[1] + ') ';
    }
    if (parts) {
      phone += parts[2] + '-' + parts[3];
    }
    return phone;
  } else {
    // invalid phone number
    return phonenum;
  }
};

export const stateList = [
  {
    name: 'Alabama',
    id: 'AL'
  },
  {
    name: 'Alaska',
    id: 'AK'
  },
  {
    name: 'American Samoa',
    id: 'AS'
  },
  {
    name: 'Arizona',
    id: 'AZ'
  },
  {
    name: 'Arkansas',
    id: 'AR'
  },
  {
    name: 'California',
    id: 'CA'
  },
  {
    name: 'Colorado',
    id: 'CO'
  },
  {
    name: 'Connecticut',
    id: 'CT'
  },
  {
    name: 'Delaware',
    id: 'DE'
  },
  {
    name: 'District Of Columbia',
    id: 'DC'
  },
  {
    name: 'Federated States Of Micronesia',
    id: 'FM'
  },
  {
    name: 'Florida',
    id: 'FL'
  },
  {
    name: 'Georgia',
    id: 'GA'
  },
  {
    name: 'Guam',
    id: 'GU'
  },
  {
    name: 'Hawaii',
    id: 'HI'
  },
  {
    name: 'Idaho',
    id: 'ID'
  },
  {
    name: 'Illinois',
    id: 'IL'
  },
  {
    name: 'Indiana',
    id: 'IN'
  },
  {
    name: 'Iowa',
    id: 'IA'
  },
  {
    name: 'Kansas',
    id: 'KS'
  },
  {
    name: 'Kentucky',
    id: 'KY'
  },
  {
    name: 'Louisiana',
    id: 'LA'
  },
  {
    name: 'Maine',
    id: 'ME'
  },
  {
    name: 'Marshall Islands',
    id: 'MH'
  },
  {
    name: 'Maryland',
    id: 'MD'
  },
  {
    name: 'Massachusetts',
    id: 'MA'
  },
  {
    name: 'Michigan',
    id: 'MI'
  },
  {
    name: 'Minnesota',
    id: 'MN'
  },
  {
    name: 'Mississippi',
    id: 'MS'
  },
  {
    name: 'Missouri',
    id: 'MO'
  },
  {
    name: 'Montana',
    id: 'MT'
  },
  {
    name: 'Nebraska',
    id: 'NE'
  },
  {
    name: 'Nevada',
    id: 'NV'
  },
  {
    name: 'New Hampshire',
    id: 'NH'
  },
  {
    name: 'New Jersey',
    id: 'NJ'
  },
  {
    name: 'New Mexico',
    id: 'NM'
  },
  {
    name: 'New York',
    id: 'NY'
  },
  {
    name: 'North Carolina',
    id: 'NC'
  },
  {
    name: 'North Dakota',
    id: 'ND'
  },
  {
    name: 'Northern Mariana Islands',
    id: 'MP'
  },
  {
    name: 'Ohio',
    id: 'OH'
  },
  {
    name: 'Oklahoma',
    id: 'OK'
  },
  {
    name: 'Oregon',
    id: 'OR'
  },
  {
    name: 'Palau',
    id: 'PW'
  },
  {
    name: 'Pennsylvania',
    id: 'PA'
  },
  {
    name: 'Puerto Rico',
    id: 'PR'
  },
  {
    name: 'Rhode Island',
    id: 'RI'
  },
  {
    name: 'South Carolina',
    id: 'SC'
  },
  {
    name: 'South Dakota',
    id: 'SD'
  },
  {
    name: 'Tennessee',
    id: 'TN'
  },
  {
    name: 'Texas',
    id: 'TX'
  },
  {
    name: 'Utah',
    id: 'UT'
  },
  {
    name: 'Vermont',
    id: 'VT'
  },
  {
    name: 'Virgin Islands',
    id: 'VI'
  },
  {
    name: 'Virginia',
    id: 'VA'
  },
  {
    name: 'Washington',
    id: 'WA'
  },
  {
    name: 'West Virginia',
    id: 'WV'
  },
  {
    name: 'Wisconsin',
    id: 'WI'
  },
  {
    name: 'Wyoming',
    id: 'WY'
  }
];

export const UserImport = [
  {
    ARTISTS: 'Agid Nick ',
    WEB: 'http://www.agidarts.com/ ',
    Medium:
      'hybrid betw sculpture and painting, stained glass like, etched metal',
    Notes: '310.980.7195',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Aitken Doug ',
    WEB: 'http://www.dougaitkenworkshop.com/selected-work/ ',
    Medium: 'video - architectural scale',
    Notes: 'LA',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Alawi Seyed ',
    WEB: 'http://here2day.netwiz.net  ',
    Medium: 'conceptual, site-responsive',
    Notes: 'San Francisco',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Albaquerque Lita',
    WEB: 'http://litaalbuquerque.com/',
    Medium: '',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Aldrich Lynn',
    WEB: 'http://lynnaldrich.com',
    Medium: '',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Allen Terry ',
    WEB: 'http://www.terryallenartmusic.com',
    Medium: 'LA LOUVER',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Appel Kevin ',
    WEB: 'http://www.kevinappelstudio.com/ ',
    Medium: 'architecural abstract painting',
    Notes: 'LA',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Aycock Alice ',
    WEB: 'http://www.aaycock.com/',
    Medium: '',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Ball-Nogues',
    WEB: 'http://www.ball-nogues.com/   benjamin@ball-nogues.com',
    Medium: 'architect-artist team, site-responsive environments',
    Notes: 'LA',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Bartels Marlo ',
    WEB: 'http://www.marlobartels.com/index.html',
    Medium: 'Mosaic',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Bavington Tim ',
    WEB: 'http://www.timbavington.com/ ',
    Medium: 'musical, colorful vertical bands of color',
    Notes: 'Las Vegas - gal',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Bengston Billy Al ',
    WEB: 'http://www.billyalbengston.com/',
    Medium: '',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'BJ Krivanek',
    WEB: 'http://www.krivanek-breaux.com/',
    Medium: 'text',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Blum Nancy ',
    WEB: 'http://nancyblum.com/',
    Medium: 'Painter and public art',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Botello Paul  ',
    WEB: 'http://latinoartcommunity.org',
    Medium: 'chicano, muralist',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Braunstein Terry ',
    WEB: 'http://terrybraunstein.com/site-entrance/',
    Medium: 'multimedia, photomontage',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Braver Nancy ',
    WEB: 'http://www.nancybraver.com/',
    Medium: 'acrylic',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Brogger Mary ',
    WEB: 'http://www.marybrogger.com/',
    Medium: 'steel curtains',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Bronson Jessica ',
    WEB: '',
    Medium: 'media, video, text',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Browder Amanda ',
    WEB: 'http://www.amandabrowder.com/ ',
    Medium: 'stripes, textile',
    Notes: 'Brooklyn',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Brower Hatcher',
    WEB: 'http://midoceanstudio.com/category/chronology/',
    Medium: 'light etc.',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Campbell Jim ',
    WEB: 'http://www.jimcampbell.tv/ ',
    Medium: 'LED kinetic, animated installations',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Cao Andy  - Xavier Perrot',
    WEB: 'http://www.caoperrotstudio.com ',
    Medium: '',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Carpenter Ed ',
    WEB: 'http://www.edcarpenter.net/home/home.html ',
    Medium: 'Glass, metal, light',
    Notes: 'Portland',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Carpenter James ',
    WEB: 'http://www.jcdainc.com/ ',
    Medium: 'architectural, light, glass',
    Notes: 'NYC',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Chang Jackie ',
    WEB: 'http://jackiechang.net ',
    Medium: 'text',
    Notes: 'Brooklyn',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Cheng Carl , John Doe Co.',
    WEB: 'http://johndoecompany.com/',
    Medium: '',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Corliss Troy ',
    WEB: 'http://www.troycorliss.com/ ',
    Medium: '',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Corson Dan ',
    WEB: 'http://www.corsonart.com/',
    Medium: 'light + Installations',
    Notes: 'Seattle',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Creative Machines Blessing Hancock',
    WEB: 'http://creativemachines.com/sculpture/brilliance',
    Medium: 'cutout steel, interactive light, ball machines, etc.',
    Notes: 'Tuscon, Arizona',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'D&quot;Agostino Fernanda ',
    WEB: 'http://www.fernandadagostino.com ',
    Medium: 'mixed media, interactive, video, film',
    Notes: 'Portland',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Deacon Richard ',
    WEB: 'http://www.richarddeacon.net/ ',
    Medium: 'sculpture',
    Notes: 'UK',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Delgado Roberto ',
    WEB: 'http://www.titodelgado.com/',
    Medium: 'chicano photo-realism',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Dumbacher John and Joseph ',
    WEB: 'http://www.dumbacherstudio.com',
    Medium: 'elegant minimal sculpture (not much public focus)',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Dym Miriam ',
    WEB: 'www.miriamdym.com ',
    Medium: 'maping, textile,',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Echelman Janet ',
    WEB: 'http://www.echelman.com/',
    Medium: '',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Electroland',
    WEB: 'http://electroland.net ',
    Medium: ' interactive- and media-arts in public spaces',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Erskine Peter ',
    WEB: 'http://erskinesolarart.net/',
    Medium: 'solar spectrum environmental art',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Fairey Shepard ',
    WEB: 'http://www.obeygiant.com/',
    Medium: 'street artist, political',
    Notes: 'LA',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Farrage Tom ',
    WEB: 'metal, fabrication',
    Medium: 'Culver City',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Fitzgibbons Bill ',
    WEB: 'http://www.billfitzgibbons.com',
    Medium: 'Public art with light, sculpture',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Fletcher Harrell ',
    WEB: 'http://www.harrellfletcher.com',
    Medium: 'Interdisciplinary, community outreach',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Gantman Martin ',
    WEB: 'http://www.gantman.com/',
    Medium: 'Interdisciplinary, community outreach',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Gardner Ann ',
    WEB: 'http://www.anngardner.net/',
    Medium: 'Mosaic',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Garten Cliff ',
    WEB: 'http://www.cliffgartenstudio.com ',
    Medium: '',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Gawne Candice ',
    WEB: 'http://www.luminousartworks.com/artist-bio.html',
    Medium: 'neon, light ',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Geckler Megan ',
    WEB: 'http://www.megangeckler.com/ ',
    Medium: 'stripes, site-specific architectural',
    Notes: 'LA',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Geller Matthew ',
    WEB: 'http://www.matthewgeller.com',
    Medium: 'fog trees etc.',
    Notes: 'NY',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Genderen Monique Van ',
    WEB: 'n/a',
    Medium: 'reflective, vinyl decals ',
    Notes: 'Hammer Wall project',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Georgesco Christopher ',
    WEB: 'http://www.georgescoart.com',
    Medium: 'contemporary sculpture',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Gillies-Smith Shauna ',
    WEB: 'http://www.groundinc.com ',
    Medium: 'landscape',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Glassman Stephen ',
    WEB: 'http://stephenglassmanstudio.net/',
    Medium: '',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Green Phyllis ',
    WEB: 'http://www.phyllisgreen.net/phyllis_green/Phyllis_green_about.html',
    Medium: 'ceramic',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Greiman April ',
    WEB: 'http://aprilgreiman.com/ ',
    Medium: '"transmedia" computer, design',
    Notes: 'LA',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Grygutis Barbara ',
    WEB: 'http://www.barbaragrygutis.com/ ',
    Medium: '',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Haddad-Drugan',
    WEB: 'http://www.haddad-drugan.com/projects.html',
    Medium: 'ladscape, conceptual, site specific',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Hall Sarah ',
    WEB: 'http://www.sarahhallstudio.com/solar-photovoltaic',
    Medium: 'glass',
    Notes: 'Toronto',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Hamrol Lloyd ',
    WEB: 'http://www.lloydhamrol.com/Lloyd_Hamrol_website/HOMEPAGE.html',
    Medium: '',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Harries-Heder',
    WEB: 'http://harriesheder.com/',
    Medium: '',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Hasimoto Jacob ',
    WEB: 'http://jacobhashimoto.com/ ',
    Medium: 'paper kites, interactive compositions',
    Notes: 'NYC',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Hayden Michael ',
    WEB: 'http://www.thinkinglightly.com',
    Medium: 'light, neon, holographic',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Healy Wayne ',
    WEB: 'http://www.eastlosstreetscapers.com/index.html',
    Medium: '',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Herman Roger ',
    WEB: 'http://www.rogerherman.net/',
    Medium: 'painter',
    Notes: 'LA',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Hirschfield Jim - Ishii Sonya ',
    WEB: '',
    Medium: '',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Hobson Paul  ',
    WEB: 'http://paulhobson.org/ ',
    Medium: 'gates',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Howe Anthony ',
    WEB: 'http://www.howeart.net ',
    Medium: 'kinetic metal wind sculpture',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Howe Brad ',
    WEB: 'http://www.bradhowe.com/',
    Medium: '',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Huether Gordon ',
    WEB: 'http://www.gordonhuether.com/',
    Medium: 'glass, metal',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Isermann Jim ',
    WEB: 'http://jimisermann.com/',
    Medium: '',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Janney Christopher ',
    WEB: 'http://janneysound.com/ ',
    Medium: 'sound and light installations',
    Notes: 'Lexington MA and London',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Jaquis Michelle ',
    WEB: 'http://www.michelejaquis.com/',
    Medium: 'interdisciplinary, video',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Johnston Richard M ',
    WEB: 'http://johnstonsculpturestudio.com ',
    Medium: 'metal sculpture',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: ' Jones Kristin - Ginzel Andrew ',
    WEB: 'http://www.jonesginzel.com/',
    Medium: '',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Jordan Lorna',
    WEB: 'http://lornajordan.com ',
    Medium: 'Environmental',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Kahn Ned ',
    WEB: 'http://nedkahn.com/',
    Medium: '',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Kaiser Smith Yvette ',
    WEB: 'http://yvettekaisersmith.com/home.html',
    Medium: 'crocheted fiberglass sculpture',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Kaneko Jun ',
    WEB: 'http://www.junkaneko.com/',
    Medium: 'ceramic',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Karlsen Anne Marie ',
    WEB: 'http://annemariekarlsen.com',
    Medium: '',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Kaufman Seth ',
    WEB: 'http://sethkaufman.com/',
    Medium: '',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Kemper Guy ',
    WEB: 'http://www.kemperstudio.com/',
    Medium: 'glass',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'King Ray ',
    WEB: 'http://www.rayking.nu/ ',
    Medium: 'sculpting with glass, light  (dichroic)',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Klein Sheila ',
    WEB: 'www.sheilaklein.com ',
    Medium: 'multimedia and steel yarn',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Knapp Steve ',
    WEB: 'http://www.lightpaintings.com/',
    Medium: 'sculpting with light, glass',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Kobayashi - Perlas',
    WEB: 'http://www.kippkobayashi.com',
    Medium: '',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Koblitz Karen ',
    WEB: 'http://www.karenkoblitz.com/',
    Medium: 'ceramic',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Lang Gary ',
    WEB: 'http://www.focusonthemasters.com/lang.html ',
    Medium: 'dense color circles, lines, grids',
    Notes: 'Ojai',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Larson Laura ',
    WEB: 'http://www.larsonart.net/  ',
    Medium: '',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'LeFevre Gregg ',
    WEB: 'http://www.andrewslefevre.com/',
    Medium: 'Photography, bronze plaques',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Legrady George ',
    WEB: 'http://www.georgelegrady.com/ ',
    Medium: 'experimental visualization, computer and interactive media',
    Notes: 'Santa Barbara',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Lere Mark ',
    WEB: 'http://www.marklere.com/',
    Medium: '',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Looney Norm ',
    WEB: 'http://www.normlooney.com/publicworks.html',
    Medium: 'metal colorful sculpture',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Lozano Hemmer Rafael ',
    WEB: 'http://www.lozano-hemmer.com/ ',
    Medium: 'electronic, architectural, interactive projections',
    Notes: 'Montreal Canada',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Lutyens Marcos ',
    WEB: 'http://www.mlutyens.com',
    Medium: 'multimedia',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Mahaffey Rae ',
    WEB: 'http://raemahaffey.com/home.html',
    Medium: 'painter of patterns at times pa on glass',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Mandel Mike ',
    WEB: 'http://www.thecorner.net',
    Medium: 'photo mosaic',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Mansfield Robert ',
    WEB: 'robert.mansfield@sdsu.edu',
    Medium: 'monumental sculpture - abstract',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Marcheschi Cork ',
    WEB: 'http://www.corkmarcheschi.com/index2.php',
    Medium: '',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Marianantoni Alessandro ',
    WEB: '',
    Medium: '',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Marioni Paul -Ann Troutner',
    WEB: '(son Dante Marioni - studio glass)',
    Medium: 'glass, mosaic, etc.',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Martinez Juliana ',
    WEB: 'www.julianamartinezart.com',
    Medium: 'ceramic muralist (outreach)',
    Notes: 'LA',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'McCafferty Jay ',
    WEB: 'http://www.jaymccafferty.com',
    Medium: 'solar burned paintings',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'McCarren Barbara  (Jud Fine)',
    WEB: 'http://www.barbaramccarren.com/',
    Medium: '',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'McRight Blue ',
    WEB: 'www.bluemcright.com',
    Medium: '',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Merge Conceptual Design',
    WEB: 'http://www.mergeconceptualdesign.com/',
    Medium: 'conceptual, site-responsive',
    Notes: 'LA',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Mersky Deborah ',
    WEB: 'http://www.deborahmersky.com/',
    Medium: 'cut metal',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Metais Jean Bernard ',
    WEB: 'http://www.jbmetais.com/',
    Medium: '',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Mizuno Mineo ',
    WEB: 'http://www.mineomizuno.com/updated%202012/bio.html',
    Medium: '',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Moeller Christian ',
    WEB: 'http://christianmoeller.com/',
    Medium: 'innovative, interactive architectural installations',
    Notes: 'LA',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Mooslin Nancy ',
    WEB: 'http://www.nancymooslin.com/',
    Medium: 'color and musical concepts',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Mortimer Art ',
    WEB: 'http://www.artmortimer.com/',
    Medium: 'muralist',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Muller Manfred ',
    WEB: 'Rose Gallery',
    Medium: '',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Muller Mario ',
    WEB: 'http://mariomuller.com/Public_Art.html',
    Medium: 'shadow india ink paintings on glass',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Narduli Susan ',
    WEB: 'http://www.nardulistudio.com/',
    Medium: '',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Neilson Rob ',
    WEB: 'http://www.robneilson.com/',
    Medium: 'witty',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Nettleship Will ',
    WEB: 'http://willnettleship.com/ ',
    Medium: 'hardscape',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Niemi Ries ',
    WEB: 'http://www.riesniemi.com/index.html ',
    Medium: 'metal',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Nolan Timothy ',
    WEB: 'http://timothynolan.com/home.html',
    Medium: 'pattern, repetition',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'NY Art Projects',
    WEB: 'http://www.nyartprojects.com/',
    Medium: '',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Odland Bruce ',
    WEB: 'http://bruceodland.net/',
    Medium: 'sound',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Okulick John ',
    WEB: 'http://johnokulick.com/',
    Medium: '',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Okun Jenny ',
    WEB: 'http://www.jennyokun.com/',
    Medium: 'photography',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Outerbridge John ',
    WEB: '',
    Medium: '',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Owens Laura ',
    WEB: 'http://owenslaura.com/visual ',
    Medium: 'Painting, colour dense, Lasker like with text and grid',
    Notes: 'LA - gal',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Pagen Geoffrey ',
    WEB: 'http://www.geoffreypagen.com/ ',
    Medium: 'ceramic panels',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Petley Kate ',
    WEB: 'http://www.katepetley.com/index.html',
    Medium: 'resin, glass, photography',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Pinkel Sheila ',
    WEB: 'http://sheilapinkel.com/',
    Medium: 'photography, xeroradiography',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Poethig Johanna ',
    WEB: 'http://johannapoethig.com/public-art-projects/',
    Medium: 'text, ceramic, mosaic, etc.',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Pollack Linda ',
    WEB: 'social',
    Medium: '',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Powell Eric ',
    WEB: 'http://ericpowell.com/ ',
    Medium: 'metal fences and gates',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Redl Erwin',
    WEB: 'http://www.paramedia.net ',
    Medium: 'light, LED, interactive',
    Notes: 'Ace',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Reginato Peter ',
    WEB: 'http://www.peterreginato.com/',
    Medium: 'painted steel, abstract, sculpture',
    Notes: 'NYC',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Reiss Roland ',
    WEB: 'http://www.focusonthemasters.com/Roland_Reiss.html',
    Medium: 'painter, sculptor',
    Notes: 'LA',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Retna',
    WEB: 'http://www.digitalretna.com/',
    Medium: 'graffity, street art',
    Notes: 'LA',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Roden Steve ',
    WEB: 'http://www.inbetweennoise.com/',
    Medium: 'sound, concptual painting',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Rogers John ',
    WEB: 'http://www.johnrogersart.com/',
    Medium: 'glass and light',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Rolstad Koryn ',
    WEB: 'http://www.krstudios.com/ ',
    Medium: 'various public installations - glass, metal, etc.',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Ross Adam ',
    WEB: 'http://adamrossstudio.com',
    Medium: 'Painting',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Rothenberg Erika ',
    WEB: 'http://erikarothenberg.com/',
    Medium: 'issues based text',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Salas Roberto ',
    WEB: 'http://robertosalas.com/roberto-salas-public-art-main.htm',
    Medium: 'murals, collaborations, sculpture',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Sanborn Jim ',
    WEB: 'http://jimsanborn.net/',
    Medium: 'text, light, topographic projections',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Sanders John Hillis ',
    WEB: 'http://www.johnhillissanders.com/ ',
    Medium: 'light and metal sculpture',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Saxe-Patterson',
    WEB: 'http://www.saxe-patterson.com/',
    Medium: 'ceramic',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Sayre Thomas ',
    WEB: 'http://www.thomassayre.com/ ',
    Medium: 'terrazzo, stone, collaborations',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Scharf Kenny ',
    WEB: 'http://kennyscharf.com/ks.php?gazgroup=4',
    Medium: 'cartoon, popular culture, street art',
    Notes: 'Brooklyn',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Schwendinger Leni ',
    WEB: 'http://www.lightprojectsltd.com/',
    Medium: 'light',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Sharrod Partin Charles ',
    WEB: 'http://partinstudios.com/about.htm',
    Medium: 'carved brick',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Shire Peter ',
    WEB: 'http://petershirestudio.com/',
    Medium: 'ceramic ',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Siegel Fran ',
    WEB: 'http://www.fransiegel.com/',
    Medium: '',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Silton Susan ',
    WEB: 'n/a web   ss@susansilton.com',
    Medium: 'photography, cinema, stripes ',
    Notes: 'LA',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Smith Phillip K ',
    WEB: 'http://www.pks3.com/ ',
    Medium: 'sculpture, light',
    Notes: 'Indio',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Soto Lewis de ',
    WEB: 'http://lewisdesoto.net ',
    Medium: '',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Stallard Tony ',
    WEB: 'http://www.tonystallard.co.uk/',
    Medium: 'neon, light ',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Steinkamp Jennifer ',
    WEB: 'http://jsteinkamp.com/ ',
    Medium: 'projection, led',
    Notes: 'LA',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Stoller Roger ',
    WEB: 'http://stollerstudio.com/',
    Medium: 'sculpture, fountains, architectural',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Strasen Barbara ',
    WEB: 'http://www.barbarastrasen.com/',
    Medium: 'lenticular',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Strayhorn Robin ',
    WEB: 'http://www.robinstrayhorn.',
    Medium: '',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Stutz Michael ',
    WEB: 'http://www.stutzart.com/ ',
    Medium: '',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Sun May ',
    WEB: 'http://www.maysunstudio.com/#home',
    Medium: '',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Surls James ',
    WEB: 'www.jamessurls.com ',
    Medium: 'sculpture',
    Notes: 'Colorado',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Taylor Gail ',
    WEB: 'http://www.gtmetals.com/',
    Medium: 'copper etched with nature scapes, leaves, trees',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Thomas Austin ',
    WEB: 'http://www.austinthomas.org/',
    Medium: 'theoretical architecture, perches',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Turk Elizabeth ',
    WEB: 'WWW.ELIZABETHTURKSCULPTOR.COM',
    Medium: 'marble sculpture',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Turner Ray ',
    WEB: 'http://rayturner.us/works/population/',
    Medium: 'Portrait painter on glass',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Turner Richard ',
    WEB: 'http://www.turnerprojects.com ',
    Medium: '',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Umbrico Penelope ',
    WEB: 'http://www.penelopeumbrico.net/ ',
    Medium: 'Photography based',
    Notes: 'NYC',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Updegraff Miller ',
    WEB: 'http://www.millerupdegraff.com/',
    Medium: 'painter',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Urbana - Robert Ley',
    WEB: 'http://urbanaarch.com/ ',
    Medium: 'Experimental materials, metal, architectural installations',
    Notes: 'LA  (Lumenscape)',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Utterback Camille ',
    WEB: 'http://camilleutterback.com/ ',
    Medium: 'interactive, media, projections',
    Notes: 'San Francisco',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Wagner Catherine ',
    WEB: 'http://catherinewagner.org/ ',
    Medium: 'Photogeaphy based, media, LED, site specific',
    Notes: 'San Francisco',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Walter Jack',
    WEB: 'http://www.walterjack.co.uk/',
    Medium: 'crushed wall',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Weber Sally ',
    WEB: 'http://www.sallyweber.com',
    Medium: 'solar, glass',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Weisman Nina ',
    WEB: 'sound and public interventions',
    Medium: '',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'White Emily - Little Lisa  ',
    WEB: 'http://www.layerla.com/ ',
    Medium: 'PMCA installation, architectural interventions',
    Notes: 'LA',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'White Pae ',
    WEB:
      'paewhite@earthlink.net  http://www.1301pe.com/artists/images.asp?aid=2',
    Medium: 'tapestry, hanging mobiles, modernist, art-design',
    Notes: 'LA',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Williams Stuart ',
    WEB: 'http://stuartwilliamsart.com/',
    Medium: 'environmental artist, light, landscape installations',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Wiseman David ',
    WEB: 'http://www.dwiseman.com/about ',
    Medium: 'ceramic, crystal, glass, etc. chandeliers, branches',
    Notes: 'LA',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Wolff Karen Frimkess ',
    WEB: 'http://www.karenfrimkesswolff.com/',
    Medium: 'Sound and site specific with sound, bells',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Woytuk Peter ',
    WEB: 'http://www.woytuk.com/',
    Medium: 'bronze birds and animals',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Yunhee Min  ',
    WEB: 'http://www.yunheemin.com/home ',
    Medium: 'hard-edged color planes, site specific installations',
    Notes: 'LA',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Zellen Jody ',
    WEB: 'http://www.jodyzellen.com/',
    Medium: 'photography, glass, tiles',
    Notes: '',
    Column4: '',
    Column5: ''
  },
  {
    ARTISTS: 'Zweig Janet ',
    WEB: 'http://www.janetzweig.com/',
    Medium: '',
    Notes: '',
    Column4: '',
    Column5: ''
  }
];
