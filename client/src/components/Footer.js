import styled from 'styled-components';

const StyledFooter = styled.footer`
  padding: 1rem;
  text-align: center;
`;

export default function Footer() {
  return (
    <StyledFooter>
      <aside>
        <p>Copyright © 2024 - All right reserved by Net Ninjas</p>
      </aside>
    </StyledFooter>
  );
}
