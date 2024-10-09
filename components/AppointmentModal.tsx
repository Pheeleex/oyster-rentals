import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from './ui/button';

import { TestDriveProps } from '@/types';
import CarBookingForm from './Forms/CarBookingForm';

//import AppointmentForm from './forms/AppointmentsForm';
  

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

    const openModal = () => {
      console.log(`Modal with ${TestDriveId} is open`)
    }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger asChild>
        <Button variant="ghost" 
        className={`capitalize ${type === 'confirm' ? 'text-green-500' : 'text-red-100'}`}
        onClick={openModal}
        >
            {type}
        </Button>
  </DialogTrigger>
  <DialogContent className='shad-dialog sm:max-w-md'>
  <DialogHeader className="mb-4 space-y-3">
          <DialogTitle className="capitalize">{type} Appointment</DialogTitle>
          <DialogDescription>
            Please fill in the following details to {type} appointment
          </DialogDescription>
        </DialogHeader>
       <CarBookingForm
           TestDriveId={testDrive?.TestDriveId}
            type={type}
            testDrive={testDrive}
            setOpen={setOpen}
        />
  </DialogContent>
</Dialog>
  )
}

export default AppointmentModal