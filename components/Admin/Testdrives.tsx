import React from 'react';
import StatCard from '@/components/StatCard';
import { fetchCarBooking } from '@/lib/actions/bookingactions';
import { columns } from '@/components/Table/columns';
import { DataTable } from '@/components/Table/DataTable';
import { TestDriveProps } from '@/types'; // Import the type for TestDriveProps

// Define the structure of `testDrivesData` based on its usage
interface TestDrivesData {
  scheduledCount: number;
  pendingCount: number;
  cancelledCount: number;
  documents: TestDriveProps[]; // Assuming `documents` array contains `TestDriveProps` objects
}

// Define props for `TestDrives` component
interface TestDrivesProps {
  testDrivesData: TestDrivesData | null;
}

const TestDrives: React.FC<TestDrivesProps> = ({ testDrivesData }) => {
  if (!testDrivesData) return <div>Loading...</div>;

  return (
    <div className="mx-auto flex w-full flex-col space-y-14 bg-[#110716]">
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
            count={testDrivesData.scheduledCount}
            label="Scheduled appointments"
            icon="/assets/icons/appointments.svg"
          />
          <StatCard
            type="pending"
            count={testDrivesData.pendingCount}
            label="Pending appointments"
            icon="/assets/icons/pending.svg"
          />
          <StatCard
            type="cancelled"
            count={testDrivesData.cancelledCount}
            label="Cancelled appointments"
            icon="/assets/icons/cancelled.svg"
          />
        </section>

        <DataTable
          data={testDrivesData.documents}
          columns={columns}
        />
      </main>
    </div>
  );
};

export default TestDrives;
