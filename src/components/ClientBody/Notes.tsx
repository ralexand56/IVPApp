import React, { StatelessComponent } from 'react';
import styled from 'styled-components';
import EditableField from '../EditableField';
import RevealPanel from '../RevealPanel';
import { Client, theme } from '../../datatypes';
import actionCreators from '../../actions/ClientActions';
import { Input } from 'antd';

const { TextArea } = Input;

interface Props {
  className?: string;
  currentClient: Client;
  isInEditMode: boolean;
  updateClient: typeof actionCreators.updateClient;
}

const Notes: StatelessComponent<Props> = ({
  className,
  currentClient,
  isInEditMode,
  updateClient,
}) => (
  <RevealPanel
    header="Notes"
    className={className}
    endColor={theme.bodyBackground}
    height="auto"
    isVisible={true}
  >
    <EditableField isInEditMode={isInEditMode} txtValue={currentClient.note}>
      <TextArea
        rows={4}
        value={currentClient.note}
        onChange={e =>
          updateClient({
            ...currentClient,
            note: e.currentTarget.value,
          })
        }
      />
    </EditableField>
  </RevealPanel>
);

const StyledNotes = styled(Notes)`
  width: 100%;
  height: 20%;
`;

export default StyledNotes;
