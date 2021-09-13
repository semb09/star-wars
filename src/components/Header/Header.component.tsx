import styled from 'styled-components';

const StyledHeader = styled.header`
  padding: 50px 20px 30px;
  text-align: center;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.title};
  font-size: 70px;
  line-height: 1;
  margin: 0;
`;

const SubTitle = styled.span`
  color: ${({ theme }) => theme.colors.bodyText};
  display: block;
  font-family: ${({ theme }) => theme.fonts.body};
  font-weight: bold;
  font-size: 24px;
  margin-top: 20px;
  text-transform: uppercase;
  letter-spacing: 5px;
`;

const Header = () => (
  <StyledHeader>
    <Title>
      Star Wars
      <SubTitle>
        Characters
      </SubTitle>
    </Title>
  </StyledHeader>
);

export default Header;
