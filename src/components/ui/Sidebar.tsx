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
          <span className="text-gray-800 text-lg font-medium">Duka</span>
          <span className="text-gray-600 text-lg bold-text">Langu</span>
        </Link>
      </div>

      <nav className="flex-grow">
        <ul className="space-y-1 py-4">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              pathname.includes(item.href) ||
              (pathname === "/" && item.href === "/") ||
              pathname.includes(item.name.toLowerCase());

            return (
              <li
              key={item.id}
              className={`w-full flex items-center gap-x-3 p-4 rounded-lg transition-colors duration-200 ${
                isActive
                  ? "bg-gray-600 text-white"  // Active background color
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
            >
              {/* Render the icon */}
              <item.icons className="w-6 h-6" /> 
              {/* Render the link */}
              <Link href={item.href} className="text-lg font-medium"> 
                {item.name}
              </Link>
            </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
