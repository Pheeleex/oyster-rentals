'use server'

import { AppointmentProps, PreOrderProps, SetTestDrive, TestDriveProps } from "@/types";
import { db } from "@/utils/firebase";
import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, Timestamp, updateDoc, where } from "firebase/firestore";
import { parseStringify } from "../utils";
import axios from 'axios';
import { revalidatePath } from "next/cache";
import { ref } from "firebase/storage";


/*TESRDRIVES*/
export const createCarBooking = async ({carId, ...testDrive}:TestDriveProps) => {
    try {
      const testDriveRef = collection(db, 'carTestDrive');
      
      // Include the createdAt field with the current timestamp
      const testDriveWithTimestamp = {
        ...testDrive,
        carId,
        createdAt: Timestamp.fromDate(new Date())
      };
  
      // Add the document to Firestore
      const docRef = await addDoc(testDriveRef, testDriveWithTimestamp);
  
      
      // Return the document ID or other useful information
      return testDriveWithTimestamp
    } catch (error) {
      console.error('Error adding appointment:', error);
      throw error;
    }
  };

  export const createPreOrder = async ({orderId, ...testDrive}:PreOrderProps) => {
    try {
      const preOrderRef = collection(db, 'carPreOrder');
      
      // Include the createdAt field with the current timestamp
      const preOrderWithTimestamp = {
        ...testDrive,
        createdAt: Timestamp.fromDate(new Date()),
      };
  
      // Add the document to Firestore
      const docRef = await addDoc(preOrderRef, preOrderWithTimestamp);
  
     
      // Return the document ID or other useful information
      const newPreOrder = {
        ...preOrderWithTimestamp,
        orderId: docRef.id
      };
      return newPreOrder
    } catch (error) {
      console.error('Error adding appointment:', error);
      throw error;
    }
  };


  export const fetchCarBooking = async () => {
    const carBookingRef = collection(db, 'carTestDrive');
    const testDriveQuery = query(carBookingRef, orderBy("createdAt", 'desc')); // Ordering by createdAt in descending order
    const querySnapshot = await getDocs(testDriveQuery);
  
    const testDriveData = querySnapshot.docs.map((doc) => {
      const data = doc.data();
  
      // Convert Firestore Timestamp to JavaScript Date object
      return {
        ...data,
        TestDriveId: doc.id,
        createdAt: data.createdAt.toDate(), // Convert createdAt to Date
        schedule: data.schedule.toDate(), // Convert schedule to Date
      };
    }) as TestDriveProps[];

    // Initial counts for each status
    const initialCounts = {
      scheduledCount: 0,
      pendingCount: 0,
      cancelledCount: 0,
    };

    // Reduce over appointments to calculate the counts based on status
    const counts = testDriveData.reduce((acc, appointment) => {
      //@ts-ignore
      if (appointment.status === 'confirmed') {
        acc.scheduledCount += 1;
      } else if (appointment.status === 'pending') {
        acc.pendingCount += 1;
      } else if (appointment.status === 'cancelled') {
        acc.cancelledCount += 1;
      }
      return acc;
    }, initialCounts);

   

    const data = {
      totalCount: querySnapshot.size,  // Total number of documents fetched
      ...counts,                             // Spread the counts
      documents: testDriveData,               // The appointments array
    };

    // Return the result as a stringified object (if needed)
    return parseStringify(data)  
  };
  
  export const updateCarBooking = async (userId: string, bookingToUpdate: { testDrive: Partial<TestDriveProps>, type: string }) => {
    const TestDriveId = bookingToUpdate.testDrive.TestDriveId; // Get the id from the appointment object
    if (!TestDriveId) {
      throw new Error("Appointment ID is required for updating an appointment.");
    }
  
    try {
      const bookingRef = doc(db, 'carTestDrive', TestDriveId); // Reference the specific document
  
      // Update the document with new values
      const updatedBooking = await updateDoc(bookingRef, {
        ...bookingToUpdate.testDrive,
        // Add any other fields to update if necessary
      });
      revalidatePath('/admin/Dashboard')
      return updatedBooking
    } catch (error) {
      console.error('Error updating appointment:', error);
      throw error; // Propagate the error
    }
  };

  export const deleteBooking = async (
    id: string,
    setTestDrive: SetTestDrive
  ): Promise<void> => {
    try {
      // Delete document from Firestore
      await deleteDoc(doc(db, 'carTestDrive', id));
      
      // Update local state to reflect the deletion
      setTestDrive((prevTest) => prevTest.filter((test) => test.TestDriveId !== id));
    } catch (error: unknown) {
      // More robust error logging with type safety for `unknown` error
      if (error instanceof Error) {
        console.error(`Error deleting car booking with id ${id}:`, error.message);
      } else {
        console.error(`An unknown error occurred while deleting car booking with id ${id}`);
      }
    }
  };
  


  export const updatePreOrder = async (userId: string, orderToUpdate: { order: Partial<PreOrderProps>, type: string }) => {
    const orderId = orderToUpdate.order.orderId; // Get the id from the appointment object
    if (!orderId) {
      throw new Error("Appointment ID is required for updating an appointment.");
    }
  
    try {
      const bookingRef = doc(db, 'carPreOrder', orderId); // Reference the specific document
  
      // Update the document with new values
      const updatedOrder = await updateDoc(bookingRef, {
        ...orderToUpdate.order
        // Add any other fields to update if necessary
      });
     
      revalidatePath('/admin/Dashboard')
      return updatedOrder
    } catch (error) {
      console.error('Error updating appointment:', error);
      throw error; // Propagate the error
    }
  };

  export const fetchPreOrder = async (userId?: string) => {
    const preOrderRef = collection(db, 'carPreOrder');
    const preOrderQuery =  query(preOrderRef, orderBy("createdAt", 'desc'));  // If no userId, fetch all pre-orders

    const querySnapshot = await getDocs(preOrderQuery);
  
    const preOrderData = querySnapshot.docs.map((doc) => {
      const data = doc.data();
  
      // Convert Firestore Timestamp to JavaScript Date object
      return {
        ...data,
        orderId: doc.id,
        createdAt: data.createdAt.toDate(), // Convert createdAt to Date
      };
    }) as PreOrderProps[];

   
    // Initial counts for each status
    const initialCounts = {
      scheduledCount: 0,
      pendingCount: 0,
      cancelledCount: 0,
    };

    // Reduce over appointments to calculate the counts based on status
    const counts = preOrderData.reduce((acc, order) => {
      //@ts-ignore
      if (order.status === 'confirmed') {
        acc.scheduledCount += 1;
      } else if (order.status === 'pending') {
        acc.pendingCount += 1;
      } else if (order.status === 'cancelled') {
        acc.cancelledCount += 1;
      }
      return acc;
    }, initialCounts);


    const data = {
      totalCount: querySnapshot.size,  // Total number of documents fetched
      ...counts,                             // Spread the counts
      documents: preOrderData,               // The appointments array
    };

    // Return the result as a stringified object (if needed)
    return parseStringify(data)  
  };

  export const ScheduleAppointment = async ({id, ...appointment}:AppointmentProps) =>  {
    try {
      const scheduleRef = collection(db, 'servicingAppointments');
      
      // Include the createdAt field with the current timestamp
      const scheduleWithTimestamp = {
        ...appointment,
        createdAt: Timestamp.fromDate(new Date()),
      };
  
      // Add the document to Firestore
      const docRef = await addDoc(scheduleRef, scheduleWithTimestamp);
      // Return the document ID or other useful information
      const newAppointment= {
        ...scheduleWithTimestamp,
      };
      return newAppointment
    } catch (error) {
      console.error('Error adding appointment:', error);
      throw error;
    }
  }

  export const fetchAppointments = async () => {
    const appointmentRef = collection(db, 'servicingAppointments');
    const appointmentQuery = query(appointmentRef, orderBy("createdAt", 'desc')); // Ordering by createdAt in descending order
    const querySnapshot = await getDocs(appointmentQuery);
  
    const appointmentData = querySnapshot.docs.map((doc) => {
      const data = doc.data();
  
      // Convert Firestore Timestamp to JavaScript Date object
      return {
        ...data,
        appointmentId: doc.id,
        createdAt: data.createdAt.toDate(), // Convert createdAt to Date
        schedule: data.schedule.toDate()
      };
    }) as AppointmentProps[];

   
    // Initial counts for each status
    const initialCounts = {
      scheduledCount: 0,
      pendingCount: 0,
      cancelledCount: 0,
    };

    // Reduce over appointments to calculate the counts based on status
    const counts = appointmentData.reduce((acc, order) => {
      //@ts-ignore
      if (order.status === 'confirmed') {
        acc.scheduledCount += 1;
      } else if (order.status === 'pending') {
        acc.pendingCount += 1;
      } else if (order.status === 'cancelled') {
        acc.cancelledCount += 1;
      }
      return acc;
    }, initialCounts);


    const data = {
      totalCount: querySnapshot.size,  // Total number of documents fetched
      ...counts,                             // Spread the counts
      documents: appointmentData,               // The appointments array
    };

    // Return the result as a stringified object (if needed)
    return parseStringify(data)  
  };

  export const updateSchedule = async (userId: string, appointmentToUpdate: { appointment: Partial<AppointmentProps>, type: string }) => {
    const appointmentId = appointmentToUpdate.appointment.appointmentId; // Get the id from the appointment object
    if (!appointmentId) {
      throw new Error("Appointment ID is required for updating an appointment.");
    }
  
    try {
      const appointmentRef = doc(db, 'servicingAppointments', appointmentId); // Reference the specific document
      // Update the document with new values
      const updatedAppointment = await updateDoc(appointmentRef, {
        ...appointmentToUpdate.appointment
        // Add any other fields to update if necessary
      });
      revalidatePath('/admin/Dashboard')
      return updatedAppointment
    } catch (error) {
      console.error('Error updating appointment:', error);
      throw error; // Propagate the error
    }
  };