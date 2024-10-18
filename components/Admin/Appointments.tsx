import PreOrderbox from '@/components/PreOrderbox'
import StatCard from '@/components/StatCard'
import { columns } from '@/components/Table/columns'
import { DataTable } from '@/components/Table/DataTable'
import { pocolumns } from '@/components/Table/preOrderColumn'
import { servicecolumns } from '@/components/Table/servicecolumns'
import { fetchAppointments, fetchPreOrder } from '@/lib/actions/bookingactions'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Appointments = async () => {
    const appointments = await fetchAppointments()
  return (
    <div className='mx-auto flex w-full flex-col space-y-14 bg-[#110716]'>
      <main className="admin-main">
        <section className="w-full space-y-4">
          <h1 className="header">Welcome 👋</h1>
          <p className="text-[#6C757D]">
            Start the day with managing new appointments
          </p>
        </section>
        <section className="admin-stat">
          <StatCard
            type="appointments"
            count={appointments?.scheduledCount}
            label="Scheduled appointments"
            icon={"/assets/icons/appointments.svg"}
          />
          <StatCard
            type="pending"
            count={appointments?.pendingCount}
            label="Pending appointments"
            icon={"/assets/icons/pending.svg"}
          />
          <StatCard
            type="cancelled"
            count={appointments?.cancelledCount}
            label="Cancelled appointments"
            icon={"/assets/icons/cancelled.svg"}
          />
        </section>
       <DataTable data={appointments.documents} columns={servicecolumns} />
      </main>
       
    </div>
  )
}

export default Appointments