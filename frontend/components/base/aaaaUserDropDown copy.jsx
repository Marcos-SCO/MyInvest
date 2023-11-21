'use client';

import React from 'react';
import Link from 'next/link';

import { Dropdown } from "flowbite-react";
import { Navbar, Button, Avatar, Sidebar } from 'flowbite-react';

import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser } from 'react-icons/hi';

import { signIn, signOut, useSession } from "next-auth/react";

import useWindowDimensions from 'app/hooks/UseWindowDimensions';
import DisplaySvg from '../../app/helpers/svg/DisplaySvg';

const baseUrl = process.env.FRONT_END_BASE_URL;

export default function UserDropDown({ ...props }) {
  const { userSessionData } = props;

  const { name, email, firstName, userId, image = false } = userSessionData;

  const sessionHasToken = userSessionData?.token;

  const dimensions = useWindowDimensions();

  // console.log(userSessionData);

  function displayAvatar(image) {
    const avatar = image
      ? (<Avatar alt="User settings" img={image} rounded />)
      : (<DisplaySvg name="userAvatar" />)

    return (
      <>
        {avatar} <p className='ml-1.5'>{firstName}</p>
      </>
    );
  }

  const userAvatar = displayAvatar(image);

  return (
    <>
 <Sidebar aria-label="Sidebar with multi-level dropdown example">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="#" icon={HiChartPie}>
            Dashboard
          </Sidebar.Item>
          <Sidebar.Collapse icon={HiShoppingBag} label="E-commerce">
            <Sidebar.Item href="#">Products</Sidebar.Item>
            <Sidebar.Item href="#">Sales</Sidebar.Item>
            <Sidebar.Item href="#">Refunds</Sidebar.Item>
            <Sidebar.Item href="#">Shipping</Sidebar.Item>
          </Sidebar.Collapse>
          <Sidebar.Item href="#" icon={HiInbox}>
            Inbox
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiUser}>
            Users
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiShoppingBag}>
            Products
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiArrowSmRight}>
            Sign In
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiTable}>
            Sign Up
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>



      <Navbar fluid rounded>
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
      </Navbar>
    </>
  )
}
