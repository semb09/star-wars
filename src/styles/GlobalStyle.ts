import { createGlobalStyle } from 'styled-components';

import type { ThemeType } from './theme';

const GlobalStyle = createGlobalStyle<{ theme: ThemeType }>`
  * {
    box-sizing: border-box;
  }

  html, #root {
    height: 100%;
  }

  body {
    background: radial-gradient(${({ theme }) => theme.colors.background}, ${({ theme }) => theme.colors.backgroundSecondary});
    color: ${({ theme }) => theme.colors.bodyText};
    font-family: ${({ theme }) => theme.fonts.body};
    height: 100%;
    line-height: 1.5;
    margin: 0;
  }

  .ReactVirtualized__List::-webkit-scrollbar {
    display: none;
  }

  .ReactVirtualized__List {
    -ms-overflow-style: none !important;
    scrollbar-width: none !important;
  }

  .ReactVirtualized__Grid__innerScrollContainer {
    margin-bottom: 50px;
  }
`;

export default GlobalStyle;
