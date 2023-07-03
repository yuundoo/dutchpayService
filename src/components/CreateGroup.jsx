import { CenteredOverlayForm } from './CenteredOverlayForm';
import { Row, Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { useSetRecoilState } from 'recoil';
import { groupNameState } from '../state/groupName';
import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
export const CreateGruop = () => {
   const setGruopName = useSetRecoilState(groupNameState);
   const [validateGroupName, setValidGroupName] = useState(false);
   const [validated, setValidated] = useState(false);
   const navigate = useNavigate();
   const handleSubmit = event => {
      event.preventDefault();
      const form = event.currentTarget;
      if (form.checkValidity()) {
         setValidGroupName(true);
         navigate('/members');
      } else {
         event.stopPropagation();
         setValidGroupName(false);
      }
      setValidated(true);
   };

   return (
      <CenteredOverlayForm
         title="먼저, 더치 페이 할 그룹의 이름을 정해볼까요?"
         validated={validated}
         handleSubmit={handleSubmit}
      >
         <Form.Group controlId="validateGroupName">
            <Form.Control
               type="text"
               required
               placeholder="2023 제주도 여행"
               onChange={e => setGruopName(e.target.value)}
            />
            <Form.Control.Feedback type="invalid" data-valid={validateGroupName}>
               그룹 이름을 입력해 주세요.
            </Form.Control.Feedback>
         </Form.Group>
      </CenteredOverlayForm>
   );
};

export const StyledSubmitButton = styled(Button).attrs({
   type: 'submit',
})`
   background: #6610f2;
   border-radius: 8px;
   border: none;
   width: 139px;

   &:hover {
      background: #6610f2;
      filter: brightness(80%);
   }
`;

export const StyledRow = styled(Row)`
   min-height: 60vh;
   justify-content: center;
   align-items: center;

   @media (max-width: 768px) {
      height: auto;
      padding: 20px;
   }
`;

export const StyledTitle = styled.h2`
   font-weight: 600;
   line-height: 35px;
   overflow-wrap: break-word;
   word-break: keep-all;

   @media (max-width: 768px) {
      font-size: 18px;
   }
`;
