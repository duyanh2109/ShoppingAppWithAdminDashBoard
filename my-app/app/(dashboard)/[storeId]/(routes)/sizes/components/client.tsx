"use client";

import Heading from "@/components/UI/Heading";
import { Button } from "@/components/UI/button";
import { Separator } from "@/components/UI/separator";
import { Billboard } from "@prisma/client";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { SizeColumn, columns } from "./columns";
import { DataTable } from "@/components/UI/data-table";
import ApiList from "@/components/UI/api-list";
interface sizeClientProps {
  data: SizeColumn[];
}
export const SizeClient: React.FC<sizeClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Sizes (${data.length})`}
          description="Manage Sizes for your store"
        />
        <Button
          onClick={() => {
            router.push(`/${params.storeId}/sizes/new`);
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" data={data} columns={columns}/>
      <Heading title="API" description="Api call for sizes"/>
      <Separator />
      <ApiList entityIdName="sizeId" entityName="sizes"/>
    </>
  );
};
