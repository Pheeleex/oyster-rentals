'use client'
import { createTradeSchema } from '@/lib/validations'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import CustomFormField, { FormFieldType } from '../CustomFormField'
import { Form, FormControl } from '../ui/form'
import SubmitButton from '../SubmitButton'
import { FileUploader } from '../FileUploader'

const TradeForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const form = useForm<z.infer<typeof createTradeSchema>>({
    resolver: zodResolver(createTradeSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      carManufacturer: '',
      carModel: '',
      year: 0,
      notes: ''
    }
  })
  async function onSubmit(values: z.infer<typeof createTradeSchema>) {
    console.log(values)
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex-1 space-y-12 p-8"
      >
        <section className="space-y-4">
          <h1 className="header">Welcome 👋</h1>
          <p className="text-dark-700">Add details about the car you want to trade.</p>
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Personal Information</h2>
          </div>

          {/* NAME */}

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="name"
            placeholder="John Doe"
            iconSrc="/assets/icons/user.svg"
            iconAlt="user"
          />

          {/* EMAIL & PHONE */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <div className='w-full'>
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="email"
                label="Email address"
                placeholder="johndoe@gmail.com"
                iconSrc="/assets/icons/email.svg"
                iconAlt="email"
              />
            </div>

            <div className='w-full'>
              <CustomFormField
                fieldType={FormFieldType.PHONE_INPUT}
                control={form.control}
                name="phone"
                label="Phone Number"
                placeholder="(555) 123-4567"
              />
            </div>
          </div>



          {/* Address & Occupation */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <div className="w-full">
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="carManufacturer"
                label="Car Manufacturer"
                placeholder="Porsche"
              />
            </div>

            <div className="w-full">
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="carModel"
                label="Car Model"
                placeholder="Cayman 718"
              />
            </div>
          </div>

          {/* Emergency Contact Name & Emergency Contact Number */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <div className="w-full">
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="Trim"
                label="Trim"
                placeholder="GT"
              />
            </div>
          </div>
        </section>

        <section className="space-y-6">
          {/* Description */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <div className="w-3/4">
              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="notes"
                label="Description"
                placeholder="Short description"
              />
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Identification and Verfication</h2>
          </div>

          <CustomFormField
            fieldType={FormFieldType.SKELETON}
            control={form.control}
            name="identificationDocument"
            label="Add car Images and relevant document"
            renderSkeleton={(field) => (
              <FormControl>
                <FileUploader files={field.value} onChange={field.onChange} />
              </FormControl>
            )}
          />
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Consent and Privacy</h2>
          </div>

          <CustomFormField
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name="treatmentConsent"
            label="I consent to receive car hub using this information."
          />

          <CustomFormField
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name="privacyConsent"
            label="I acknowledge that I have reviewed and agree to the
          privacy policy"
          />
        </section>

        <SubmitButton isLoading={isLoading}>Submit and Continue</SubmitButton>
      </form>
    </Form>
  )
}

export default TradeForm