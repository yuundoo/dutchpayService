import { useRecoilValue } from 'recoil';
import { expenseState } from '../state/expenses';
import { groupMemberState } from '../state/groupMembers';
import { StyledTitle } from './AddExpenseForm';
import styled from 'styled-components';
import { useRef } from 'react';
import { toPng } from 'html-to-image';
import { Download } from 'react-bootstrap-icons';
import { Button } from 'react-bootstrap';
export const calculateMinimumTransaction = (expenses, members, amountPerPerson) => {
   const minTransactions = [];
   if (!expenses || !members || !amountPerPerson || amountPerPerson === 0) {
      return minTransactions;
   }

   const membersToPay = {};
   members.forEach(member => {
      membersToPay[member] = amountPerPerson;
   });

   expenses.forEach(({ payer, amount }) => {
      membersToPay[payer] -= amount;
   });

   const sortedMembersToPay = Object.keys(membersToPay)
      .map(member => ({ member: member, amount: membersToPay[member] }))
      .sort((a, b) => a.amount - b.amount);

   var left = 0;
   var right = sortedMembersToPay.length - 1;
   while (left < right) {
      while (left < right && sortedMembersToPay[left].amount === 0) {
         left++;
      }
      while (left < right && sortedMembersToPay[right].amount === 0) {
         right--;
      }

      const toReceive = sortedMembersToPay[left];
      const toSend = sortedMembersToPay[right];
      const amountToReceive = Math.abs(toReceive.amount);
      const amountToSend = Math.abs(toSend.amount);

      if (amountToSend > amountToReceive) {
         minTransactions.push({
            receiver: toReceive.member,
            sender: toSend.member,
            amount: amountToReceive,
         });
         toReceive.amount = 0;
         toSend.amount -= amountToReceive;
         left++;
      } else {
         minTransactions.push({
            receiver: toReceive.member,
            sender: toSend.member,
            amount: amountToSend,
         });
         toSend.amount = 0;
         toReceive.amount += amountToSend;
         right--;
      }
   }

   return minTransactions;
};
export const SettlementSummary = () => {
   const expenses = useRecoilValue(expenseState);
   const members = useRecoilValue(groupMemberState);
   const totalExpenseAmount = expenses.reduce((prevAmount, curExpense) => prevAmount + Number(curExpense.amount), 0);
   const groupMembersCount = members.length;
   const splitAmount = totalExpenseAmount / groupMembersCount;
   const minimumTransaction = calculateMinimumTransaction(expenses, members, splitAmount);

   const wrapperElement = useRef(null);

   const exportToImage = () => {
      if (wrapperElement.current === null) {
         return;
      }

      toPng(wrapperElement.current, {
         filter: node => node.tagName !== 'BUTTON',
      })
         .then(dataURL => {
            const link = document.createElement('a');
            link.download = 'settlement-summary.png';
            link.href = dataURL;

            link.click();
         })
         .catch(err => {
            console.error(err);
         });
   };

   return (
      <StyledWrapper>
         <StyledTitle>2. 정산은 이렇게!</StyledTitle>
         {totalExpenseAmount > 0 && groupMembersCount > 0 && (
            <div>
               <StyledSummary>
                  <span>
                     {groupMembersCount} 명이서 총 {totalExpenseAmount}원 지출
                  </span>
               </StyledSummary>
               <br />
               <span>한 사람 당{splitAmount} 원</span>
               <StyledUl>
                  {minimumTransaction.map(({ sender, receiver, amount }, index) => (
                     <li key={`transaction${index}`}>
                        <span>
                           {sender} 가 {receiver} 에게 {amount} 를 보내기.
                        </span>
                     </li>
                  ))}
               </StyledUl>
               <StyledButton data-testid="btn-download" onClick={exportToImage}>
                  <Download />
               </StyledButton>
            </div>
         )}
      </StyledWrapper>
   );
};

const StyledWrapper = styled.div`
   padding: 50px;
   background-color: #683ba1;
   color: white;
   box-shadow: 3px 0px 4px rgba(0, 0, 0, 0.25);
   border-radius: 15px;
   text-align: center;
   font-size: 22px;
`;

const StyledUl = styled.ul`
   margin-top: 31px;
   font-weight: 400;
   line-height: 48px;

   list-style: disclosure-closed;
   li::marker {
      animation: blinker 1.5s infinite;
   }

   @keyframes blinker {
      50% {
         opacity: 0;
      }
   }
`;

const StyledSummary = styled.div`
   margin-top: 31px;
`;

const StyledButton = styled(Button)`
   background: none;
   border: none;
   font-size: 25px;
   position: absolute;
   bottom: 15px;
   right: 15px;

   &:hover,
   &:active {
      background: none;
      color: #683ba1;
   }
`;
