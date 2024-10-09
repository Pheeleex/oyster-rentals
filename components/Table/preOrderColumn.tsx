"use client"

import { ColumnDef } from "@tanstack/react-table" 
import { PreOrderProps } from "@/types"
import { StatusBadge } from "../StatusBadge"
import PreOrderModal from "../PreOrderModal"
import { orderBy } from "firebase/firestore"




export const pocolumns: ColumnDef<PreOrderProps >[] = [
    {
        id: "id", 
        header: 'ID',
        cell: ({row}) => <p className="text-[14px] text-white">{row.index + 1}</p>
    },

    {
       accessorKey: 'name',
       header: 'Name',
       cell: ({row}) => 
       <p className="text-[14px] text-white">{row.original.name}</p>
       
    },

    {
      accessorKey: 'car',
      header: 'Car',
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-3">
            <p className="whitespace-nowrap text-[14px] text-white">
              {row.original.carManufacturer} - {row.original.carModel}({row.original.year})
            </p>
          </div>
        );
      },
   },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({row}) => (
        <div className="min-w-[115px] text-white">
            <StatusBadge status={row.original.status} />
        </div>
    )
  },
  {
    accessorKey: "method",
    header: "Preorders",
    cell: ({row}) => (
        <p className="text-[14px] text-white min-w-[100px]">
            {row.original.method}
        </p>
    )
  },

  {
    id: "actions",
    header: () => <div className="pl-4">Actions</div>,
    cell: ({ row }) => {
        const order = row.original;
      return(
        <div className="flex gap-1">
        <PreOrderModal
            type="confirm"
            title="confirm Appointment"
            carId={order.carId}
            order={order}
            orderId={order.orderId!}
            description="Confirm Preorder"
          />
          <PreOrderModal
             type='cancel'
             order={order}
             orderId={order.orderId!}
            carId={order.carId}
            title="Cancel Appointment"
            description="Are you sure you want to cancel your appointment?"
          />
      </div>
      )
    },
  },
]