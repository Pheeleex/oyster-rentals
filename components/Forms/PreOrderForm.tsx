import { PreOrderFormSchema } from "@/lib/validations"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl } from "../ui/form"
import CustomButton from "../CustomButton"
import CustomFormField, { FormFieldType } from "../CustomFormField"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Label } from "../ui/label"
import { createPreOrder, updatePreOrder } from "@/lib/actions/bookingactions"
import { useState } from "react"
import SubmitButton from "../SubmitButton"
import { PreOrderProps, Status } from "@/types"
import { v4 } from "uuid"
import { useRouter } from "next/navigation"


const PreOrderForm = ({
  type,
  order,
  carManufacturer,
  carModel,
  year,
  carId,
  orderId,
  setOpen
}: {
  type: "create" | "cancel" | "confirm",
  order?: PreOrderProps,
  carManufacturer?: string,
  carModel?: string
  year?: number
  carId?: string
  orderId?: string
  setOpen?: (open: boolean) => void
}) => {
  const PreOrderFormValidation = PreOrderFormSchema(type)
const form = useForm<z.infer<typeof PreOrderFormValidation>>({
  resolver: zodResolver(PreOrderFormValidation),
  defaultValues: {
    name: order ? order.name : '',
    email: order ? order.email : '',
    phone: order ? order.phone : '',
    carManufacturer: type === 'confirm' && order ? order.carManufacturer : (carManufacturer || ''),
    carModel: type === 'confirm' && order ? order.carModel : (carModel || ''),
    year: year? year : 2022,
  }
})

const router = useRouter()

const [isLoading, setIsLoading] = useState(false)

async function onSubmit(values: z.infer<typeof PreOrderFormValidation>) {
  console.log('clicked')
  console.log(values, 'values')
  console.log('you see the values?')

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
    const generatedCarId = v4()
      if(type === 'create'){
        const orderData = {
          ...values,
          carId: carId ? carId : generatedCarId,
          status: status as Status,
          userId: v4()
        }
        console.log(orderData, 'orderData')
        const order = await  createPreOrder(orderData);
        if(order){
          router.push(`pre-order/success/${order.userId}`)
        }
       // Log the success message and new order details
       console.log(`Order with id: ${order.orderId} for ${order.name} is being processed`)
      }
      else{
        const updatedPreOrder = {
          order: {
          carId: order?.carId,
          orderId: orderId,
          status: status as Status,
          notes: values.notes || '',
        },
        type,
      }
      const updatedAppointment = await updatePreOrder(orderId!, updatedPreOrder)
        setOpen?.(false);

      }
  } catch (error) {
    console.log('Error processing the order:', error)
  }
  finally{
    setIsLoading(false)
  }
}
return (
  <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
     

     { type === 'create' && (
       <section>
      <CustomFormField
      fieldType={FormFieldType.INPUT}
      control={form.control}
      name="name"
      label="Full name"
      placeholder="John Doe"
      iconSrc="/assets/icons/user.svg"
      iconAlt="user"
    />

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

      <CustomFormField
        fieldType={FormFieldType.INPUT}
        control={form.control}
        name="carManufacturer"
        label="Car Manufacturer"
        placeholder="volkswagen"
         iconSrc="/car-logo.svg"
      />

      <CustomFormField
        fieldType={FormFieldType.INPUT}
        control={form.control}
        name="carModel"
        label="Car Model"
        placeholder="golf"
      />

      <CustomFormField
        fieldType={FormFieldType.INPUT}
        control={form.control}
        name="year"
        label="year"
        placeholder="2020"
      />

      <CustomFormField
        fieldType={FormFieldType.INPUT}
        control={form.control}
        name="trim"
        label="Trim"
        placeholder="gti"
      />

    <div>
        <h4>Have you found a particular one you want to buy yet or would you like us to search for you</h4>
        <CustomFormField
        fieldType={FormFieldType.SKELETON}
        control={form.control}
        name="method"
        label="Yes/No"
        renderSkeleton={(field) => (
          <FormControl>
            <RadioGroup
              className="flex h-11 gap-6 xl:justify-between"
              onValueChange={field.onChange}
              defaultValue={field.value}
            >
              {['Yes I have found one online', 'No, I would like you to search for me'].map((option, i) => (
                <div key={option + i} className="radio-group gold-border">
                  <RadioGroupItem value={option} id={option} />
                  <Label htmlFor={option} className="cursor-pointer text-blue-400">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>  
          </FormControl>
        )}
      />
    </div>

      <CustomFormField
        fieldType={FormFieldType.INPUT}
        control={form.control}
        name="websiteLink"
        label="Link to website or listing (fill none if you dont have any)"
        placeholder="ebaymotors.com"
      />
          </section>
     )}
                {
  type === 'confirm' && (
    <div className="w-full">
      {/* Displaying Name, Email, Phone Number, and Location as text */}
      <div className="flex flex-wrap gap-8 items-center">
        <p><strong>Name:</strong> {order?.name}</p>
        <p><strong>Email:</strong> {order?.email}</p>
        <p><strong>Phone:</strong> {order?.phone}</p>
        <p><strong>Location:</strong> {order?.carManufacturer}  {order?.carModel}</p>
      </div>

      {/* Other fields remain editable */}

        <CustomFormField
          fieldType={FormFieldType.TEXTAREA}
          control={form.control}
          name="notes"
          label="Comments/Notes"
          placeholder="Prefer afternoon appointments, if possible"
        />
      </div>
  )
}


{
          type === "cancel" && (
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="notes"
              label="Reason for cancellation"
              placeholder="Urgent meeting came up"
            />
          )
        }


            <SubmitButton isLoading={isLoading}> Submit </SubmitButton>
  
    </form>
  </Form>
)
}
export default PreOrderForm