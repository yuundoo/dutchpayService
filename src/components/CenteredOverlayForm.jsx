import { Container, Row, Form } from 'react-bootstrap';
import styled from 'styled-components';
import { OverlayWrapper } from './shared/OverlayWrapper';
import { StyledRow, StyledTitle, StyledSubmitButton } from './CreateGroup';
import { ServiceLogo } from './shared/ServiceLogo';
export const CenteredOverlayForm = ({ children, title, validated, handleSubmit }) => {
   return (
      <CentralizedContainer>
         <ServiceLogo />
         <OverlayWrapper>
            <Container>
               <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  <StyledRow>
                     <Row className="align-items-center">
                        <StyledTitle>{title}</StyledTitle>
                     </Row>
                     <Row className="align-items-center">{children}</Row>
                     <Row className="align-items-center">
                        <Container className="text-center">
                           <StyledSubmitButton>저장</StyledSubmitButton>
                        </Container>
                     </Row>
                  </StyledRow>
               </Form>
            </Container>
         </OverlayWrapper>
      </CentralizedContainer>
   );
};

const CentralizedContainer = styled(Container)`
   width: 50vw;
   @media (max-width: 500px) {
      width: 80vw;
   }
   min-height: 100vh;

   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   padding: 0px;
   gap: 10px;
`;
