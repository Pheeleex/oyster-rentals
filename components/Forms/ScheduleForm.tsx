import { ScheduleFormValidation } from "@/lib/validations"
import { zodResolver } from "@hookform/resolvers/zod"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form } from "../ui/form"
import CustomFormField, { FormFieldType } from "../CustomFormField"
import { v4 } from "uuid"
import { ScheduleAppointment, updateSchedule } from "@/lib/actions/bookingactions"
import SubmitButton from "../SubmitButton"
import { AppointmentProps, Status } from "@/types"

const ScheduleForm = ({
  setOpen,
  type,
  appointment,
  userName
}: {
  setOpen?: (open: boolean) => void,
  type: "create" | "cancel" | "confirm",
  appointment?: AppointmentProps
  userName?: string
}) => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string>('')
  const [success, setSuccess] = useState<boolean>(false)
  // 1. Define your form.
  const form = useForm<z.infer<typeof ScheduleFormValidation>>({
    resolver: zodResolver(ScheduleFormValidation),
    defaultValues: {
      schedule: appointment? appointment.schedule : new Date(),
      reason: appointment ? appointment.reason : ''
    },
  })
  const router = useRouter()
  const { userId } = useParams();
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof ScheduleFormValidation>) {
    setIsLoading(true);

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
      if(type === 'create'){
        const appointmentData = {
          ...values,
         id: v4(),
         userName: userName,
         status: status as Status
      }
       
      // await scheduleAppointment(appointmentData)
      const serviceAppointment = await ScheduleAppointment(appointmentData)
        // Set success to true to show success message
       if (serviceAppointment){
        setSuccess(true)
        setIsLoading(false)
       }
      }else{
        const updatedAppointment = {
          appointment: {
           appointmentId: appointment?.appointmentId,
          schedule: values.schedule ? new Date(values.schedule) : undefined,
          status: status as Status,
          reason: values.reason || '',
        },
        type,
      }
      const updateAppointment = await updateSchedule(appointment?.id!, updatedAppointment)
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
  }
  
  }
  return (
    <Form {...form}>
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex-1 space-y-12"
    >
      <section className="space-y-4">
        <h1 className="header">Welcome 👋</h1>
        <p className="text-dark-700">Let us know more about yourself.</p>
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


      <section className="space-y-6">
        <div className="mb-9 space-y-1">
        <CustomFormField
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name="schedule"
              label="Expected appointment date"
              showTimeSelect
              dateFormat="MM/dd/yyyy  -  h:mm aa"
            />
        </div>

        {/* ALLERGY & CURRENT MEDICATIONS */}
        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="reason"
            label="Notes/Reason"
            placeholder="My steering is too stiff"
          />
        </div>
    
      </section>
      <SubmitButton isLoading={isLoading}>Submit</SubmitButton>
    </form>
    </Form>
  )
}

export default ScheduleForm