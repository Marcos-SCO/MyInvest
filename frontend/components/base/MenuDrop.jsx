'use client';

import React, { useEffect, useRef } from 'react';

import { signIn, signOut, useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";

import { Navbar, NavbarMenu, NavbarMenuItem, NavbarMenuToggle, NavbarBrand, NavbarContent, NavbarItem, Link, Input, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar, Button } from "@nextui-org/react";

import DisplaySvg from '../../app/helpers/svg/DisplaySvg';

const baseUrl = process.env.FRONT_END_BASE_URL;

export default function MenuDrop({ ...props }) {
  const { userSessionData } = props;

  const { name, email, firstName, userId, image = false } = userSessionData;

  const sessionHasToken = userSessionData?.token;

  async function logout() {
    await signOut({
      redirect: false
    })

    window.location.href = baseUrl;
  }

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const closeMenuOnOutsideClick = (event) => {
      const currentReference = dropdownRef.current;

      const isUserClickInMenu =
        currentReference && !currentReference.contains(event.target);

      if (!isUserClickInMenu) return;

      setIsMenuOpen(false);
    };

    const handleDocumentClick = (event) => {
      closeMenuOnOutsideClick(event);
    };

    // Attach the event listener when the component mounts
    document.addEventListener('click', handleDocumentClick);

    // Detach the event listener when the component unmounts
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  function navBarContent() {
    return (
      <>
        <NavbarContent justify="start" as="div">
          <NavbarContent className="navLinksContent gap-3" as="div">
            <NavbarItem>
              <Link href={`${baseUrl}/#top-acoes`}>
                Top ações
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link href={`${baseUrl}/#top-fiis`}>
                Top fiis
              </Link>
            </NavbarItem>

            {(!sessionHasToken) && (
              <>
                <NavbarContent className='flex lg:ml-2 header-buttons-container'>
                  <NavbarItem className='li-button'>
                    <Link href={`${baseUrl}/signIn`} className='menu-button transparent'>
                      Login
                    </Link>
                  </NavbarItem>

                  <NavbarItem className='li-button'>
                    <Link href={`${baseUrl}/signUp`} className="menu-button">
                      Criar conta
                    </Link>
                  </NavbarItem>
                </NavbarContent>
              </>
            )}

          </NavbarContent>
        </NavbarContent>

        {(sessionHasToken) &&
          <NavbarContent as="div" className="user-header-container items-center" justify="start">

            <Dropdown placement="bottom-start">

              <DropdownTrigger>
                <li className='my-account-button-container flex items-center'>
                  <span className='button-text'>Minha conta</span>
                  {image
                    ? <Avatar isBordered as="button" className="no-shadow transition-transform credential-button" color="secondary" name={name} size="sm" src={image} />
                    : <button className="no-shadow credential-button flex relative justify-center items-center box-border overflow-hidden align-middle outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 w-8 h-8 text-tiny bg-secondary text-secondary-foreground rounded-full ring-2 ring-offset-2 ring-offset-background dark:ring-offset-background-dark ring-secondary z-10 aria-expanded:scale-[0.97] aria-expanded:opacity-70 subpixel-antialiased transition-transform">
                      <DisplaySvg name="userAvatar" width="32" height="32" />
                    </button>}
                </li>
              </DropdownTrigger>

              <DropdownMenu aria-label="Profile Actions" variant="flat" className="header-profile-actions">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <Link href={`${baseUrl}/admin`} className="profile-login">
                    <p className="font-semibold">Logado com</p>
                    <p className="font-semibold">{email}</p>
                  </Link>
                </DropdownItem>

                <DropdownItem key="assets">
                  <Link className="danger" href={`${baseUrl}/user/assets`}>Meus Ativos</Link>
                </DropdownItem>

                <DropdownItem key="alerts">
                  <Link className="danger" href={`${baseUrl}/user/alerts`}>Meus Alertas</Link>
                </DropdownItem>

                <DropdownItem key="logout">
                  <Link className="danger" color="danger" onClick={logout}>Sair</Link>
                </DropdownItem>

              </DropdownMenu>
            </Dropdown>

          </NavbarContent>}

      </>)
  }

  return (
    <>
      <Navbar className="main-nav-content main-nav-inner-container"
        isBordered
        isMenuOpen={isMenuOpen}
        isBlurred={false}
        onMenuOpenChange={setIsMenuOpen}
        as="div"
        ref={dropdownRef}
      >
        <NavbarContent as="div" className="nav-bar-content lg:hidden" justify="start">
          <NavbarMenuToggle className="hamburger-menu" aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
        </NavbarContent>

        <NavbarContent as="div" className="content-header hidden lg:flex gap-4">
          {navBarContent()}
        </NavbarContent>

        <NavbarMenu as="div" className="nav-mobile-container">
          {navBarContent()}
        </NavbarMenu>

      </Navbar>
    </>
  )
}
