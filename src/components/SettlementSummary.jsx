import { useRecoilValue } from 'recoil';
import { expenseState } from '../state/expenses';
import { groupMemberState } from '../state/groupMembers';

export const SettlementSummary = () => {
   const expenses = useRecoilValue(expenseState);
   const members = useRecoilValue(groupMemberState);
   const totalExpenseAmount = expenses.reduce((prevAmount, curExpense) => prevAmount + curExpense.amount, 0);
   const groupMembersCount = members.length;
   const splitAmount = totalExpenseAmount / groupMembersCount;

   const minTransaction = [
      {
         //todo : 핵심 로직 구현
         receiver: '영수',
         sender: '영희',
         amount: '15000',
      },
   ];
   return (
      <div>
         <h3>2. 정산은 이렇게!</h3>
         {totalExpenseAmount > 0 && groupMembersCount > 0 && (
            <div>
               <span>
                  {groupMembersCount}명이서 {totalExpenseAmount} 얼마 지출
               </span>
               <br />
               <span>한 사람 당{splitAmount} 원</span>
               <ul>
                  {minTransaction.map(({ sender, receiver, amount }, index) => (
                     <li key={`transaction${index}`}>
                        <span>
                           {sender} 가 {receiver} 에게 {amount} 를 보내기.
                        </span>
                     </li>
                  ))}
               </ul>
            </div>
         )}
      </div>
   );
};
