'use client'
import StatCard from '@/components/StatCard'
import { DataTable } from '@/components/Table/DataTable'
import { pocolumns } from '@/components/Table/preOrderColumn'
import { fetchPreOrder } from '@/lib/actions/bookingactions'
import React, { useEffect, useState } from 'react'

interface PreOrderData {
  scheduledCount: number;
  pendingCount: number;
  cancelledCount: number;
  documents: Array<{ /* define document structure if known */ }>;
}

const PreOrders =  () => {
     // Use TestDriveData type with useState
  const [preOrders, setPreOrders] = useState<PreOrderData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPreOrder();
      setPreOrders(data)
    };
    fetchData();
  }, []);

  if (!preOrders) return <div>Loading...</div>;
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
            count={preOrders?.scheduledCount}
            label="Scheduled appointments"
            icon={"/assets/icons/appointments.svg"}
          />
          <StatCard
            type="pending"
            count={preOrders?.pendingCount}
            label="Pending appointments"
            icon={"/assets/icons/pending.svg"}
          />
          <StatCard
            type="cancelled"
            count={preOrders?.cancelledCount}
            label="Cancelled appointments"
            icon={"/assets/icons/cancelled.svg"}
          />
        </section>
       <DataTable data={preOrders.documents} columns={pocolumns} />
      </main>
       
    </div>
  )
}

export default PreOrders