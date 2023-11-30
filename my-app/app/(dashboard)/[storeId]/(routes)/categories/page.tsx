import React from "react";
import { CategoryClient } from "./components/client";
import prismadb from "@/lib/prisma-db";
import { CategoryColumn } from "./components/columns";
import { format } from "date-fns";
const CategoriesPage = async ({ params }: { params: { storeId: string } }) => {
  const categories = await prismadb.category.findMany({
    where: { storeId: params.storeId },
    include: { billboard: true },
    orderBy: { createdAt: "desc" },
  });
  const formatedCategories: CategoryColumn[] = categories.map((item) => ({
    id: item.id,
    name: item.name,
    billboardLabel: item.billboard.label,
    createdAt: format(item.createdAt, "MMMM do, yyyy , HH:mm:ss"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 pt-6 p-8">
        <CategoryClient data={formatedCategories} />
      </div>
    </div>
  );
};

export default CategoriesPage;
