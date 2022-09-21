import { getSession, useSession } from "next-auth/react";
import React, {
  Component,
  ElementRef,
  PropsWithChildren,
  ReactComponentElement,
  useEffect,
  useState,
} from "react";
import Header from "../Header";

const LayoutApplication: React.FC<PropsWithChildren> = ({ children }) => {
  const { data: session } = useSession();

  const [changeColor, setChangeColor] = useState(false);

  useEffect(() => {
    function positionScroll() {
      if (window.scrollY > 20) {
        setChangeColor(true);
      } else {
        setChangeColor(false);
      }
    }

    window.addEventListener("scroll", positionScroll);
  }, []);

  return (
    <>
      <Header
        changeColor={changeColor}
        // image={session?.user?.image}
        // name={session?.user?.name}
      />
      <div
        className={`w-full lg:min-h-[calc(100vh-79px)] min-h-[calc(100vh-79px)] pt-3 pb-6  bg-tertiary-800 lg:w-[calc(100%-250px)] px-3 lg:absolute lg:right-0 `}
      >
        {children}
      </div>
    </>
  );
};

export default LayoutApplication;
