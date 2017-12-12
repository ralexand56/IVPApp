import React, { StatelessComponent } from 'react';
import { Tag } from 'antd';
import styled from 'styled-components';
import { Client, fadeIn, TagCategory } from '../../datatypes';
import actionCreators from '../../actions/ClientActions';

const CheckableTag = Tag.CheckableTag;

interface Props {
  currentClient: Client;
  tagCategories?: TagCategory[];
  className?: string;
  tagIds?: string[];
  toggleClientTag: typeof actionCreators.toggleClientTag;
}

const TagsView: StatelessComponent<Props> = ({
  className,
  currentClient,
  tagCategories,
  tagIds,
  toggleClientTag,
}) => (
  <div className={className}>
    <h4>Tags({tagIds ? tagIds.length : 0})</h4>
    {tagCategories
      ? tagCategories.map(x => {
          return (
            <div key={x.id}>
              <h4>{x.name}</h4>
              <div>
                {x.tags &&
                  x.tags.map(t => (
                    <CheckableTag
                      key={t.id}
                      checked={checkTagExists(t.id || '0', tagIds)}
                      onChange={(checked: boolean) =>
                        toggleClientTag(t.id || '', currentClient, checked)
                      }
                    >
                      {t.name}
                    </CheckableTag>
                  ))}
              </div>
            </div>
          );
        })
      : null}
  </div>
);

const StyledTagsView = styled(TagsView)`
  overflow: auto;
  height: 100%;
  animation: ${fadeIn} 0.7s ease-in-out;
`;

const checkTagExists = (tagId: string, tagIds?: string[]) =>
  tagIds
    ? tagIds.findIndex(x => tagId.toUpperCase() === x.toUpperCase()) > -1
      ? true
      : false
    : false;

export default StyledTagsView;
