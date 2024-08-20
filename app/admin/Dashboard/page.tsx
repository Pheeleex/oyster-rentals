'use client'

import { CarSpecProps } from "@/types"
import { auth } from "@/utils/firebase"
import { signOut } from "firebase/auth"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"



const page = () => {
    const router = useRouter()
    const {register,
            formState:{errors},
            handleSubmit,
            reset,
    } = useForm<CarSpecProps>()

    const onSubmit = async(data: CarSpecProps) => {
            console.log(data)
            reset()
    }
    return(
        <div className="flex justify-center items-center">
            <div className="bg-blue-400 p-8 rounded-lg shadow-md w-full md:w-[34rem] lg:w-[40rem] mt-48 ">
             <h2 className="text-xl font-semibold mb-4">Add Cars</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
            <label className="block text-blue-900 mb-2">Make</label>
            <input
              {...register("Make", { required: 'Car brand is required' })}
              type="text"
              className="w-full p-2 border border-blue-300 rounded focus:outline-none focus:border-blue-500"
            />
            {errors.Make && (
              <p className="text-blue-900">{errors.Make.message}</p>
            )}
          </div>
          
          <div className="mb-4">
            <label className="block text-blue-900 mb-2">Model</label>
            <input
              {...register("Make", { required: 'Brand Model is required' })}
              type="text"
              className="w-full p-2 border border-blue-300 rounded focus:outline-none focus:border-blue-500"
            />
            {errors.Make && (
              <p className="text-blue-900">{errors.Make?.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-blue-900 mb-2">Drive</label>
            <input
              {...register("Drive", { required: 'Drive is required' })}
              type="text"
              className="w-full p-2 border border-blue-300 rounded focus:outline-none focus:border-blue-500"
            />
            {errors.Drive && (
              <p className="text-blue-900">{errors.Drive?.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-blue-900 mb-2">Fuel type</label>
            <input
              {...register("FuelType", { required: 'Fuel type is required' })}
              type="text"
              className="w-full p-2 border border-blue-300 rounded focus:outline-none focus:border-blue-500"
            />
            {errors.FuelType && (
              <p className="text-blue-900">{errors.FuelType?.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-blue-900 mb-2">Transmission</label>
            <input
              {...register("Transmission", { required: 'Transmission is required' })}
              type="text"
              className="w-full p-2 border border-blue-300 rounded focus:outline-none focus:border-blue-500"
            />
            {errors.Transmission && (
              <p className="text-blue-900">{errors.Transmission?.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-blue-900 mb-2">Images</label>
            <input
              {...register("images", { required: 'Please add Images' })}
              type="file"
              className="w-full p-2 border border-blue-300 rounded focus:outline-none focus:border-blue-500"
            />
            {errors.images && (
              <p className="text-blue-900">{errors.images?.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-blue-900 mb-2">Image Path</label>
            <input
              {...register("ImagePath", { required: 'Add image path' })}
              type="text"
              className="w-full p-2 border border-blue-300 rounded focus:outline-none focus:border-blue-500"
            />
            {errors.ImagePath && (
              <p className="text-blue-900">{errors.ImagePath?.message}</p>
            )}
          </div>
          <button className="bg-white text-blue-400 p-2 rounded">Submit</button>
            </form>
        </div>
        </div>
    )
} 
export default page


/*  */