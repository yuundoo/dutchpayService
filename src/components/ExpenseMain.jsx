import { Container, Row, Col } from 'react-bootstrap';
import { AddExpenseForm } from './AddExpenseForm';
import { SettlementSummary } from './SettlementSummary';
import { ExpenseTable } from './ExpenseTable';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { gruopNameState } from '../state/groupName';
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
      <Row>
         <ServiceLogo />
      </Row>
      <Row>
         <AddExpenseForm />
      </Row>
      <Row>
         <SettlementSummary />
      </Row>
   </Container>
);

const Rightpane = () => {
   const groupName = useRecoilValue(gruopNameState);

   return (
      <StyledContainer>
         <Row>
            <StyledGroupName>{groupName || '그룹 이름'}</StyledGroupName>
         </Row>
         <Row>
            <ExpenseTable />
         </Row>
      </StyledContainer>
   );
};

const StyledContainer = styled(Container)`
   padding: 100px 31px 100px 31px;
`;

const StyledGroupName = styled.h2`
   margin-bottom: 80px;
   font-weight: 700;
   text-align: center;
   font-size: 40px;
   line-height: 40px;
`;
