"use client";

import Heading from "@/components/UI/Heading";

import { Separator } from "@/components/UI/separator";

import { OrderColumn, columns } from "./columns";
import { DataTable } from "@/components/UI/data-table";

interface orderClientProps {
  data: OrderColumn[];
}
export const OrderClient: React.FC<orderClientProps> = ({ data }) => {
 
  return (
    <>
        <Heading
          title={`Order (${data.length})`}
          description="Manage Orders for your store"
        />
      <Separator />
      <DataTable searchKey="products" data={data} columns={columns}/>
    
      
    </>
  );
};
