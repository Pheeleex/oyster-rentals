import PreOrderbox from '@/components/PreOrderbox'
import StatCard from '@/components/StatCard'
import { columns } from '@/components/Table/columns'
import { DataTable } from '@/components/Table/DataTable'
import { pocolumns } from '@/components/Table/preOrderColumn'
import { fetchPreOrder } from '@/lib/actions/bookingactions'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const PreOrderPage = async () => {
    const preOrders = await fetchPreOrder()
  return (
    <div className='mx-auto flex w-full flex-col space-y-14 bg-[#110716]'>
      <header className='admin-header'>
        <Link href='/' className='cursor-pointer'>
          <Image
            src="/assets/icons/logo-full.svg"
            height={32}
            width={162}
            alt='logo'
            className='h-8 w-fit'
          />
        </Link>
        <Link href='/admin/CarInventory' className="text-16-semibold">Inventory</Link>
        <p className="text-16-semibold">Admin Dashboard</p>
      </header>

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

export default PreOrderPage