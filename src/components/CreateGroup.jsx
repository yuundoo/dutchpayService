import { CenteredOverlayForm } from './CenteredOverlayForm';
import { Row, Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { useSetRecoilState } from 'recoil';
import { gruopNameState } from '../state/groupName';
import { useState } from 'react';
import styled from 'styled-components';
export const CreateGruop = () => {
   const setGruopName = useSetRecoilState(gruopNameState);
   const [validateGroupName, setValidGroupName] = useState(false);
   const [validated, setValidated] = useState(false);

   const handleSubmit = event => {
      event.preventDefault();
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
         setValidGroupName(true);
      } else {
         event.stopPropagation();
         setValidGroupName(false);
      }
      setValidated(true);
   };

   return (
      <CenteredOverlayForm
         title="まず、ダッチペイするグループの名前を決めてみましょう？"
         validated={validated}
         handleSubmit={handleSubmit}
      >
         <Form.Group controlId="validateGroupName">
            <Form.Control
               type="text"
               required
               placeholder="2022済州島旅行"
               onChange={e => setGruopName(e.target.value)}
            />
            <Form.Control.Feedback type="invalid" data-valid={validateGroupName}>
               グループ名を入力してください。
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
   height: 60vh;
   justify-content: center;
   align-items: center;
`;

export const StyledTitle = styled.h2`
   font-weight: 600;
   line-height: 35px;
   overflow-wrap: break-word;
   word-break: keep-all;
`;
