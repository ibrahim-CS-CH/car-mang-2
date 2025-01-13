import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import {
  ChevronDown,
  ChevronsUpDownIcon,
  ChevronUp,
  EyeIcon,
  MoreHorizontal,
} from "lucide-react";
import { useState } from "react";

import { EditCar } from "@/app/cars/components/edit-car";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const CarsListColumns: ColumnDef<Car>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "model",
    header: "Model",
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <div
          className="flex items-center gap-1 cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          <span>Price</span>
          {column.getIsSorted() === "desc" ? (
            <ChevronDown size={18} className="mx-1" />
          ) : column.getIsSorted() === "asc" ? (
            <ChevronUp size="16" className="mx-1" />
          ) : (
            <ChevronsUpDownIcon size="16" />
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "color",
    header: "Color",
  },
  {
    accessorKey: "manufactureDate",
    header: ({ column }) => {
      return (
        <div
          className="flex items-center gap-1 cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          <span>Manufactore date</span>
          {column.getIsSorted() === "desc" ? (
            <ChevronDown size={18} className="mx-1" />
          ) : column.getIsSorted() === "asc" ? (
            <ChevronUp size="16" className="mx-1" />
          ) : (
            <ChevronsUpDownIcon size="16" />
          )}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const [open, setOpen] = useState(false);
      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                className="flex gap-1 justify-between items-center"
                onClick={() => {
                  setOpen(true);
                }}>
                <span>Edit</span>
                <EyeIcon size={18} />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <EditCar open={open} setOpen={setOpen} car={row.original} />
        </>
      );
    },
  },
];
