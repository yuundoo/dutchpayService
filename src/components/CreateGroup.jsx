import { CenteredOverlayForm } from './CenteredOverlayForm';
import { Container, Row, Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { useRecoilState } from 'recoil';
import { gruopNameState } from '../state/groupName';
import { useState } from 'react';
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
      <div>
         <h1>Dutch Pay</h1>
         <Container>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
               <Row>
                  <h2>먼저, 더치 페이 할 그룹의 이름을 정해볼까요?</h2>
               </Row>
               <Row>
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
               <Row>
                  <Button type="submit">저장</Button>
               </Row>
            </Form>
         </Container>
      </div>
   );
};
