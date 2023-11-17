import Navbar from 'components/Navbar';

// Styles
import './css/sass/main.scss';
import './css/globals.css';

import { Inter } from 'next/font/google';
import { NextAuthSessionProvider } from './providers/sessionProvider';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'MyInvest',
  description: 'Plataforma para monitoramento de oscilações em renda variável',
}

function renderChildrenWithNavBar(children, containerClasses = 'max-w-6xl mx-auto') {
  return (<div className={containerClasses}>
    <Navbar />
    {children}
  </div>
  )
}

function renderChildren(children) {
  return (<>{children}</>)
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
          {
            dontShowNavNavBarIn(childrenSegment)
              ? renderChildren(children)
              : renderChildrenWithNavBar(children)
          }
        </NextAuthSessionProvider>
      </body>
    </html>
  )
}
