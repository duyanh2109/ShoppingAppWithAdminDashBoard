import NavBar from "@/components/NavBar";
import prismadb from "@/lib/prisma-db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
export default async function DashBoardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  const { userId } = auth();
  if (!userId) {
    return redirect("/sign-in");
  }
  const store = await prismadb.store.findFirst({
    where: { id: params.storeId, userId },
  });
  if (!store) return redirect("/");
  return (
    <>
      <NavBar />
      {children}
    </>
  );
}
