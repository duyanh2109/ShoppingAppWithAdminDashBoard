import React from "react";
import { BillBoardClient } from "./components/client";
import prismadb from "@/lib/prisma-db";
import { BillboardColumn } from "./components/columns";
import { format } from "date-fns";
const BillBoardsPage = async ({ params }: { params: { storeId: string } }) => {
  const billboards = await prismadb.billboard.findMany({
    where: { storeId: params.storeId },
    orderBy: { createdAt: "desc" },
  });
  const formatedBillboards: BillboardColumn[] = billboards.map((item) => ({
    id: item.id,
    label: item.label,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));
  
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 pt-6 p-8">
        <BillBoardClient data={formatedBillboards} />
      </div>
    </div>
  );
};

export default BillBoardsPage;
