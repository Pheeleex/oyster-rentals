import React from 'react'
import Image from "next/legacy/image"
import Link from 'next/link'
import StatCard from '@/components/StatCard'
import { fetchCarBooking } from '@/lib/actions/bookingactions'

import { columns } from '@/components/Table/columns'
import { DataTable } from '@/components/Table/DataTable'

const TestDrives = async () => {
  const testDrives = await fetchCarBooking();
  console.log(testDrives, typeof testDrives?.scheduledCount)
  // Function to extract and log all appointment IDs
  const logAppointmentIds = () => {
    const appointmentIds = testDrives?.documents?.map((appointment: any) => appointment.TestDriveId) || [];
    console.log("Appointment IDs:", appointmentIds);
  };

  // Log the appointment IDs
  logAppointmentIds();

  

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
            count={testDrives?.scheduledCount}
            label="Scheduled appointments"
            icon={"/assets/icons/appointments.svg"}
          />
          <StatCard
            type="pending"
            count={testDrives?.pendingCount}
            label="Pending appointments"
            icon={"/assets/icons/pending.svg"}
          />
          <StatCard
            type="cancelled"
            count={testDrives?.cancelledCount}
            label="Cancelled appointments"
            icon={"/assets/icons/cancelled.svg"}
          />
        </section>
       <DataTable data={testDrives?.documents ?? []} columns={columns} />
      </main>
    </div>
  );
}

export default TestDrives;