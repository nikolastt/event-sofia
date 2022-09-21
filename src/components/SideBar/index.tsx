import Image from "next/image";
import React, { useEffect, useState } from "react";
import { AiFillHome } from "react-icons/ai";
import { ImQrcode } from "react-icons/im";
import { BiExit } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import ItemMenuSideBar from "../ItemMenuSideBar";
import { useRouter } from "next/router";
import { AiOutlineClose } from "react-icons/ai";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { signIn } from "next-auth/react";

interface ISideBar {
  isOpen?: boolean;
  closeMenu: () => void;
}

const SideBar: React.FC<ISideBar> = ({ isOpen, closeMenu }) => {
  const [menuIsOpen, setMenuIsOpen] = useState(isOpen);

  const { data: session, status } = useSession();

  const router = useRouter();
  const path = router.pathname.split("/")[1];

  useEffect(() => {
    setMenuIsOpen(isOpen);
  }, [isOpen]);

  return (
    <>
      <div
        className={`min-h-screen fixed  right-0 bottom-0 top-0 w-[250px] ${
          menuIsOpen ? "mr-0 " : "-mr-[250px]"
        }   bg-gray-800/50 backdrop-blur-md ease-in-out duration-300 pt-[79px] border-l-[1px] border-l-tertiary-800 lg:fixed lg:left-0 z-20 rounded-l-xl`}
      >
        <AiOutlineClose
          size={25}
          color="white"
          className={`fixed right-3 top-[27px] cursor-pointer
           ${!menuIsOpen && "hidden"}`}
          onClick={closeMenu}
          strokeWidth={40}
        />

        {status === "authenticated" ? (
          <>
            <div className="flex pl-3 mt-6 items-center">
              <div className="min-w-[75px] h-[75px] bg-primary-500  rounded-full flex justify-center items-center">
                <div className="min-w-[65px] h-[65px] relative rounded-full  overflow-hidden">
                  {session?.user?.image && (
                    <Image
                      src={session.user.image}
                      alt="User Avatar"
                      layout="fill"
                      priority
                    />
                  )}
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-white pl-3   flex flex-col flex-wrap">
                  {status === "authenticated" && "Olá,"}
                  <br />
                  <span className="font-bold">{session?.user?.name}</span>
                </span>
              </div>
            </div>
          </>
        ) : (
          <button
            onClick={() => signIn("google")}
            className="py-2 flex justify-between px-6 bg-white rounded-md w-3/4 shadow-lg shadow-white/50"
          >
            Login com <FcGoogle size={25} />
          </button>
        )}

        <hr className="w-[80%] mx-auto mt-12  " />

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
            active={path === "qrcode" ? true : false}
            href="/qrcode"
            closeMenu={closeMenu}
          >
            <ImQrcode size={25} className="mx-3" />
          </ItemMenuSideBar>

          {status === "authenticated" && (
            <div
              className={`flex items-center text-white py-2 rounded-lg hover:bg-[#305714]  cursor-pointer `}
              onClick={() => {
                closeMenu;
                signOut();
              }}
            >
              <BiExit size={25} className="mx-3" />
              <span>Sair</span>
            </div>
          )}
        </div>
      </div>

      {/* Deixar a página embaçada com o menu aberto. */}
      {/* <div
        className={` ${
          !menuIsOpen && "hidden"
        } fixed left-0 bottom-0 min-w-[calc(100%)] backdrop-blur-sm h-full ease-out duration-300 z-10`}
        onClick={closeMenu}
      ></div> */}
    </>
  );
};

export default SideBar;
