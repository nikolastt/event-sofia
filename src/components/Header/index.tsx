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
        className={`w-full ease-in-out duration-300 fixed z-10 top-0 h-[79px] px-3 bg-tertiary-800  lg:w-[calc(100%-250px)]  lg:right-0 ${
          !changeColor &&
          "bg-gradient-to-b from-black/70 via-black/60 to-transparent"
        }  flex px-6 xl:px-0 ${
          changeColor && "bg-primary-500 shadow rounded-b-xl "
        } `}
      >
        <div className="flex items-center justify-center w-full lg:justify-center">
          <Link href="/" passHref>
            <div className="relative w-[50px] h-[50px] cursor-pointer">
              <Image src={logo} alt="Logo" layout="fill" priority />
            </div>
          </Link>

          <GiHamburgerMenu
            color="white"
            size={25}
            className={` cursor-pointer absolute right-3 lg:hidden`}
            onClick={handleMenu}
          />
        </div>
      </header>
    </>
  );
};

export default Header;
