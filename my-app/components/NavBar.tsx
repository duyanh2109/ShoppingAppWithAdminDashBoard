import { UserButton, auth } from "@clerk/nextjs";
import React from "react";
import MainNav from "./MainNav";
import StoreSwitcher from "./StoreSwitcher";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prisma-db";

const NavBar = async () => {
  const { userId } = auth();
  if (!userId) return redirect("/sign-in");
  const stores = await prismadb.store.findMany({ where: { userId } });
  return (
    <div className="border-b">
      <div className="flex items-center h-16 px-4">
        <StoreSwitcher items={stores} />
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
