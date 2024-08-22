'use client';
import { CarSpecProps } from "@/types";
import { Dialog, DialogPanel, Transition, TransitionChild } from "@headlessui/react";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import 'react-calendar/dist/Calendar.css'; 
import CustomButton from "./CustomButton";
import CarBookingForm from "./CarBookingForm";
import { getCarBookingDetails } from "@/utils";

interface CarDetailsProps {
    isOpen: boolean;
    closeModal: () => void;
}

const ScheduleDetails = ({
    isOpen, 
    closeModal, 
}: CarDetailsProps) => {
    const [bookingStatus, setBookingStatus] = useState<string | null>(null);

   
    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <TransitionChild
                        as={Fragment}
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </TransitionChild>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className='flex min-h-full items-center justify-center p-4 text-center'>
                            <TransitionChild
                                as={Fragment}
                                enter='ease-out duration-300'
                                enterFrom='opacity-0 scale-95'
                                enterTo='opacity-100 scale-100'
                                leave='ease-out duration-200'
                                leaveFrom='opacity-100 scale-100'
                                leaveTo='opacity-0 scale-95'
                            >
                                <DialogPanel className='relative w-full max-w-lg max-h-[90vh] overflow-y-auto transform rounded-2xl bg-white p-6 text-left shadow-xl transition-all flex flex-col gap-5'>
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className='absolute top-2 right-2 z-10 w-fit p-2 bg-primary-blue-100 rounded-full'
                                    >
                                        <Image
                                            src='/close.svg'
                                            alt="close"
                                            width={20}
                                            height={20}
                                        />
                                    </button>
                                    <div className='flex-1 flex flex-col gap-3'>
                                        <div className='relative w-full h-40 bg-pattern bg-cover bg-center rounded-lg'>
                                            <Image 
                                                src="/hero.png"
                                                alt={`car`}
                                                fill priority 
                                                className='object-contain' 
                                            />
                                        </div>

                                        <div className='flex gap-3'>
                                            <div className='flex-1 relative w-full h-24 bg-primary-blue-100 rounded-lg'>
                                                <Image 
                                                    src="/hero.png"
                                                    alt={`car`}
                                                    fill priority 
                                                    className='object-contain' 
                                                />
                                            </div>
                                            <div className='flex-1 relative w-full h-24 bg-primary-blue-100 rounded-lg'>
                                                <Image 
                                                    src="/hero.png"
                                                    alt={`car`}
                                                    fill priority 
                                                    className='object-contain' 
                                                />
                                            </div>
                                            <div className='flex-1 relative w-full h-24 bg-primary-blue-100 rounded-lg'>
                                                <Image 
                                                    src="/hero.png"
                                                    alt={`car`}
                                                    fill priority 
                                                    className='object-contain' 
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <CarBookingForm />
                                        {bookingStatus && (
                                            <p className="mt-4 text-red-500">
                                                {bookingStatus}
                                            </p>
                                        )}
                                    </div>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}

export default ScheduleDetails;