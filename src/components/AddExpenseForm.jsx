import { useState } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { groupMemberState } from '../state/groupMembers';
import { expenseState } from '../state/expenses';
import styled from 'styled-components';
export const AddExpenseForm = () => {
   const members = useRecoilValue(groupMemberState);
   const [validated, setValidated] = useState(false);
   const today = new Date();
   const [date, setDate] = useState([today.getFullYear(), today.getMonth() + 1, today.getDate()].join('-'));
   const [desc, setDesc] = useState('');
   const [amount, setAmount] = useState(0);
   const [payer, setPayer] = useState(null);
   const [isDescValid, setIsDescValid] = useState(false);
   const [isPayerValid, setIsPayerValid] = useState(false);
   const [isAmountValid, setIsAmountValid] = useState(false);

   const setExpense = useSetRecoilState(expenseState);

   const checkFormValidity = () => {
      const descValid = desc.length > 0;
      const payerValid = payer !== null;
      const amountValid = amount > 0;
      setIsDescValid(descValid);
      setIsAmountValid(amountValid);
      setIsPayerValid(payerValid);
      return descValid && payerValid && amountValid;
   };

   const handleSubmit = event => {
      event.preventDefault();
      if (checkFormValidity()) {
         const newExpense = {
            date,
            desc,
            amount,
            payer,
         };
         setExpense(expense => [...expense, newExpense]);
         setDate(`${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日`);
         setDesc('');
         setAmount(0);
         setPayer(null);
      }
      setValidated(true);
   };
   return (
      <StyledWrapper>
         <Form noValidate onSubmit={handleSubmit}>
            <StyledTitle>1.費用を追加する</StyledTitle>
            <Row>
               <Col xs={12}>
                  <Form.Group>
                     <Form.Control
                        type="date"
                        placeholder="결제할 날짜를 입력해 주세요"
                        value={date}
                        onChange={e => setDate(e.target.value)}
                     />
                  </Form.Group>
               </Col>
            </Row>
            <Row>
               <Col xs={12}>
                  <Form.Group>
                     <Form.Control
                        type="text"
                        isValid={isDescValid}
                        isInvalid={!isDescValid && validated}
                        placeholder="費用の説明を入力してください"
                        value={desc}
                        onChange={e => setDesc(e.target.value)}
                     />
                     <Form.Control.Feedback type="invalid" data-valid={isDescValid}>
                        費用の内容を入力してください
                     </Form.Control.Feedback>
                  </Form.Group>
               </Col>
            </Row>
            <Row>
               <Col xs={12} lg={6}>
                  <Form.Group>
                     <Form.Control
                        type="number"
                        isValid={isAmountValid}
                        isInvalid={!isAmountValid && validated}
                        placeholder="비용은 얼마였나요?"
                        value={amount}
                        onChange={e => setAmount(e.target.value)}
                     />
                     <Form.Control.Feedback type="invalid" data-valid={isAmountValid}>
                        1円以上の金額を入力してください。
                     </Form.Control.Feedback>
                  </Form.Group>
               </Col>
               <Col xs={12} lg={6}>
                  <Form.Group>
                     <Form.Select
                        required
                        isValid={isPayerValid}
                        isInvalid={!isPayerValid && validated}
                        defaultValue=""
                        onChange={e => setPayer(e.target.value)}
                     >
                        <option value="" disabled>
                           選択してください
                        </option>
                        {members.map(member => (
                           <option key={member} value={member}>
                              {member}
                           </option>
                        ))}
                     </Form.Select>
                     <Form.Control.Feedback type="invalid" data-valid={isPayerValid}>
                        決済者を選択していただく必要があります。
                     </Form.Control.Feedback>
                  </Form.Group>
               </Col>
            </Row>
            <Row>
               <Col xs={12} className="d-grid gap-2">
                  <StyledSubmitButton>追加する</StyledSubmitButton>
               </Col>
            </Row>
         </Form>
      </StyledWrapper>
   );
};

const StyledSubmitButton = styled(Button).attrs({
   type: 'submit',
})`
   height: 60px;
   border-radius: 8px;
   border: 0px;
   background-color: #e2d9f3;
   color: #59359a;
   padding: 16px 32px;
   margin-top: 10px;

   &:hover,
   &:focus {
      background-color: #e2d9f3;
      filter: brightness(85%);
   }
`;

const StyledWrapper = styled.div`
   padding: 50px;
   background-color: #683ba1;
   box-shadow: 3px 0px 4px rgba(0, 0, 0, 0.25);
   border-radius: 15px;

   input,
   select {
      background-color: #59359a;
      box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
      border-radius: 8px;
      border: 0px;
      color: #f8f9fa;
      margin-bottom: 15px;
      height: 45px;
      &:focus {
         color: #f8f9fa;
         background-color: #59359a;
         filter: brightness(80%);
      }
      ::placeholder {
         color: #f8f9fa;
      }
   }
`;

const StyledTitle = styled.h3`
   color: #fffbfb;
   text-align: center;
   font-weight: 700;
   font-size: 40px;
   line-height: 48px;
   letter-spacing: 0.25px;
   margin-bottom: 15px;
`;
