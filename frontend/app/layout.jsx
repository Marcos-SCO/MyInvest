import Header from 'components/base/Header';
import Footer from 'components/base/Footer';

// Styles
import './css/sass/main.scss';
import './css/globals.css';

// Toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Inter } from 'next/font/google';

import { NextAuthSessionProvider } from './providers/sessionProvider';

import { UrlChangeListener } from './hooks/UrlChangeListener';
import ChangePageAttributes from "app/hooks/ChangePageAttributes";
import ProgressBar from 'components/page/ProgressBar';

import { nextAuthOptions } from './api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { getUserSessionData } from './helpers/session/getUserSessionData';

import { ModalProvider } from 'app/providers/modalProviders';

import SearchModalContainer from "components/modal/SearchModalContainer";
import SearchBar from "../components/searchBar/SearchBar.jsx";

import ModalContainer from '../components/modal/ModalContainer';

import AuthButtonsTemplate from '../components/page/AuthButtonsTemplate';

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
      {children}
      <Footer childrenSegment={childrenSegment} />
    </>
  )
}

function renderChildren(children) {
  return (<main>{children}</main>)
}

function dontShowNavbarIn(page) {
  const exceptions = ['signIn', 'signUp'];
  return exceptions.includes(page);
}

function activateContainerModals(userId) {
  return <>
    {!userId && <ModalContainer modalId={'authContainer'} modalTitle="Faça login ou crie uma conta" className="authButtons-modal">
      <AuthButtonsTemplate templateTitle="É necessário ter uma conta para acessar a funcionalidade" />
    </ModalContainer>}
  </>
}

export default async function RootLayout({ children }) {

  const session = await getServerSession(nextAuthOptions);
  const { userId } = await getUserSessionData(session);

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
            <ToastContainer />
            {activateContainerModals(userId)}
            {
              !dontShowNavbarIn(childrenSegment)
                ? renderChildrenWithHeader(children)
                : renderChildren(children)
            }
          </ModalProvider>
        </NextAuthSessionProvider>
      </body>
    </html >
  )
}
