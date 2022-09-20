import { signIn } from "next-auth/react";
import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";

import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";

import logo from "../../../public/images/logoGeaan.png";
import SideBar from "../SideBar";

interface IHeader {
  changeColor: boolean;
}

const Header: React.FC<IHeader> = ({ changeColor }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <SideBar isOpen={menuOpen} closeMenu={handleMenu} />

      <header
        className={`w-full ease-in-out duration-300 fixed z-10 top-0 backdrop-blur-3xl h-[79px] px-3 bg-tertiary-800  lg:w-[calc(100%-250px)] lg:ml-auto ${
          !changeColor &&
          "bg-gradient-to-b from-black/70 via-black/60 to-transparent"
        }  flex px-6 xl:px-0 ${
          changeColor && "bg-primary-500 shadow rounded-b-2xl "
        } `}
      >
        <div className="flex items-center justify-between w-full lg:justify-center">
          <Link href="/" passHref>
            <div className="relative w-[50px] h-[50px] cursor-pointer">
              <Image src={logo} alt="Logo" layout="fill" priority />
            </div>
          </Link>

          <GiHamburgerMenu
            color="white"
            size={25}
            className={` cursor-pointer  lg:hidden`}
            onClick={handleMenu}
          />
        </div>

        <SideBar isOpen={menuOpen} closeMenu={handleMenu} />
      </header>
    </>
  );
};

export default Header;
