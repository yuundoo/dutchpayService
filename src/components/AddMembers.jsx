import { CenteredOverlayForm } from './CenteredOverlayForm';
import { useRecoilState, useRecoilValue } from 'recoil';
import { groupNameState } from '../state/groupName';
import { useState } from 'react';
import { groupMemberState } from '../state/groupMembers';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../routes';
import { WithContext as TagInput } from 'react-tag-input'; // Importing 'react-tag-input'

export const AddMembers = () => {
   const [groupMembers, setGroupMembers] = useRecoilState(groupMemberState);
   const groupName = useRecoilValue(groupNameState);
   const [validated, setValidated] = useState(false);
   const navigate = useNavigate();

   const handleSubmit = event => {
      event.preventDefault();
      setValidated(true);
      if (groupMembers.length > 0) {
         navigate(ROUTES.EXPENSE_MAIN);
      }
   };

   const header = `${groupName}グループに属する人の名前をすべて書いてください `;

   // handling tag addition
   const handleAddition = tag => {
      setGroupMembers([...groupMembers, tag.text]);
   };

   // handling tag deletion
   const handleDelete = i => {
      const newTags = groupMembers.filter((tag, index) => index !== i);
      setGroupMembers(newTags);
   };

   // convert groupMembers to suitable format for react-tag-input
   const tags = groupMembers.map((member, index) => ({ id: `${index}`, text: member }));

   return (
      <CenteredOverlayForm title={header} validated={validated} handleSubmit={handleSubmit}>
         <TagInput tags={tags} handleDelete={handleDelete} handleAddition={handleAddition} placeholder="名前の間取り" />
         {validated && groupMembers.length === 0 && (
            <StyledErrorMessage>グループメンバーの名前を入力してください。</StyledErrorMessage>
         )}
      </CenteredOverlayForm>
   );
};

const StyledErrorMessage = styled.span`
   color: red;
`;
