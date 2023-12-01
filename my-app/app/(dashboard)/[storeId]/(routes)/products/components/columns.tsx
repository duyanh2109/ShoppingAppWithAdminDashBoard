"use client";

import { Button } from "@/components/UI/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import Cellaction from "./cell-action";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ProductColumn = {
  id: string
  name: string
  isFeatured: boolean
  isArchived: boolean
  price: string
  category: string
  size: string
  color: string
  createdAt: string
};

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "isArchived",
    header: "Archived",
  },
  {
    accessorKey: "isFeatured",
    header: "Featured",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "size",
    header: "Size",
  },
  {
    accessorKey: "color",
    header: "Color",
    cell: ({ row }) => <div className="flex items-center gap-x-2 " >
      <div className="h-6 w-6 rounded-full border" style={{backgroundColor:row.original.color}}/>
    </div>,
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    accessorKey: "action",header: "Action",
    cell: ({ row }) => <Cellaction data={row.original} />,
  },
];
