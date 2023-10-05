"use client";

import { useState } from "react";
import SideMenu from "../ui/SideMenu";
import MobileMenu from "../ui/MobileMenu";

interface Props {
  children: React.ReactNode;
}

export default function Container({ children }: Props) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const listItems = [
    { id: "option1", title: "Option 1", href: "/auth/login" },
    { id: "option2", title: "Option 2", href: "/auth/register" },
  ];

  return (
    <div className="min-h-screen min-w-screen grid grid-cols-12">
      <div className="hidden col-span-12 md:col-span-4 lg:col-span-3 md:flex flex-col">
        <p className="text-3xl p-8 bg-blue-400 text-white text-center">Dashboard</p>
        <SideMenu items={listItems} />
      </div>

      <div className="bg-blue-400 w-screen h-16 justify-between items-center flex sm:hidden absolute text-white">
        <p className="px-4">Dashboard</p>
        <p
          className="px-4"
          onClick={() => {
            setIsMobileMenuOpen(!isMobileMenuOpen);
          }}>
          menu
        </p>
      </div>
      {isMobileMenuOpen ? (
        <div className="absolute bg-gray-100 w-[80%] m-0 p-0 h-screen flex sm:hidden shadow-xl">
          <MobileMenu items={listItems} />
        </div>
      ) : null}

      <div className="col-span-12 md:col-span-8 lg:col-span-9 shadow-xl mt-20 lg:mt-0">
        {children}
      </div>
    </div>
  );
}
