
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './CustamModal';
import CarBookingForm from './Forms/CarBookingForm';
import { PreOrderProps } from '@/types';
import PreOrderForm from './Forms/PreOrderForm';


const PreOrderModal = ({
  order,
  type,
  carId,
  orderId
}: {
  orderId: string,
  carId?: string,
  order?: PreOrderProps,
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
          <PreOrderForm
          type={type}
          order={order}
          setOpen={setOpen}
          orderId={orderId}
          carId={carId!}
        />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PreOrderModal;