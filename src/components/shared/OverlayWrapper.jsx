import styled from 'styled-components';

export const OverlayWrapper = ({ children, padding, minHeight }) => {
   return (
      <StyledContainer padding={padding} minHeight={minHeight}>
         {children}
      </StyledContainer>
   );
};

const StyledContainer = styled.div`
   padding: ${props => props.padding || '5vw'};
   background-color: white;
   filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
   border-radius: 15px;
   min-height: ${props => props.minHeight || '0'};
`;
