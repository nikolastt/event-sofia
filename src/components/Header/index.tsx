import Image from "next/image";
import React from "react";

// import { Container } from './styles';
import logo from "../../../public/images/logoGeaan.png";

interface IHeader {
  changeColor: boolean;
}

const Header: React.FC<IHeader> = ({ changeColor }) => {
  return (
    <div
      className={`w-full ease-in-out duration-300 fixed top-0 z-20 backdrop-blur-3xl h-[79px] ${
        !changeColor &&
        "bg-gradient-to-b from-black/70 via-black/60 to-transparent"
      }  flex px-6 xl:px-0 ${
        changeColor && "bg-primary-500 shadow rounded-b-2xl  "
      } `}
    >
      <div className="flex w-full max-w-[760px] mx-auto items-center lg:container">
        <div className="relative w-[50px] h-[50px]">
          <Image src={logo} alt="Logo" layout="fill" />
        </div>

        <div className=" h-[35px] mx-3 border-l-2 border-white"></div>
        <h2 className="text-white text-xl">Jean Eventos</h2>

        <button className="ml-auto text-white py-1 px-12 border-2 border-white flex justify-center items-center rounded-full">
          LOGIN
        </button>
      </div>
    </div>
  );
};

export default Header;
