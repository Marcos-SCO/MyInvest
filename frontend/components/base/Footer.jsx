import React from 'react';

import Link from "next/link";

// import DisplaySvg from 'app/helpers/svg/DisplaySvg';

export default function Footer() {
  const baseUrl = process.env.FRONT_END_BASE_URL;
  
  const date = new Date();
  const currentYear = date.getFullYear();

  const yearPresentation = currentYear > 2023
    ? `2023 - ${currentYear} ` : `${currentYear} `;

  return (
    <>
      <footer className="mainFooter shadow dark:bg-gray-800">

        <address className="main-container w-full mx-auto max-w-screen-xl py-4 md:flex md:items-center md:justify-between max-md:justify-center">
          <Link href={'https://github.com/KauaCazeS/MyInvest'} title="MyInvest" target="_blank">
            <div className='logoFooterContainer flex flex-wrap items-center'>
              {/* <DisplaySvg name="myInvestLogo" class="myInvestLogo md:mr-4" width="80" height="80" /> */}
              <span className="sm:text-center dark:text-gray-400">© {yearPresentation} MyInvest™. Tudo nosso!</span>
            </div>
          </Link>

          <ul className="ulLinks flex flex-wrap items-center mt-3 font-medium dark:text-gray-400 sm:mt-0">
            <Link href={`${baseUrl}/#top-acoes`}>
              Top ações
            </Link>
            <Link href={`${baseUrl}/#top-fiis`}>
              Top fiis
            </Link>
            <Link href={`https://github.com/KauaCazeS/MyInvest`} target='_blank' className="hover:underline">
              Contato
            </Link>
          </ul>
        </address>

      </footer>

    </>

  )
}


