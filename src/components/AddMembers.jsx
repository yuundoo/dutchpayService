import { CenteredOverlayForm } from './CenteredOverlayForm';
import { useRecoilState, useRecoilValue } from 'recoil';
import { groupNameState } from '../state/groupName';
import { useState, useEffect } from 'react';
import { groupMemberState } from '../state/groupMembers';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../routes';
import { InputTags } from 'react-bootstrap-tagsinput';
import { Form } from 'react-bootstrap';

export const AddMembers = () => {
   const [groupMembers, setGroupMembers] = useRecoilState(groupMemberState);
   const groupName = useRecoilValue(groupNameState);
   const [validated, setValidated] = useState(false);
   const [groupMembersString, setGroupMembersString] = useState('');
   const navigate = useNavigate();
   const [alertShown, setAlertShown] = useState(false);

   const handleSubmit = event => {
      event.preventDefault();
      setValidated(true);
      if (groupMembers.length > 0) {
         navigate(ROUTES.EXPENSE_MAIN);
      } else if (isSamsungIntenet() && groupMembersString.length > 0) {
         // 1. 태그가 동작하지 않았던가
         setGroupMembers(groupMembersString.split(','));
      } else {
         //2. 유저가 아무런 멤버를 입력하지 않았을때
      }
   };

   useEffect(() => {
      if (!alertShown && isSamsungIntenet()) {
         setAlertShown(true);
      }
   }, [alertShown]);

   const isSamsungIntenet = () => {
      return window.navigator.userAgent.includes('SAMSUNG');
   };

   const header = `${groupName}그룹에 속한 사람들의 이름을 모두 적어 주세요. `;

   return (
      <CenteredOverlayForm title={header} validated={validated} handleSubmit={handleSubmit}>
         {isSamsungIntenet() ? (
            <Form.Control
               placeholder="이름간 ,"
               onChange={event => setGroupMembersString(event.target.value)}
            ></Form.Control>
         ) : (
            <InputTags
               values={groupMembers}
               data-testid="input-member-names"
               placeholder="이름 간 띄어 쓰기"
               onTags={value => setGroupMembers(value.values)}
            />
         )}

         {validated && groupMembers.length === 0 && (
            <StyledErrorMessage>그룹 멤버들의 이름을 입력해 주세요.</StyledErrorMessage>
         )}
      </CenteredOverlayForm>
   );
};

const StyledErrorMessage = styled.span`
   color: red;
`;
