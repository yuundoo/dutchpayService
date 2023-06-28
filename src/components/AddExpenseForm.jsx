import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { groupMemberState } from '../state/groupMembers';
import { expenseState } from '../state/expenses';
export const AddExpenseForm = () => {
   const members = useRecoilValue(groupMemberState);
   const [validated, setValidated] = useState(false);
   const today = new Date();
   const [date, setDate] = useState([today.getFullYear(), today.getMonth() + 1, today.getDate()].join('-'));
   const [desc, setDesc] = useState('');
   const [amount, setAmount] = useState(0);
   const [payer, setPayer] = useState(null);

   const setExpense = useSetRecoilState(expenseState);

   const handleSubmit = event => {
      event.preventDefault();
      const form = event.currentTarget;
      if (form.checkValidity()) {
         const newExpense = {
            date,
            desc,
            amount,
            payer,
         };
         setExpense(expense => [...expense, newExpense]);
      }
      setValidated(true);
   };
   return (
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
         <h3>1.비용 추가하기</h3>
         <Form.Group>
            <Form.Control
               type="date"
               name="expenseDate"
               placeholder="결제할 날짜를 입력해 주세요"
               value={date}
               onChange={e => setDate(e.target.value)}
            />
         </Form.Group>
         <Form.Group>
            <Form.Control
               type="text"
               required
               name="expenseDiscription"
               placeholder="비용에 대한 설명을 입력해주세요"
               value={desc}
               onChange={e => setDesc(e.target.value)}
            />
            <Form.Control.Feedback type="invalide">비용 내용을 입력해 주셔야 합니다.</Form.Control.Feedback>
         </Form.Group>
         <Form.Group>
            <Form.Control
               type="number"
               required
               name="expenseAmount"
               placeholder="비용은 얼마였나요?"
               value={amount}
               onChange={e => setAmount(e.target.value)}
            />
         </Form.Group>
         <Form.Control.Feedback type="invalide">금액을 입력해 주셔야 합니다.</Form.Control.Feedback>
         <Form.Group>
            <Form.Select required name="expensePayer" defaultValue="" onChange={e => setPayer(e.target.value)}>
               <option value="" disabled>
                  선택해주세요
               </option>
               {members.map(member => (
                  <option key={member} value={member}>
                     {member}
                  </option>
               ))}
            </Form.Select>
            <Form.Control.Feedback type="invalide">결제자를 선택해 주셔야 합니다.</Form.Control.Feedback>
            <Button type="submit">추가하기</Button>
         </Form.Group>
      </Form>
   );
};
