import React, { StatelessComponent } from 'react';
import styled from 'styled-components';
import EditableField from '../EditableField';
import {
    Client
} from '../../datatypes';

interface Props {
    className?: string;
    children?: React.ReactChild;
    currentClient: Client;
    isInEditMode?: boolean;
}

const ClientBody: StatelessComponent<Props> = ({ 
    className, 
    children,
    currentClient,
    isInEditMode,
 }) => (
    <div className={className}>
        <EditableField
            label="First Name"
            txtValue={currentClient.firstName}
            isInEditMode={isInEditMode}
        >
            <input
                key="1"
                value={currentClient.firstName}
            />
        </EditableField>
        <EditableField
            label="Last Name"
            txtValue={currentClient.lastName}
            isInEditMode={isInEditMode}
        >
            <input
                key="2"
                value={currentClient.lastName}
            />
        </EditableField>
    </div>
);

const StyledClientBody = styled(ClientBody) `
    display: flex;
`;

export default StyledClientBody;