'use client'

import React, { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/legacy/image';


const PassKeyModal = ({ closeModal }: { closeModal: () => void }) => {
  const [open, setOpen] = useState(true);
  const [passkey, setPassKey] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const path = usePathname();



  // Validate passkey
  const validatePassKey = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/auth/set-cookie', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ passkey }),
      });

      if (response.ok) {
        setOpen(false);
        router.push('/admin');
      } else {
        const { error } = await response.json();
        setError(error || 'Invalid passkey. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };
  // Close the modal and redirect
  const handleCloseModal = () => {
    setOpen(false);
    closeModal(); // Trigger parent to close the modal
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className='shad-alert-dialog'>
        <AlertDialogHeader>
          <AlertDialogTitle className='flex items-start justify-between'>
            Admin access verification
            <Image
              src="/assets/icons/close.svg"
              alt="close"
              width={20}
              height={20}
              onClick={handleCloseModal}
              className="cursor-pointer"
            />
          </AlertDialogTitle>
          <AlertDialogDescription>
            To access the admin page, please enter the passkey.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div>
          <InputOTP
            maxLength={6}
            value={passkey}
            onChange={(value) => setPassKey(value)}
          >
            <InputOTPGroup className='shad-otp'>
              <InputOTPSlot className='shad-otp-slot' index={0} />
              <InputOTPSlot className='shad-otp-slot' index={1} />
              <InputOTPSlot className='shad-otp-slot' index={2} />
              <InputOTPSlot className='shad-otp-slot' index={3} />
              <InputOTPSlot className='shad-otp-slot' index={4} />
              <InputOTPSlot className='shad-otp-slot' index={5} />
            </InputOTPGroup>
          </InputOTP>

          {error && (
            <p className="shad-error text-14-regular text-red-500 mt-4 flex justify-center">
              {error}
            </p>
          )}
        </div>

        <AlertDialogFooter>
          <AlertDialogAction
            onClick={(e) => validatePassKey(e)}
            className="shad-primary-btn w-full"
          >
            Enter Admin passkey
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PassKeyModal;
