import { CenteredOverlayForm } from './CenteredOverlayForm';
import { Container, Row, Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { useRecoilState } from 'recoil';
import { gruopNameState } from '../state/groupName';
import { useState } from 'react';
import styled from 'styled-components';
export const CreateGruop = () => {
   const [groupName, setGruopName] = useRecoilState(gruopNameState);
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
      <CenteredOverlayForm>
         <Container>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
               <StyledRow>
                  <Row className="align-items-start">
                     <StyledH2>먼저, 더치 페이 할 그룹의 이름을 정해볼까요?</StyledH2>
                  </Row>
                  <Row className="align-items-center">
                     <Form.Group controlId="validateGroupName">
                        <Form.Control
                           type="text"
                           required
                           placeholder="2022 제주도 여행"
                           onChange={e => setGruopName(e.target.value)}
                        />
                        <Form.Control.Feedback type="invalid" data-valid={validateGroupName}>
                           그룹 이름을 입력해 주세요.
                        </Form.Control.Feedback>
                     </Form.Group>
                  </Row>
                  <Row className="align-items-end">
                     <StyledSubmitButton>저장</StyledSubmitButton>
                  </Row>
               </StyledRow>
            </Form>
         </Container>
      </CenteredOverlayForm>
   );
};

const StyledSubmitButton = styled(Button).attrs({
   type: 'submit',
})`
   background: #6610f2;
   border-radius: 8px;
   border: none;

   &:hover {
      background: #6610f2;
      filter: brightness(80%);
   }
`;

const StyledRow = styled(Row)`
   height: 60vh;
   justify-content: center;
   align-items: center;
`;

const StyledH2 = styled.h2`
   font-weight: 600;
   line-height: 35px;
   text-align: center;
   overflow-wrap: break-word;
   word-break: keep-all;
`;
