"use client";

import { icons } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    {
      id: 1,
      name: "Products",
      href: "/Products",
      icons: icons.Box,
    },
    {
      id: 2,
      name: "Shops",
      href: "/Shops",
      icons: icons.ShoppingCart,
    },
  ];

  return (
    <div className="flex flex-col w-72 bg-white border-r">
      <div className="p-6 border-b">
        <Link href="/">
          <span className="text-[#00457C]">Duka</span>
          <span className="text-[#0079C1] bold-text">Langu</span>
        </Link>
      </div>

      <nav className="flex-grow">
        <ul className="space-y-1 py-4">
          {navItems.map((link) => {
            const isActive =
              pathname === link.href ||
              pathname.includes(link.href) ||
              (pathname === "/" && link.href === "/") ||
              pathname.includes(link.name.toLowerCase());

            return (
              <li
                key={link.id}
                className={`w-full flex flex-col gap-y-1 ${
                  isActive
                    ? "bold-text bg-primary text-white"
                    : "text-xs light-text"
                }`}
              ></li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
