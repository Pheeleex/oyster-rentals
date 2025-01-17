"use client"

import { ColumnDef } from "@tanstack/react-table"
import { formatDateTime } from "@/lib/utils"
import Image from "next/legacy/image"
import { TestDriveProps } from "@/types"
import { StatusBadge } from "../StatusBadge"
import AppointmentModal from "../AppointmentModal"




export const columns: ColumnDef<TestDriveProps>[] = [
  {
    id: "id",
    header: 'ID',
    cell: ({ row }) => <p className="text-[14px] text-white">{row.index + 1}</p>
  },

  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) =>
      <p className="text-[14px] text-white">{row.original.name}</p>

  },

  {
    accessorKey: 'car',
    header: 'Car',
    cell: ({ row }) => {
      const imageUrl = row.original.car?.images![0] || '/hero.png';
      return (
        <div className="flex items-center gap-3">
          <Image
            src={imageUrl} // Use the fallback if the image is undefined
            alt='Car image'
            width={40}
            height={40}
            className='size-8'
          />
          <p className="whitespace-nowrap text-[14px] text-white">
            {row.original.carManufacturer} - {row.original.carModel}
          </p>
        </div>
      );
    },
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="min-w-[115px] text-white">
        <StatusBadge status={row.original.status} />
      </div>
    )
  },
  {
    accessorKey: "schedule",
    header: "Appointments",
    cell: ({ row }) => (
      <p className="text-[14px] text-white min-w-[100px]">
        {formatDateTime(row.original.schedule ? row.original.schedule : new Date).dateTime}
      </p>
    )
  },

  {
    id: "actions",
    header: () => <div className="pl-4">Actions</div>,
    cell: ({ row }) => {
      const testDrive = row.original;
      return (
        <div className="flex gap-1">
          <AppointmentModal
            TestDriveId={testDrive.TestDriveId}
            testDrive={testDrive}
            type="confirm"
            title="Schedule Appointment"
            description="Please confirm the following details to schedule."
          />
          <AppointmentModal
            TestDriveId={testDrive.TestDriveId}
            testDrive={testDrive}
            type="cancel"
            title="Cancel Appointment"
            description="Are you sure you want to cancel your appointment?"
          />

        </div>
      )
    },
  },
]