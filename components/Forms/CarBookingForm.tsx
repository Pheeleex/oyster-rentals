'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React, { SetStateAction, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Status, TestDriveProps } from '@/types'

import CustomButton from '../CustomButton'
import { createCarBooking, updateCarBooking } from '@/lib/actions/bookingactions'
import CustomFormField, { FormFieldType } from '../CustomFormField'
import { getAppointmentSchema } from '@/lib/validations'
import { Form } from '../ui/form'
import SubmitButton from '../SubmitButton'

const CarBookingForm = ({
  type,
  testDrive,
  carId,
  TestDriveId,
  carModel,
  carManufacturer,
  bookingSchedule,
  setOpen,
  booked
}: {
  type: "create" | "cancel" | "confirm",
  testDrive?: TestDriveProps,
  carId?: string,
  TestDriveId?: string,
  carModel?: string,
  carManufacturer?: string,
  bookingSchedule?: Date | null
  closeModal?: () => void
  booked?: () => void
  setOpen?: (open: boolean) => void
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>('')
  const [success, setSuccess] = useState<boolean>(false)
  const AppointmentFormValidation = getAppointmentSchema(type)

  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
      ...(type === "create" && {
        name: testDrive ? testDrive.name : '',
        email: testDrive ? testDrive.email : '',
        phone: testDrive ? testDrive.phone : '',
      }),
      schedule: testDrive ? testDrive.schedule : new Date(),
    },
  })

  const router = useRouter()

  async function onSubmit(values: z.infer<typeof AppointmentFormValidation>) {
    setIsLoading(true)
    let status: string;
    switch (type) {
      case 'confirm':
        status = 'confirmed';
        break;
      case 'cancel':
        status = 'cancelled';
        break;
      default:
        status = 'pending';
        break;
    }

    try {
      if (type === 'create') {
        const appointmentData = {
          ...values,
          carId: carId,
          carManufacturer: carManufacturer,
          carModel: carModel,
          status: status as Status
        }
        const appointment = await createCarBooking(appointmentData);

        if (appointment) {
          form.reset();
          booked!()
          setIsLoading(false)
        } else {
          setError(error);
        }
      }
      else {
        const updatedTestDrive = {
          testDrive: {
            carId: testDrive?.carId,
            TestDriveId: TestDriveId,
            schedule: values.schedule ? new Date(values.schedule) : undefined,
            status: status as Status,
            notes: values.notes || '',
          },
          type,
        }
        const updatedAppointment = await updateCarBooking(TestDriveId!, updatedTestDrive)
        setOpen?.(false);
      }
    } catch (error) {
      console.log(error);

      // Check if error is an instance of Error and get the message
      if (error instanceof Error) {
        setError(error.message);
        setIsLoading(false)
      } else {
        // Otherwise, convert the error to string
        setError(String(error));
        setIsLoading(false)
      }
    } finally {
      setIsLoading(false);
    }
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">

        <section className="mb-12 space-y-4">
          <h1 className="header">Book a test drive 👋</h1>
          <p className="text-dark-700">Set a date for the vehicle inspection and test drive</p>
        </section>

        {/* Success and Error Messages */}
        {success && (
          <div className="success-message fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 
          text-white py-2 px-4 rounded-lg shadow-lg transition-opacity duration-500 ease-in-out">
            Details submitted successfully!
          </div>
        )}
        {error && (
          <div className="error-message fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-500 
          text-white py-2 px-4 rounded-lg shadow-lg transition-opacity duration-500 ease-in-out">
            {error}
          </div>
        )}

        {
          type === 'create' && (
            <>
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="name"
                label="Full name"
                placeholder="John Doe"
                iconSrc="/assets/icons/user.svg"
                iconAlt="user"
              />

              {/* EMAIL & PHONE */}
              <div className="flex flex-col gap-6 xl:flex-row">
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  control={form.control}
                  name="email"
                  label="Email address"
                  placeholder="johndoe@gmail.com"
                  iconSrc="/assets/icons/email.svg"
                  iconAlt="email"
                />

                <CustomFormField
                  fieldType={FormFieldType.PHONE_INPUT}
                  control={form.control}
                  name="phone"
                  label="Phone Number"
                  placeholder="(555) 123-4567"
                />
              </div>

              <div className="flex flex-col gap-6 xl:flex-row">
                <CustomFormField
                  fieldType={FormFieldType.DATE_PICKER}
                  control={form.control}
                  name="schedule"
                  label="Expected appointment date"
                  showTimeSelect
                  dateFormat="MM/dd/yyyy  -  h:mm aa"
                />

                <CustomFormField
                  fieldType={FormFieldType.TEXTAREA}
                  control={form.control}
                  name="notes"
                  label="Comments/Notes"
                  placeholder="Prefer afternoon appointments, if possible"
                />
              </div>
            </>
          )
        }

        {
          type === 'confirm' && (
            <div className="w-full">
              {/* Displaying Name, Email, Phone Number, and Location as text */}
              <div className="flex flex-wrap gap-8 items-center">
                <p><strong>Name:</strong> {testDrive?.name}</p>
                <p><strong>Email:</strong> {testDrive?.email}</p>
                <p><strong>Phone:</strong> {testDrive?.phone}</p>
                <p><strong>Location:</strong> {testDrive?.carManufacturer}  {testDrive?.carModel}</p>
              </div>

              {/* Other fields remain editable */}
              <div className="flex flex-col gap-10 xl:flex-row">
                <CustomFormField
                  fieldType={FormFieldType.TEXTAREA}
                  control={form.control}
                  name="notes"
                  label="Comments/Notes"
                  placeholder="Prefer afternoon appointments, if possible"
                />

                <CustomFormField
                  fieldType={FormFieldType.DATE_PICKER}
                  control={form.control}
                  name="schedule"
                  label="Expected appointment date"
                  showTimeSelect
                  dateFormat="MM/dd/yyyy  -  h:mm aa"
                />
              </div>
            </div>
          )
        }

        {
          type === "cancel" && (
            <>
              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="notes"
                label="Reason for cancellation"
                placeholder="Urgent meeting came up"
              />

              <CustomFormField
                fieldType={FormFieldType.DATE_PICKER}
                control={form.control}
                name="schedule"
                label="Expected appointment date"
                showTimeSelect
                dateFormat="MM/dd/yyyy  -  h:mm aa"
              />
            </>
          )
        }

        <SubmitButton isLoading={isLoading}>Submit</SubmitButton>
      </form>
    </Form>
  )
}

export default CarBookingForm