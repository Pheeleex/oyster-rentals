import { TestDriveProps } from '@/types';
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './CustamModal';
import CarBookingForm from './Forms/CarBookingForm';


const AppointmentModal = ({
  testDrive,
  type,
  TestDriveId,
}: {
  TestDriveId?: string,
  testDrive?: TestDriveProps,
  type: "confirm" | "cancel";
  title: string;
  description: string;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Trigger Button */}
      <DialogTrigger onClick={() => setOpen(true)}>
        <button
          className={`capitalize ${type === 'confirm' ? 'text-green-500' : 'text-red-100'}`}
        >
          {type}
        </button>
      </DialogTrigger>

      {/* Dialog Modal */}
      
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogContent>
          <DialogHeader>
            <div className="capitalize">
              <DialogTitle>{type} Appointment</DialogTitle>
            </div>
            <DialogDescription>
              Please fill in the following details to {type} the appointment
            </DialogDescription>
          </DialogHeader>

          {/* Form Content */}
          <div className="max-h-[400px] overflow-y-auto pr-2 scrollbar-thin">
          <CarBookingForm
           TestDriveId={testDrive?.TestDriveId}
            type={type}
            testDrive={testDrive}
            setOpen={setOpen}
          />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AppointmentModal;


