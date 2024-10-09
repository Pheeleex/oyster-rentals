// app/admin/page.js (Server Component)

import React from 'react';
import AdminClientWrapper from '@/components/AdminClientWrapper';
import TestDrives from '@/components/Admin/Testdrives';
import PreOrders from '@/components/Admin/PreOrders';
import Appointments from '@/components/Admin/Appointments';
import Link from 'next/link';
import Image from 'next/image';

const AdminPage = () => {
  return (
    <div className="mx-auto flex w-full flex-col space-y-14 bg-[#110716]">
      <header className='admin-header'>
        <Link href='/' className='cursor-pointer'>
          <Image
            src="/logo.svg"
            height={32}
            width={162}
            alt='logo'
            className='h-8 w-fit'
          />
        </Link>
        <Link href='/admin/CarInventory' className="text-16-semibold">Inventory</Link>
        <p className="text-16-semibold">Admin Dashboard</p>
      </header>

      {/* Client-side dropdown for rendering different sections */}
      <AdminClientWrapper
        testdrivesComponent={<TestDrives />}
        preordersComponent={<PreOrders />}
        repairsComponent={<Appointments />}
      />
    </div>
  );
};

export default AdminPage;
