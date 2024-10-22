import type { Metadata } from "next";
import Sidebar from "@/components/ui/Sidebar";
import Topbar from "@/components/ui/Topbar";


export const metadata: Metadata = {
  title: "Duka Langu",
  description: "Your online Shop Manager",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="bg-[#f6f7f9] flex h-screen overflow-x-hidden overflow-y-auto">
          <Sidebar />
          <main className="relative w-full h-screen overflow-y-scroll">
            <div className="relative flex flex-col">
              <Topbar />
              <div className="px-4 py-6 max-sm:px-4">{children}</div>
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
