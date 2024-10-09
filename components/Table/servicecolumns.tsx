"use client"

import { ColumnDef } from "@tanstack/react-table" 
import { AppointmentProps, PreOrderProps } from "@/types"
import { StatusBadge } from "../StatusBadge"
import PreOrderModal from "../PreOrderModal"
import { orderBy } from "firebase/firestore"
import { formatDateTime } from "@/lib/utils"
import ScheduleModal from "../ScheduleModal"




export const servicecolumns: ColumnDef<AppointmentProps >[] = [
    {
        id: "id", 
        header: 'ID',
        cell: ({row}) => <p className="text-[14px] text-white">{row.index + 1}</p>
    },

    {
        accessorKey: "schedule",
        header: "Appointments",
        cell: ({row}) => (
            <p className="text-[14px] text-white min-w-[100px]">
                {formatDateTime( row.original.schedule ? row.original.schedule : new Date).dateTime}
            </p>
        )
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
    header: "Reason",
    cell: ({row}) => (
        <p className="text-[14px] text-white min-w-[100px]">
            {row.original.reason}
        </p>
    )
  },

  {
    id: "actions",
    header: () => <div className="pl-4">Actions</div>,
    cell: ({ row }) => {
        const appointment = row.original;
      return(
        <div className="flex gap-1">
        <ScheduleModal
            type="confirm"
            title="confirm Appointment"
            appointment={appointment}
            appointmentId={appointment.id}
            description="Confirm Appointment"
          />
          <ScheduleModal
             type='cancel'
            appointment={appointment}
            appointmentId={appointment.id}
            title="Cancel Appointment"
            description="Are you sure you want to cancel your appointment?"
          />
      </div>
      )
    },
  },
]