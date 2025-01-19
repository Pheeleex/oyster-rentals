import { CarProps, CarSpecProps } from "@/types";
import { Dialog, DialogPanel, Transition, TransitionChild } from "@headlessui/react";
import Image from "next/image";
import { Fragment, useState } from "react";
import JoinUs from "./JoinUs";
import CarBookingForm from "./Forms/CarBookingForm";
import ImageGallery from "./ImageGallery";
import PreOrderSection from "./PreOrderSection";

interface CarDetailsProps {
    isOpen: boolean;
    closeModal: () => void;
    booked?: () => void;
    car?: CarSpecProps | CarProps | null;
    showBookingForm?: boolean; // New prop to conditionally render the booking form
}


const CarDetails = ({
    isOpen,
    closeModal,
    car,
    showBookingForm = false,
    booked,
}: CarDetailsProps) => {
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
                                    <ImageGallery
                                        car={car}
                                        isCarProps={isCarProps}
                                        isCarSpecProps={isCarSpecProps}
                                    />
                                    {/*If show booking form is true render car booking form, else show the
                                    pre order car properties and preOrderSection*/}
                                    {showBookingForm ? (
                                        <div>
                                            <CarBookingForm
                                                type='create'
                                                carModel={carModel || ''}
                                                carManufacturer={carManufacturer || ''}
                                                carId={carId || ''}
                                                closeModal={closeModal}
                                                booked={booked}
                                            />

                                            <JoinUs />
                                        </div>
                                    )
                                        :
                                        (
                                            <PreOrderSection
                                                car={car}
                                                isCarProps={isCarProps}
                                            />
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

