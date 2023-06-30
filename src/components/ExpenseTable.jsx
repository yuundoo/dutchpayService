import { useRecoilValue } from 'recoil';
import { expenseState } from '../state/expenses';
import { Table } from 'react-bootstrap';
import { OverlayWrapper } from './shared/OverlayWrapper';
import styled from 'styled-components';

export const ExpenseTable = () => {
   const expenses = useRecoilValue(expenseState);

   const formatAmount = amount => {
      return amount.toLocaleString();
   };

   return (
      <OverlayWrapper minHeight={'73vh'}>
         <Table data-testid="expenseList" borderless hover responsive>
            <StyledThead>
               <tr>
                  <th>날짜</th>
                  <th>내용</th>
                  <th>결제자</th>
                  <th>금액</th>
               </tr>
            </StyledThead>
            <StyledBody>
               {expenses.map(({ date, desc, amount, payer }) => (
                  <tr>
                     <th>{date}</th>
                     <th>{desc}</th>
                     <th>{payer}</th>
                     <th>{formatAmount(amount)}</th>
                  </tr>
               ))}
            </StyledBody>
         </Table>
      </OverlayWrapper>
   );
};

const StyledThead = styled.thead`
   color: #6b3da6;
   text-align: center;
   font-weight: 700;
   font-size: 24px;
   line-height: 29px;
   th {
      padding: 20px 8px;
   }
`;

const StyledBody = styled.tbody`
   text-align: center;
   td {
      font-weight: 400;
      font-size: 24px;
      line-height: 59px;
   }
`;
