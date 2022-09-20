import Image from "next/image";
import React, { useEffect, useState } from "react";
import { AiFillHome } from "react-icons/ai";
import ItemMenuSideBar from "../ItemMenuSideBar";
import { useRouter } from "next/router";
import { AiOutlineClose } from "react-icons/ai";

interface ISideBar {
  isOpen?: boolean;
  name?: string | undefined | null;
  image?: string | undefined | null;
  closeMenu: () => void;
}

const SideBar: React.FC<ISideBar> = ({ isOpen, name, image, closeMenu }) => {
  const [menuIsOpen, setMenuIsOpen] = useState(isOpen);

  const router = useRouter();
  const path = router.pathname.split("/")[1];

  console.log(path);

  useEffect(() => {
    setMenuIsOpen(isOpen);
  }, [isOpen]);

  return (
    <>
      <div
        className={`min-h-screen fixed  right-0 bottom-0 top-0 w-[250px] ${
          menuIsOpen ? "mr-0 " : "-mr-[250px]"
        }   bg-primary-500 ease-in-out duration-300 pt-[79px] border-l-[1px] border-l-tertiary-800 lg:fixed lg:left-0 z-20 rounded-l-3xl`}
      >
        <AiOutlineClose
          size={25}
          color="white"
          className={`fixed right-3 top-[27px] cursor-pointer
           ${!menuIsOpen && "hidden"}`}
          onClick={closeMenu}
          strokeWidth={40}
        />

        <div className="flex justify-center mt-3">
          <div className="w-[150px] h-[150px] relative rounded-full overflow-hidden">
            {image && (
              <Image src={image} alt="User Avatar" layout="fill" priority />
            )}
          </div>
        </div>

        <span className="text-white text-2xl flex justify-center mt-6">
          Olá, {name}
        </span>

        <div className="space-y-2 mt-12">
          <ItemMenuSideBar
            content="Home"
            active={path === "" ? true : false}
            href="/"
            closeMenu={closeMenu}
          >
            <AiFillHome size={25} className="mx-3" />
          </ItemMenuSideBar>

          <ItemMenuSideBar
            content="QRcode"
            active={path === "/qrcode" ? true : false}
            href="/qrcode"
            closeMenu={closeMenu}
          >
            <AiFillHome size={25} className="mx-3" />
          </ItemMenuSideBar>
        </div>
      </div>

      {/* Deixar a página embaçada com o menu aberto. */}
      <div
        className={` ${
          !menuIsOpen && "hidden"
        } fixed left-0 bottom-0 min-w-[calc(100%)] backdrop-blur-sm h-full ease-out duration-300 z-10`}
        onClick={closeMenu}
      ></div>
    </>
  );
};

export default SideBar;
