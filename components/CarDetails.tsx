import { CarProps, CarSpecProps, TestDriveProps } from "@/types";
import { Dialog, DialogPanel, Transition, TransitionChild } from "@headlessui/react";
import Image from "next/image";
import { Fragment, useState } from "react";
import JoinUs from "./JoinUs";
import CarBookingForm from "./Forms/CarBookingForm";
import CustomButton from "./CustomButton";
import PreOrderForm from "./Forms/PreOrderForm";

interface CarDetailsProps {
    isOpen: boolean;
    closeModal: () => void;
    car?: CarSpecProps | CarProps | null;
    showBookingForm?: boolean; // New prop to conditionally render the booking form
    bookingSchedule?: Date | null;
}

const CarDetails = ({
    isOpen,
    closeModal,
    car,
    showBookingForm = false,
    bookingSchedule,
}: CarDetailsProps) => {
    const [bookingStatus, setBookingStatus] = useState<string | null>(null);
    const [showForm, setShowForm] = useState(false);

    // Type guard to determine if `car` is `CarSpecProps`
    const isCarSpecProps = (car?: CarSpecProps | CarProps): car is CarSpecProps => {
        return !!car && (car as CarSpecProps).Make !== undefined;
    };

    // Type guard to determine if `car` is `CarProps`
    const isCarProps = (car?: CarSpecProps | CarProps): car is CarProps => {
        return !!car && (car as CarProps).make !== undefined;
    };

    // Check if car exists before accessing properties
    const carId = car && (isCarSpecProps(car) ? car.id : isCarProps(car) ? car.id : '');
    const carManufacturer = car && (isCarSpecProps(car) ? car.Make : isCarProps(car) ? car.make : '');
    const carModel = car && (isCarSpecProps(car) ? car.Model : isCarProps(car) ? car.model : '');

    const showPreOrderForm = () => {
        setShowForm(true);
    };

   

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
                                                src={car && isCarSpecProps(car) && car.images ? car.images[0] : '/hero.png'}
                                                alt="car"
                                                fill 
                                                priority 
                                                className='object-contain' 
                                            />
                                        </div>

                                        <div className='flex gap-3'>
                                            {Array.from({ length: 3 }, (_, index) => (
                                                <div key={index} className='flex-1 relative w-full h-24 bg-primary-blue-100 rounded-lg'>
                                                    <Image 
                                                        src={car && isCarSpecProps(car) && car.images ? car.images[index + 1] : '/hero.png'}
                                                        alt="car"
                                                        fill 
                                                        priority 
                                                        className='object-contain' 
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {showBookingForm ? (
                                        <div>
                                            <CarBookingForm
                                                type='create'
                                                carModel={carModel || ''}
                                                carManufacturer={carManufacturer || ''}
                                                carId={carId || ''}
                                                closeModal={closeModal}
                                            />
                                            {bookingStatus && (
                                                <p className="mt-4 text-red-500">
                                                    {bookingStatus}
                                                </p>
                                            )}
                                            <JoinUs />
                                        </div>
                                    ) : (
                                        <div className="flex-1 flex flex-col gap-2">
                                            <h2 className='font-semibold text-xl capitalize'>
                                                {car && isCarProps(car) ? `${car.make} ${car.model}` : 'Unknown Car'}
                                            </h2>

                                            {car ? (
                                                <div className="mt-3 flex flex-wrap gap-4">
                                                    {Object.entries(car).map(([key, value]) => (
                                                        <div className='flex justify-between gap-5 w-full text-right' key={key}>
                                                            <h4 className='text-grey capitalize'>
                                                                {key.split("_").join(" ")}
                                                            </h4>
                                                            <p className='text-black-100 font-semibold'>
                                                                {value}
                                                            </p>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <p>No car available. Please pre-order.</p>
                                            )}
                                            
                                            <CustomButton
                                                title="Pre-order now"
                                                btnType="button"
                                                containerStyles="bg-blue-500 p-2 text-blue-950 w-[200px] rounded lg:ml-[30%]"
                                                handleClick={showPreOrderForm}
                                            />

                                            {!car ? (
                                                <PreOrderForm type='create' />
                                            ) : isCarProps(car) && (
                                                <PreOrderForm
                                                    carManufacturer={car.make}
                                                    carModel={car.model}
                                                    year={car.year}
                                                    carId={car.id}
                                                    type='create'
                                                />
                                            )}
                                        </div>
                                    )}
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};

export default CarDetails;

