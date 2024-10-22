import Image from "next/image";
import type { Metadata } from "next";
import "./globals.css";
import Topbar from "@/components/ui/Topbar";
import Sidebar from "@/components/ui/Sidebar";


export default function Home() {
  return (
   <div className="bg-[#f6f7f9] flex h-screen overflow-x-hidden overflow-y-auto">
    <Sidebar />
    <main className="flex-1 flex flex-col">
    <div className="relative flex flex-col">
              <Topbar />
              <div className="px-4 py-6 max-sm:px-4"></div>
              </div>
    </main>
   </div>
  );
}
