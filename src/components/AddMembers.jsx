import { CenteredOverlayForm } from './CenteredOverlayForm';
import { useRecoilState, useRecoilValue } from 'recoil';
import { groupNameState } from '../state/groupName';
import { useState } from 'react';
import { groupMemberState } from '../state/groupMembers';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../routes';
import { InputTags } from 'react-bootstrap-tagsinput';
import { API } from 'aws-amplify';
import { groupIdState } from '../state/groupId';

export const AddMembers = () => {
   const [groupMembers, setGroupMembers] = useRecoilState(groupMemberState);
   const guid = useRecoilValue(groupIdState);
   const groupName = useRecoilValue(groupNameState);
   const [validated, setValidated] = useState(false);
   const navigate = useNavigate();

   const saveGroupsMember = () => {
      API.put('groupsApi', `/groups/${guid}/members`, {
         body: {
            members: groupMembers,
         },
      })
         .then(_response => {
            navigate(ROUTES.EXPENSE_MAIN);
         })
         .catch(({ response }) => {
            alert(response);
         });
   };

   const handleSubmit = event => {
      event.preventDefault();
      setValidated(true);
      if (groupMembers.length > 0) {
         navigate(ROUTES.EXPENSE_MAIN);
         saveGroupsMember();
      }
   };

   const header = `${groupName}グループに属する人の名前をすべて書いてください `;

   return (
      <CenteredOverlayForm title={header} validated={validated} handleSubmit={handleSubmit}>
         <InputTags
            values={groupMembers}
            data-testid="input-member-names"
            placeholder="名前の間取り"
            onTags={value => setGroupMembers(value.values)}
         />

         {validated && groupMembers.length === 0 && (
            <StyledErrorMessage>グループメンバーの名前を入力してください。</StyledErrorMessage>
         )}
      </CenteredOverlayForm>
   );
};

const StyledErrorMessage = styled.span`
   color: red;
`;
