import styled from 'styled-components';

const StyledFooter = styled.footer`
  //   padding: 1rem;
  text-align: center;
`;

const CopyrightText = styled.p`
  font-size: 12px; /* 크기 조정 */
  color: #888; /* 색상 변경 */
`;

export default function Footer() {
  return (
    <StyledFooter>
      <aside>
        <CopyrightText>
          <p>Copyright © 2024 - All right reserved by Net Ninjas</p>
        </CopyrightText>
      </aside>
    </StyledFooter>
  );
}
