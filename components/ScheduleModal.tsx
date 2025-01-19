import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './CustamModal';
import { AppointmentProps, PreOrderProps } from '@/types';
import ScheduleForm from './Forms/ScheduleForm';


const ScheduleModal = ({
  appointment,
  type,
}: {
  appointmentId: string,
  appointment?: AppointmentProps,
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
          <ScheduleForm
            type={type}
            setOpen={setOpen}
            appointment={appointment}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ScheduleModal;