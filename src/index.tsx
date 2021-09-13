import { StrictMode } from 'react';
import ReactDOM from 'react-dom';

import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import { GlobalStyle, theme } from 'styles';

import Main from 'Main';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const rootElement = document.getElementById('root');
ReactDOM.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <>
          <GlobalStyle />
          <Router>
            <Main />
          </Router>
        </>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
  rootElement,
);
