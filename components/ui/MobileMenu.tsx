"use client";

import { useRouter } from "next/navigation";

interface ListItemProps {
  id: string;
  title: string;
  href: string;
}
interface ListItemsProps {
  items: ListItemProps[];
}

const MobileMenu = ({ items }: ListItemsProps) => {
  const router = useRouter();

  return (
    <ul className="p-4">
      {items.map((item: any) => {
        return (
          <li
            key={item.id}
            className="hover:bg-white text-2xl hover:text-blue-400 hover:cursor-pointer p-4 rounded w-[340px]"
            onClick={() => router.push(item.href)}>
            <p className="border-b">{item.title}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default MobileMenu;
