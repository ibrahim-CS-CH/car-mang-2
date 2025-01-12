import { ColumnDef } from "@tanstack/react-table";

export const CompaniesListColumns: ColumnDef<Car>[] = [
  {
    accessorKey: "carModel",
    header: "Car model",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "color",
    header: "Color",
  },
  {
    accessorKey: "manufactoreDate",
    header: "Manufactore date",
  },
];
