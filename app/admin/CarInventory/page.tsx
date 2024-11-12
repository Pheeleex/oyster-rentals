'use client'

import { CarSpecProps } from "@/types"
import { addCars, auth, storage, updateCars } from "@/utils/firebase"
import { signOut } from "firebase/auth"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { v4 as uuidv4 } from 'uuid';
import EditCars from "./EditCars"
import { useRef, useState } from "react"
import { ref, uploadBytes } from "firebase/storage"
import { destroyCookie } from "nookies"
import SubmitButton from "@/components/SubmitButton"


const page = () => {
    const router = useRouter()
    const [isEditing, setIsEditing] = useState(false)
    const [isLoading, setisLoading] = useState(false)
    const formRef = useRef<HTMLDivElement>(null);

    const handleSignOut = async() => {
      sessionStorage.removeItem('admin')
      destroyCookie(null, 'admin', {
        path: '/',
        sameSite: 'None', // Ensures the cookie is properly destroyed
        secure: true, // Ensures the cookie is only destroyed over HTTPS
      })
      await signOut(auth)
      router.push('/')
    }

    const {register,
            formState:{errors},
            handleSubmit,
            setValue,
            setError,
            reset,
    } = useForm<CarSpecProps>()

    const handleEdit = (data: CarSpecProps) => {
      /*Populate data to its respective form fields */
      Object.keys(data).forEach((key) => {
        const field = key as keyof CarSpecProps
        setValue(field, data[field])
      });
      setValue('imageFiles', []);
      setIsEditing(true)
      formRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
    

    const onSubmit = async(data: CarSpecProps) => {
      if(isEditing){
        // Update form data using new values entered
      const updatedData: Partial<CarSpecProps> = {};

        for (const [key, value] of Object.entries(data)) {
          if (value !== undefined && value !== null) {
            updatedData[key as keyof CarSpecProps] = value as any;
          }
        }

        if (Array.isArray(data.imageFiles) && data.imageFiles?.length > 0) {
          if (!data.ImagePath) {
            setError('ImagePath', {
              type: 'server',
              message: 'Image path must be provided if uploading new images.'
            });
            return;
          }
          updatedData.ImagePath = data.ImagePath;
          const imageFilesArray = Array.from(data.imageFiles);


          await Promise.all(
            imageFilesArray.map((file, index) => {
              const storageRef = ref(storage, `${data.ImagePath}/${data.ImagePath}${index + 1}`);
              return uploadBytes(storageRef, file);
            })
          )
        }
        else {
          updatedData.ImagePath = data.ImagePath;
        }
        // Remove imageFiles from updatedData before updating Firestore
      delete updatedData.imageFiles;
        await updateCars(data.id!, updatedData);
        reset()
      }
            else{
            const carData = {
                          ...data, 
                          id: uuidv4()
                        }
                        try {
                          // Pass imageFiles and ImagePath to addCars, but remove them from carData
                          await addCars(carData, data.imageFiles || [], data.ImagePath || '');
                          // Reset the form after submission
                          reset();
                          // Redirect or give feedback to the user
                        } catch (error) {
                          console.error('Error adding car:', error);
                        }
            }
                      
    }
    return(
        <div className="flex flex-col justify-center items-center">
         <div className="mt-32 flex flex-col justify-center items-center">
          <h1>Hello</h1>
          <button className="bg-red-700 text-white p-2 rounded cursor-pointer" onClick={handleSignOut}>
            SignOut
          </button>
          </div>
            <div ref={formRef} className="bg-blue-400 p-8 rounded-lg shadow-md w-full md:w-[34rem] lg:w-[40rem] mt-12 ">
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
              <p className="text-red-900">{errors.Make.message}</p>
            )}
          </div>
          
          <div className="mb-4">
            <label className="block text-blue-900 mb-2">Model</label>
            <input
              {...register("Model", { required: 'Brand Model is required' })}
              type="text"
              className="w-full p-2 border border-blue-300 rounded focus:outline-none focus:border-blue-500"
            />
            {errors.Make && (
              <p className="text-red-900">{errors.Make?.message}</p>
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
              <p className="text-red-900">{errors.Drive?.message}</p>
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
              <p className="text-red-900">{errors.FuelType?.message}</p>
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
              <p className="text-red-900">{errors.Transmission?.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-blue-900 mb-2">Images</label>
            <input
              {...register("imageFiles", { required: 'Please add Images' })}
              type="file"
              multiple
              className="w-full p-2 border border-blue-300 rounded focus:outline-none focus:border-blue-500"
            />
            {errors.imageFiles && (
              <p className="text-red-900">{errors.imageFiles.message}</p>
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
              <p className="text-red-900">{errors.ImagePath?.message}</p>
            )}
          </div>
          <SubmitButton isLoading={isLoading}>Submit </SubmitButton>
            </form>
        </div>
            <EditCars onEdit={handleEdit}
            initialLimit={10}
            make=""
            model=""
            year={2022}
            fuel=""
            />
        </div>
    )
} 
export default page


/*  */