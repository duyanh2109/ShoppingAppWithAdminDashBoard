"use client";

import Heading from "@/components/UI/Heading";
import { Button } from "@/components/UI/button";
import { Separator } from "@/components/UI/separator";
import { Product } from "@prisma/client";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { ProductColumn, columns } from "./columns";
import { DataTable } from "@/components/UI/data-table";
import ApiList from "@/components/UI/api-list";
interface productClientProps {
  data: ProductColumn[];
}
export const ProductClient: React.FC<productClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Product (${data.length})`}
          description="Manage Products for your store"
        />
        <Button
          onClick={() => {
            router.push(`/${params.storeId}/products/new`);
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" data={data} columns={columns}/>
      <Heading title="API" description="Api call for products"/>
      <Separator />
      <ApiList entityIdName="productId" entityName="products"/>
    </>
  );
};
