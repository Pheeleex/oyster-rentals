'use client'

import { CarSpecProps } from "@/types"
import { auth } from "@/utils/firebase"
import { signOut } from "firebase/auth"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"



const page = () => {
    const router = useRouter()
    const {register,
            formState:{errors}
    } = useForm<CarSpecProps>()
    return(
        <div className="flex justify-center items-center">
            <div className="bg-blue-400 p-8 rounded-lg shadow-md w-full md:w-[34rem] lg:w-[40rem] mt-48 ">
             <h2 className="text-xl font-semibold mb-4">Add Properties</h2>
            <form>
            <div className="mb-4">
            <label className="block text-blue-900 mb-2">Price per day:</label>
            <input
              {...register("Make", { required: 'Rent is required' })}
              type="text"
              className="w-full p-2 border border-blue-300 rounded focus:outline-none focus:border-blue-500"
            />
            {errors.Make && (
              <p className="text-blue-500">{errors.Make.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-blue-900 mb-2">Model</label>
            <input
              {...register("Model", { required: 'Rent is required' })}
              type="text"
              className="w-full p-2 border border-blue-300 rounded focus:outline-none focus:border-blue-500"
            />
            {errors.Model && (
              <p className="text-blue-500">{errors.Model?.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-blue-900 mb-2">Drive</label>
            <input
              {...register("Drive", { required: 'Rent is required' })}
              type="text"
              className="w-full p-2 border border-blue-300 rounded focus:outline-none focus:border-blue-500"
            />
            {errors.Drive && (
              <p className="text-blue-500">{errors.Drive?.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-blue-900 mb-2">Fuel type</label>
            <input
              {...register("FuelType", { required: 'Rent is required' })}
              type="text"
              className="w-full p-2 border border-blue-300 rounded focus:outline-none focus:border-blue-500"
            />
            {errors.FuelType && (
              <p className="text-blue-500">{errors.FuelType?.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-blue-900 mb-2">Transmission</label>
            <input
              {...register("Transmission", { required: 'Rent is required' })}
              type="text"
              className="w-full p-2 border border-blue-300 rounded focus:outline-none focus:border-blue-500"
            />
            {errors.Transmission && (
              <p className="text-blue-500">{errors.Transmission?.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-blue-900 mb-2">Image Path</label>
            <input
              {...register("ImagePath", { required: 'Rent is required' })}
              type="text"
              className="w-full p-2 border border-blue-300 rounded focus:outline-none focus:border-blue-500"
            />
            {errors.ImagePath && (
              <p className="text-blue-500">{errors.Transmission?.message}</p>
            )}
          </div>
            </form>
        </div>
        </div>
    )
} 
export default page