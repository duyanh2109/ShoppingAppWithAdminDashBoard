import React from "react";
import { SizeClient } from "./components/client";
import prismadb from "@/lib/prisma-db";
import { SizeColumn } from "./components/columns";
import { format } from "date-fns";
const SizesPage = async ({ params }: { params: { storeId: string } }) => {
  const sizes = await prismadb.size.findMany({
    where: { storeId: params.storeId },
    orderBy: { createdAt: "desc" },
  });
  const formatedSizes: SizeColumn[] = sizes.map((item) => ({
    id: item.id,
    name: item.name,
    value:item.value,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 pt-6 p-8">
        <SizeClient data={formatedSizes} />
      </div>
    </div>
  );
};

export default SizesPage;
