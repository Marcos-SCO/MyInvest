'use client';

import React from 'react';
// import Link from 'next/link';

import { signIn, signOut, useSession } from "next-auth/react";

import { Navbar, NavbarMenu, NavbarMenuItem, NavbarMenuToggle, NavbarBrand, NavbarContent, NavbarItem, Link, Input, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar, Button } from "@nextui-org/react";

import useWindowDimensions from 'app/hooks/UseWindowDimensions';

import DisplaySvg from '../../app/helpers/svg/DisplaySvg';

const baseUrl = process.env.FRONT_END_BASE_URL;

export default function UserDropDown({ ...props }) {
  const { userSessionData } = props;

  const { name, email, firstName, userId, image = false } = userSessionData;

  const sessionHasToken = userSessionData?.token;

  // const dimensions = useWindowDimensions();

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  function navBarContent() {
    return (
      <>
        <NavbarContent justify="start" as="div">
          <NavbarContent className="navLinksContent gap-3" as="div">
            <NavbarItem>
              <Link href="#">
                Features
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link href="#">
                Customers
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link href="#">
                Integrations
              </Link>
            </NavbarItem>

            {(!sessionHasToken) && (
              <>
                <NavbarItem>
                  <Link href={`${baseUrl}/signIn`}>
                    Login
                  </Link>
                </NavbarItem>

                <NavbarItem>
                  <Link href={`${baseUrl}/signUp`} className="bg-slate-900 text-white p-3 rounded-md">
                    Criar conta
                  </Link>
                </NavbarItem>
              </>
            )}

          </NavbarContent>
        </NavbarContent>

        <NavbarContent as="div" className="user-header-container items-center" justify="end">

          {(sessionHasToken) &&
            <Dropdown placement="bottom-end">

              <DropdownTrigger>
                <div className='my-account-button-container flex items-center'>
                  <span className=''>Minha conta</span>
                  {image
                    ? (<Avatar isBordered as="button" className="no-shadow transition-transform credential-button" color="secondary" name={name} size="sm" src={image} />)
                    : (<button className="no-shadow credential-button flex relative justify-center items-center box-border overflow-hidden align-middle outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 w-8 h-8 text-tiny bg-secondary text-secondary-foreground rounded-full ring-2 ring-offset-2 ring-offset-background dark:ring-offset-background-dark ring-secondary z-10 aria-expanded:scale-[0.97] aria-expanded:opacity-70 subpixel-antialiased transition-transform">
                      <DisplaySvg name="userAvatar" width="32" height="32" />
                    </button>)}
                </div>
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
                  <Link className="danger" color="danger" onClick={() => signOut()}>Sair</Link>
                </DropdownItem>

              </DropdownMenu>
            </Dropdown>}

        </NavbarContent>

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

      {/* <Navbar fluid rounded>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Navbar.Link href="#">
            Home
          </Navbar.Link>

          <Navbar.Link href="#">Services</Navbar.Link>
          <Navbar.Link href="#">Pricing</Navbar.Link>
          <Navbar.Link href="#">Contact</Navbar.Link>

          {(!sessionHasToken) &&
            <div className="flex md:order-2">
              <Button>Get started</Button>
            </div>}

          {(sessionHasToken) &&
            <Dropdown label={userAvatar} data-user-id={userId} inline>
              <Dropdown.Item>
                <Link href={`${baseUrl}/admin`}>
                  {name}
                </Link>
              </Dropdown.Item>
              <Dropdown.Item>{email}</Dropdown.Item>
              <Dropdown.Item onClick={() => signOut()}>Sair</Dropdown.Item>
            </Dropdown>}

        </Navbar.Collapse>
      </Navbar> */}
    </>
  )
}
