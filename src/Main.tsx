import { Switch, Route } from 'react-router-dom';
import styled from 'styled-components';

import { ListPage } from 'pages';
import { Header } from 'components';

import StarJedi from 'assets/fonts/star_jedi.woff';
import StarJedi2 from 'assets/fonts/star_jedi.woff2';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
`;

const StyledMain = styled.main`
  display: flex;
  flex: 1;
`;

const fonts = `
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap');
  @font-face {
    font-family: 'Star Jedi';
    src: url(${StarJedi}) format('woff2'),
         url(${StarJedi2}) format('woff');
  }
`;

const Main = () => (
  <>
    <style>
      {fonts}
    </style>
    <Container>
      <Header />
      <StyledMain>
        <Switch>
          <Route path="/">
            <ListPage />
          </Route>
        </Switch>
      </StyledMain>
    </Container>
  </>
);

export default Main;
