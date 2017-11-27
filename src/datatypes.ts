import { Client } from './datatypes';
import { keyframes } from 'styled-components';
import ThemeInterface from './theme';

export interface ClientState {
    clients: Client[];
    currentClientId: number;
    filteredClients: Client[];
    isInEditMode: boolean;
    searchResultsIsVisible: boolean;
    selectedClientTabId: number;
}

export interface AssetState {

}

export interface Client {
    id: number;
    isActive: boolean;
    firstName?: string;
    lastName?: string;
    address1?: string;
    address2?: string;
    city?: string;
    state?: string;
    country?: string;
    phone?: string;
    email?: string;
    website?: string;
    title?: string;
    assets?: Asset[];
    comments?: Comment[];
    interactions?: Interaction[];
}

export const sampleClients: Client[] = [
    {
        id: 1,
        isActive: true,
        firstName: 'Leonardo',
        lastName: 'Da Vinci',
        address1: '34 42nd Street',
        address2: 'Unit 300',
        city: 'Manhattan',
        state: 'NY',
        country: 'US',
        phone: '123-122-2322',
        email: 'leo@gmail.com',
        website: 'http://www.louvre.fr/en',
        title: 'Artiste',
        comments: [
            {
                body: 'work was esoteric and derivative',
                created: new Date(1900, 12, 25),
            },
            {
                body: 'Check out latest collection',
                created: new Date(1900, 12, 25),
            },
            {
                body: 'contact to show work',
                created: new Date(1900, 12, 25),
            },
            {
                body: 'artist difficutl to work with',
                created: new Date(1900, 12, 25),
            },
        ]
    },
    {
        id: 2,
        isActive: true,
        firstName: 'Pablo',
        lastName: 'Picasso',
        address1: '34 42nd Street',
        address2: 'Unit 300',
        city: 'Manhattan',
        state: 'NY',
        country: 'US',
        phone: '123-122-2322',
        email: 'leo@gmail.com',
        website: 'http://www.louvre.fr/en',
        title: 'Artiste',
        comments: [
            {
                body: 'work was esoteric and derivative',
                created: new Date(1900, 12, 25),
            },
            {
                body: 'Check out latest collection',
                created: new Date(1900, 12, 25),
            },
            {
                body: 'contact to show work',
                created: new Date(1900, 12, 25),
            },
            {
                body: 'artist difficutl to work with',
                created: new Date(1900, 12, 25),
            },
        ]
    },
    {
        id: 3,
        isActive: true,
        firstName: 'Andy',
        lastName: 'Warhol',
        address1: '34 42nd Street',
        address2: 'Unit 300',
        city: 'Manhattan',
        state: 'NY',
        country: 'US',
        phone: '123-122-2322',
        email: 'leo@gmail.com',
        website: 'http://www.louvre.fr/en',
        title: 'Artiste',
        comments: [
            {
                body: 'work was esoteric and derivative',
                created: new Date(1900, 12, 25),
            },
            {
                body: 'Check out latest collection',
                created: new Date(1900, 12, 25),
            },
            {
                body: 'contact to show work',
                created: new Date(1900, 12, 25),
            },
            {
                body: 'artist difficutl to work with',
                created: new Date(1900, 12, 25),
            },
        ]
    },
    {
        id: 4,
        isActive: true,
        firstName: 'Vincent',
        lastName: 'van Gogh',
        address1: '34 42nd Street',
        address2: 'Unit 300',
        city: 'Manhattan',
        state: 'NY',
        country: 'US',
        phone: '123-122-2322',
        email: 'leo@gmail.com',
        website: 'http://www.louvre.fr/en',
        title: 'Artiste',
        comments: [
            {
                body: 'work was esoteric and derivative',
                created: new Date(1900, 12, 25),
            },
            {
                body: 'Check out latest collection',
                created: new Date(1900, 12, 25),
            },
            {
                body: 'contact to show work',
                created: new Date(1900, 12, 25),
            },
            {
                body: 'artist difficutl to work with',
                created: new Date(1900, 12, 25),
            },
        ]
    }
];

export interface Asset {
    worth: number;
    url: string;
    type: string;
}

export interface Comment {
    body: string;
    created: Date;
}

export interface Interaction {
    body: string;
    created: Date;
}

export type KnownAction =
    AddClientAction |
    InitAction |
    SetClientTabAction |
    SetSearchResultsVisibilityAction |
    SetCurrentClientAction
    ;

export interface AddClientAction {
    type: 'ADD_CLIENT';
    newClient: Client;
}

export interface SetClientTabAction {
    type: 'SET_CLIENT_TAB';
    clientTabId: number;
}

export interface SetSearchResultsVisibilityAction {
    type: 'SET_SEARCH_RESULTS_VISIBILITY';
    isVisible: boolean;
}

export interface InitAction {
    type: 'INIT';
}

export interface SetCurrentClientAction {
    type: 'SET_CURRENT_CLIENT';
    clientId: number;
}

export const theme: ThemeInterface = {
    headingBackground1: '#98323C',
    headingBackground2: '#CF4A59',
    bodyBackground: '#EBEAE7',
    bodyForeground: '#86A0CC',
};

export const fadeIn = () => keyframes`
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
`;