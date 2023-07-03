import { Container, Row, Col } from 'react-bootstrap';
import { AddExpenseForm } from './AddExpenseForm';
import { SettlementSummary } from './SettlementSummary';
import { ExpenseTable } from './ExpenseTable';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { groupNameState } from '../state/groupName';
import { ServiceLogo } from './shared/ServiceLogo';
export const ExpenseMain = () => {
   return (
      <Container fluid>
         <Row>
            <Col xs={12} sm={5} md={4}>
               <Leftpane />
            </Col>
            <Col>
               <Rightpane />
            </Col>
         </Row>
      </Container>
   );
};

const Leftpane = () => (
   <Container>
      <StyledRow>
         <Row>
            <ServiceLogo />
         </Row>
         <Row>
            <AddExpenseForm />
         </Row>
         <Row>
            <SettlementSummary />
         </Row>
      </StyledRow>
   </Container>
);

const Rightpane = () => {
   const groupName = useRecoilValue(groupNameState);

   return (
      <StyledRightPaneWrapper>
         <Row>
            <StyledGroupName>{groupName || '그룹 이름'}</StyledGroupName>
         </Row>
         <Row>
            <ExpenseTable />
         </Row>
      </StyledRightPaneWrapper>
   );
};

const StyledRightPaneWrapper = styled(Container)`
   padding: 5vh 2vw 2vh 2vw;

   @media screen and (max-width: 600px) {
      padding: 50px 25px;
   }
`;

const StyledGroupName = styled.h2`
   margin-bottom: 6vh;
   font-weight: 700;
   font-size: 40px;
   line-height: 40px;
   text-align: center;
   @media screen and (max-width: 600px) {
      font-size: 9vw;
      margin-bottom: 30px;
   }
`;

const StyledRow = styled(Row)`
   gap: 3vh;
   padding-top: 4vh;
   justify-content: center;

   @media screen and (max-width: 600px) {
      padding-top: 30px;
   }
`;
