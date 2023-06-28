import { Container, Row, Form } from 'react-bootstrap';
import styled from 'styled-components';
import { OverlayWrapper } from './shared/OverlayWrapper';
import { StyledRow, StyledTitle, StyledSubmitButton } from './CreateGroup';

export const CenteredOverlayForm = ({ children, title, validated, handleSubmit }) => {
   return (
      <CentralizedContainer>
         <StyledLogo>Dutch Pay</StyledLogo>
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
                           <StyledSubmitButton>保存</StyledSubmitButton>
                        </Container>
                     </Row>
                  </StyledRow>
               </Form>
            </Container>
         </OverlayWrapper>
      </CentralizedContainer>
   );
};

const StyledLogo = styled.h1`
   font-weight: 200;
   letter-spacing: 10px;
   color: slateblue;
   text-align: center;
   margin-bottom: 0.8em;
`;

const CentralizedContainer = styled(Container)`
   width: 50vw;
   min-height: 100vh;
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   padding: 0px;
   gap: 10px;
`;
