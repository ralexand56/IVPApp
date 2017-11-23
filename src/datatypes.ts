import { Client } from './datatypes';
import { keyframes } from 'styled-components';
import ThemeInterface from './theme';

export interface ClientState {
    clients: Client[];
    currentClientId: number;
    searchResultsIsVisible: boolean;
}

export interface AssetState {

}

export interface Client {
    id: number;
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
    InitAction |
    SetSearchResultsVisibilityAction |
    SetCurrentClientAction
    ;

export interface InitAction {
    type: 'INIT';
}

export interface SetSearchResultsVisibilityAction {
    type: 'SET_SEARCH_RESULTS_VISIBILITY';
    isVisible: boolean;
}

export interface SetCurrentClientAction {
    type: 'SET_CURRENT_CLIENT';
    clientId: number;
}

export const theme: ThemeInterface = {
    headingBackground1: '#784D62',
    headingBackground2: '#B87580',
};

export const fadeIn = () => keyframes`
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
`;