'use client'

import React, { useEffect, useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
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
import { decryptKey, encryptKey } from '@/lib/utils';
import { setCookie } from 'nookies';

const PassKeyModal = ({ closeModal }: { closeModal: () => void }) => {
  const [open, setOpen] = useState(true);
  const [passkey, setPassKey] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const path = usePathname();

  

  // Validate passkey
  const validatePassKey = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (passkey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
      // Encrypt and store the passkey in cookies
      const encryptedKey = encryptKey(passkey);
      setCookie(null, 'accessKey', encryptedKey, {
        maxAge: 30 * 24 * 60 * 60, // 30 days
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        httpOnly: false,
        sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax', // Use stricter settings in production
      });
      setOpen(false);
      router.push('/admin');
    } else {
      setError('Invalid passkey. Please try again.');
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
