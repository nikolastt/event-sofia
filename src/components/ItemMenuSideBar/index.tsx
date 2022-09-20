import Link from "next/link";
import React, { Children } from "react";

interface IItemMenuSideBar {
  content?: string;
  children?: React.ReactNode;
  href: string;
  closeMenu: () => void;
  active?: boolean;
}

const ItemMenuSideBar: React.FC<IItemMenuSideBar> = ({
  content,
  children,
  href,
  closeMenu,
  active,
}) => {
  return (
    <Link href={href} passHref>
      <div
        className={`flex items-center text-white ${
          active && "bg-[#305714]"
        }  py-2 rounded-lg hover:bg-[#305714]  cursor-pointer `}
        onClick={closeMenu}
      >
        {children}

        <span>{content}</span>
      </div>
    </Link>
  );
};

export default ItemMenuSideBar;
