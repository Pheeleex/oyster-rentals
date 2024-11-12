'use client';

import React, { useEffect, useState } from 'react';
import StatCard from '@/components/StatCard';
import { fetchCarBooking } from '@/lib/actions/bookingactions';
import { columns } from '@/components/Table/columns';
import { DataTable } from '@/components/Table/DataTable';

interface TestDriveData {
  scheduledCount: number;
  pendingCount: number;
  cancelledCount: number;
  documents: Array<{ /* define document structure if known */ }>;
}


const TestDrives = () => {
  // Use TestDriveData type with useState
  const [testDrives, setTestDrives] = useState<TestDriveData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchCarBooking();
      setTestDrives(data);
    };
    fetchData();
  }, []);

  if (!testDrives) return <div>Loading...</div>;

  return (
    <div className="mx-auto flex w-full flex-col space-y-14 bg-[#110716]">
      <main className="admin-main">
        <section className="w-full space-y-4">
          <h1 className="header">Welcome 👋</h1>
          <p className="text-[#6C757D]">Start the day with managing new appointments</p>
        </section>

        <section className="admin-stat">
          <StatCard
            type="appointments"
            count={testDrives.scheduledCount}
            label="Scheduled appointments"
            icon="/assets/icons/appointments.svg"
          />
          <StatCard
            type="pending"
            count={testDrives.pendingCount}
            label="Pending appointments"
            icon="/assets/icons/pending.svg"
          />
          <StatCard
            type="cancelled"
            count={testDrives.cancelledCount}
            label="Cancelled appointments"
            icon="/assets/icons/cancelled.svg"
          />
        </section>                              
          {/*@ts-ignore */}
        <DataTable data={testDrives.documents ?? []} columns={columns} />
      </main>
    </div>
  );
};

export default TestDrives;
