import React, { StatelessComponent } from 'react';
import styled from 'styled-components';
import EditableField from '../EditableField';
import {
    Client,
    theme,
} from '../../datatypes';
import RevealPanel from '../RevealPanel';
import {
    Avatar,
    Input,
} from 'antd';
import HorizontalLayout from '../HorizontalLayout';

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
        <RevealPanel
            className={className}
            header={Header(currentClient, isInEditMode || false)}
            actions={
                <Avatar
                    src={currentClient.imgUrl ? `/images/${currentClient.imgUrl}` : ''}
                    shape="square"
                    size="large"
                    icon="user"
                    style={{ marginRight: 10 }}
                />
            }
        >
            <HorizontalLayout>
                <RevealPanel
                    header="Address"
                    width="400px"
                    endColor={theme.bodyBackground}
                    height="auto"
                    isVisible={true}
                >
                    <EditableField
                        label="Address 1"
                        txtValue={currentClient.address1}
                        isInEditMode={isInEditMode}
                        inline={true}
                    >
                        <Input
                            value={currentClient.address1}
                        />
                    </EditableField>
                    <EditableField
                        label="Address 2"
                        txtValue={currentClient.address2}
                        isInEditMode={isInEditMode}
                        inline={true}
                    >
                        <Input
                            value={currentClient.address2}
                        />
                    </EditableField>
                    <EditableField
                        label="City"
                        txtValue={currentClient.city}
                        isInEditMode={isInEditMode}
                        inline={true}
                    >
                        <Input
                            value={currentClient.city}
                        />
                    </EditableField>
                    <EditableField
                        label="Country"
                        txtValue={currentClient.country}
                        isInEditMode={isInEditMode}
                        inline={true}
                    >
                        <Input
                            value={currentClient.country}
                        />
                    </EditableField>
                </RevealPanel>
                <RevealPanel
                    header="Contact Info"
                    width="400px"
                    endColor={theme.bodyBackground}
                    height="auto"
                    isVisible={true}
                >
                    <EditableField
                        label="Phone"
                        txtValue={currentClient.phone}
                        isInEditMode={isInEditMode}
                        inline={true}
                    >
                        <Input
                            value={currentClient.phone}
                        />
                    </EditableField>
                    <EditableField
                        label="Email"
                        txtValue={currentClient.email}
                        isInEditMode={isInEditMode}
                        inline={true}
                    >
                        <Input
                            value={currentClient.email}
                        />
                    </EditableField>
                    <EditableField
                        label="Website"
                        txtValue={currentClient.website}
                        isInEditMode={isInEditMode}
                        inline={true}
                    >
                        <Input
                            value={currentClient.website}
                        />
                    </EditableField>
                </RevealPanel>
            </HorizontalLayout>
        </RevealPanel>
    );

const StyledClientBody = styled(ClientBody) `
    display: flex;
    flex: 1;
    width: 80%;
    height: 100%;
    border: 0px solid;
    margin: 20px;
`;

export default StyledClientBody;

const Header = (currentClient: Client, isInEditMode: boolean) => (
    <span style={{ display: 'flex' }}>
        <EditableField
            label="First Name"
            txtValue={currentClient.firstName}
            isInEditMode={isInEditMode}
            labelColor="white"
        >
            <Input
                key="1"
                value={currentClient.firstName}
            />
        </EditableField>
        <EditableField
            label="Last Name"
            txtValue={currentClient.lastName}
            isInEditMode={isInEditMode}
            labelColor="white"
        >
            <Input
                key="2"
                value={currentClient.lastName}
            />
        </EditableField>
        <EditableField
            label="Title"
            txtValue={currentClient.title}
            isInEditMode={isInEditMode}
            labelColor="white"
        >
            <Input
                key="2"
                value={currentClient.title}
            />
        </EditableField>
        <EditableField
            label="Company"
            txtValue={currentClient.company}
            isInEditMode={isInEditMode}
            labelColor="white"
        >
            <Input
                key="2"
                value={currentClient.company}
            />
        </EditableField>
    </span>
);