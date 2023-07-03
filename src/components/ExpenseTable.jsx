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
         <StyledTable data-testid="expenseList" borderless hover responsive>
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
                     <th>{formatAmount(amount)}원</th>
                  </tr>
               ))}
            </StyledBody>
         </StyledTable>
      </OverlayWrapper>
   );
};

const StyledTable = styled(Table)`
   min-width: 450px;
   @media screen and (max-width: 600px) {
      min-width: 300px;
   }
`;

const StyledThead = styled.thead`
   color: #6b3da6;
   text-align: center;
   font-weight: 700;
   font-size: 20px;
   line-height: 25px;
   th {
      padding: 15px 8px;
      min-width: 60px;
   }
   @media screen and (max-width: 600px) {
      font-size: 4vw;
      line-height: 10px;
      th {
         padding: 10px 4px;
      }
   }
`;

const StyledBody = styled.tbody`
   td {
      font-weight: 400;
      font-size: 20px;
      line-height: 50px;
      text-align: center;

      @media screen and (max-width: 600px) {
         font-size: 4vw;
         line-height: 20px;
      }
   }
`;
