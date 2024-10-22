import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, BadgeCheck, LogOut } from "lucide-react";
import Link from "next/link";
import React from "react";


const Topbar = () => {
    return (

        <div className="bg-white w-full sticky top-0 left-0 shadow z-30">
      <div className="w-full flex justify-between items-center px-4 py-4">
        <div className="flex flex-col max-sm:hidden">
          <h1 className="semibold-text text-xl flex gap-3 items-center">
            Duka Langu
            <BadgeCheck size={20} className="text-primary" />
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/settings"><User size={20} className="text-gray-600" /></Link>
          <Link href="/logout"><LogOut size={18} className="text-gray-600" /></Link>
        </div>

        <div className="hidden max-sm:flex">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage
                  src="https://unsplash.com/photos/man-wearing-black-shirt-aoEwuEH7YAs"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>Help</DropdownMenuItem>
              <DropdownMenuItem>
                <button>Log Out</button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
    );
};

export default Topbar;