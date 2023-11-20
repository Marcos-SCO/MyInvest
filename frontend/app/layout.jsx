import Header from 'components/base/Header';

// Styles
import './css/sass/main.scss';
import './css/globals.css';

import { Inter } from 'next/font/google';
import { NextAuthSessionProvider } from './providers/sessionProvider';

import { UrlChangeListener } from './hooks/UrlChangeListener';

import ProgressBar from 'components/page/ProgressBar';

import SearchBar from "components/searchBar/layout";

import { ModalProvider } from 'app/providers/modalProviders';

import SearchModalContainer from "components/modal/SearchModalContainer";

import ChangePageAttributes from "app/hooks/ChangePageAttributes";

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'MyInvest',
  description: 'Plataforma para monitoramento de oscilações em renda variável',
}

function renderChildrenWithHeader(children) {
  const childrenSegment = children?.props.childProp?.segment;

  return (
    <>
      <ProgressBar />
      <Header childrenSegment={childrenSegment} />

      <SearchModalContainer modalId="search-bar">
        <SearchBar />
      </SearchModalContainer>

      <main className={`max-w-6xl mx-auto px-5`}>
        {children}
      </main>
    </>
  )
}

function renderChildren(children) {
  return (<main>{children}</main>)
}

function dontShowNavNavBarIn(page) {
  const exceptions = ['signIn', 'signUp'];
  return exceptions.includes(page);
}

export default function RootLayout({ children }) {

  const childrenSegment = children?.props.childProp?.segment;

  const pageProps =
    children.props?.__NEXT_DATA__?.props?.pageProps;

  return (
    <html lang="pt-br">
      <body className={`${inter.className} page-${childrenSegment}`} data-page={childrenSegment}>
        <NextAuthSessionProvider>
          <ChangePageAttributes pageName={childrenSegment} />
          <ModalProvider>
            <UrlChangeListener />
            {
              dontShowNavNavBarIn(childrenSegment)
                ? renderChildren(children)
                : renderChildrenWithHeader(children)
            }
          </ModalProvider>
        </NextAuthSessionProvider>
      </body>
    </html>
  )
}
