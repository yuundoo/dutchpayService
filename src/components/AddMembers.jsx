import { CenteredOverlayForm } from './CenteredOverlayForm';

import { useRecoilState, useRecoilValue } from 'recoil';
import { gruopNameState } from '../state/groupName';
import { useState } from 'react';
import { InputTags } from 'react-bootstrap-tagsinput';
import { groupMemberState } from '../state/groupMembers';
import styled from 'styled-components';

export const AddMemebers = () => {
   const [groupMembers, setGroupMembers] = useRecoilState(groupMemberState);
   const groupName = useRecoilValue(gruopNameState);
   const [validated, setValidated] = useState(false);

   const handleSubmit = event => {
      event.preventDefault();
      setValidated(true);
   };

   const header = `${groupName}グループに属する人の名前をすべて書いてください `;

   return (
      <CenteredOverlayForm title={header} validated={validated} handleSubmit={handleSubmit}>
         <InputTags placeholder="名前の間取り" onTags={value => setGroupMembers(value.values)} />
         {validated && groupMembers.length === 0 && (
            <StyledErrorMessage>グループメンバーの名前を入力してください。</StyledErrorMessage>
         )}
      </CenteredOverlayForm>
   );
};

const StyledErrorMessage = styled.span`
   color: red;
`;
