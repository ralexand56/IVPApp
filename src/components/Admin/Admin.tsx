import React, { StatelessComponent } from 'react';
import {
    Button,
    Divider,
    Icon,
    Input,
    Tag
} from 'antd';
import HorizontalLayout from '../HorizontalLayout';
import styled from 'styled-components';
import actionCreators from '../../actions/ClientActions';
import { fadeIn, TagCategory } from '../../datatypes';

const Search = Input.Search;

interface Props {
    addTagCategory: typeof actionCreators.addTagCategory;
    addTagToCategory: typeof actionCreators.addTagToCategory;
    className?: string;
    tagCategories: TagCategory[];
}

const Admin: StatelessComponent<Props> = (props) => (
    <div
        className={props.className}
    >
        <HorizontalLayout>
            <Search
                placeholder="Add Tag Category..."
                onSearch={val => props.addTagCategory(val)}
            />
            <Button>
                <Icon type="plus" />
            </Button>
        </HorizontalLayout>
        {
            renderCategories(props.tagCategories, props.addTagToCategory)
        }
    </div>
);

const StyledAdmin = styled(Admin) `
    overflow: auto;
    animation: ${fadeIn} 0.7s ease-in-out both;
`;

export default StyledAdmin;

const renderCategories = (tagCategories: TagCategory[], addTagToCategory: typeof actionCreators.addTagToCategory) => {
    return tagCategories.map(x => (
        <p key={x.id}>
            <Divider />
            <HorizontalLayout>
                <h4>{x.name}</h4>
                <Search
                    style={{paddingLeft: 10}}
                    placeholder="Add Tag to this Category..."
                    onSearch={val => addTagToCategory(val, x)}
                />
                <Button>
                    <Icon type="plus" />
                </Button>
            </HorizontalLayout>
            {
                x.tags && x.tags.map(y => <Tag key={y.id} color="blue">{y.name}</Tag>)}
        </p>)
    );
};