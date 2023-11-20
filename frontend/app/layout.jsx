import Header from 'components/base/Header';

// Styles
import './css/sass/main.scss';
import './css/globals.css';

import { Inter } from 'next/font/google';
import { NextAuthSessionProvider } from './providers/sessionProvider';

import SearchBar from "components/searchBar/layout";

import { ModalProvider } from 'app/providers/modalProviders';

import SearchModalContainer from "components/modal/SearchModalContainer";

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'MyInvest',
  description: 'Plataforma para monitoramento de oscilações em renda variável',
}

function renderChildrenWithHeader(children) {
  const childrenSegment = children?.props.childProp?.segment;

  return (
    <>
      <Header childrenSegment={childrenSegment} />

      {/* <button data-micromodal-trigger="modal-1">Open Modal</button> */}

      {/* <Modal searchBar={SearchBar} /> */}

      <SearchModalContainer modalId="search-bar">
        <SearchBar />
      </SearchModalContainer>

      <main className={`max-w-6xl mx-auto`}>
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

  return (
    <html lang="pt-br">
      <body className={`${inter.className} page-${childrenSegment}`} data-page={childrenSegment}>
        <NextAuthSessionProvider>
          <ModalProvider>
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
