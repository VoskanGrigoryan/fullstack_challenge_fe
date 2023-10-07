"use client";

import { ComponentProps } from "react";
import { useRouter } from "next/navigation";

interface ListItemProps {
  id: string;
  title: string;
  href: string;
}
interface ListItemsProps {
  items: ListItemProps[];
}

const SideMenu = ({ items }: ListItemsProps) => {
  const router = useRouter();

  return (
    <ul className="p-4">
      {items.map((item: any) => {
        return (
          <li
            key={item.id}
            className="hover:bg-blue-400 hover:text-white hover:cursor-pointer p-2 rounded"
            onClick={() => router.push(item.href)}
          >
            {item.title}
          </li>
        );
      })}
    </ul>
  );
};

export default SideMenu;
