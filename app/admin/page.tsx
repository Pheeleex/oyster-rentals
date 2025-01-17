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
    <div className="mx-auto flex w-fit md:w-full flex-col space-y-14 bg-[#110716] px-4 sm:px-8 md:px-16 lg:px-24">
      <header className="admin-header flex flex-col items-center md:flex-row md:justify-between md:items-center py-4">
        <Link href="/" className="cursor-pointer mb-4 md:mb-0">
          <Image
            src="/logo.svg"
            height={32}
            width={162}
            alt="logo"
            className="h-8 w-auto"
          />
        </Link>
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6 text-center">
          <Link href="/admin/CarInventory" className="text-16-semibold text-sm md:text-base">
            Inventory
          </Link>
          <p className="text-16-semibold text-sm md:text-base">Admin Dashboard</p>
        </div>
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
