import React, { StatelessComponent } from 'react';
import { Tag } from 'antd';
import styled from 'styled-components';

const CheckableTag = Tag.CheckableTag;

interface Props {
    className?: string;
}

const TagsView: StatelessComponent<Props> = (props) => (
    <CheckableTag
        checked={true}
        className={props.className}
    >
        Hello
    </CheckableTag>
);

const StyledTagsView = styled(TagsView)`
    background: red;
`;

export default StyledTagsView;