"use client";

import Heading from "@/components/UI/Heading";
import { Button } from "@/components/UI/button";
import { Separator } from "@/components/UI/separator";
import { Billboard } from "@prisma/client";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { BillboardColumn, columns } from "./columns";
import { DataTable } from "@/components/UI/data-table";
import ApiList from "@/components/UI/api-list";
interface billBoardClientProps {
  data: BillboardColumn[];
}
export const BillBoardClient: React.FC<billBoardClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Billboard (${data.length})`}
          description="Manage Billboards for your store"
        />
        <Button
          onClick={() => {
            router.push(`/${params.storeId}/billboards/new`);
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="label" data={data} columns={columns}/>
      <Heading title="API" description="Api call for billboards"/>
      <Separator />
      <ApiList entityIdName="billboardId" entityName="billboards"/>
    </>
  );
};
