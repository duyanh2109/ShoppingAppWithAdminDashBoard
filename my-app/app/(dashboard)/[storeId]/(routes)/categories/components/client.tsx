"use client";

import Heading from "@/components/UI/Heading";
import { Button } from "@/components/UI/button";
import { Separator } from "@/components/UI/separator";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { CategoryColumn, columns } from "./columns";
import { DataTable } from "@/components/UI/data-table";
import ApiList from "@/components/UI/api-list";
interface categoryClientProps {
  data: CategoryColumn[];
}
export const CategoryClient: React.FC<categoryClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Categories (${data.length})`}
          description="Manage Categories for your store"
        />
        <Button
          onClick={() => {
            router.push(`/${params.storeId}/categories/new`);
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" data={data} columns={columns}/>
      <Heading title="API" description="Api call for categories"/>
      <Separator />
      <ApiList entityIdName="categoryId" entityName="categories"/>
    </>
  );
};
