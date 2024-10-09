'use client'
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import ScheduleDetails from '@/components/ClientSchedule';
import type { NextPage } from 'next';
import CarTrade from '@/components/CarTrade';

import { CarSpecProps, HomeProps } from '@/types';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { auth } from '@/utils/firebase';



const Home: NextPage = () => {
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [userName, setUserName] = useState<string | null>(null)
  const openSchedule = () => setIsScheduleOpen(true);
  const closeSchedule = () => setIsScheduleOpen(false);
  const carTradeRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

useEffect(() => {
  const storedAuthInfo = localStorage.getItem("auth");
  if (storedAuthInfo) {
    const authInfo = JSON.parse(storedAuthInfo);
    setUserName(authInfo.name); // Set the username in state
  }
},[])

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        // If the user is not signed in, redirect to the sign-in page
        router.push('/');
      }
    });

    // Cleanup the subscription on unmount
    return () => unsubscribe();
  }, [router]);

  const scrollToCarTrade = () => {
    carTradeRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col items-center justify-center">
      <header className="w-full bg-blue-200 text-white py-6 pt-10">
        <div className="container mx-auto text-center mt-12">
          <h1 className="text-3xl font-bold">Welcome, {userName}!</h1>
          <div className="mt-4 text-xl">
            <p>Your Range Rover Velar Awaits</p>
          </div>
        </div>
      </header>
      <main className="flex flex-col md:flex-row items-center justify-center p-6 gap-12">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-[20rem] min-h-[15rem] text-center flex flex-col justify-between">
          <h3 className="text-xl font-semibold mb-2">Schedule Maintenance/Report Vehicle Fault</h3>
          <p className="mb-4">Schedule your next maintenance or report any issues with your vehicle.</p>
          <button
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            onClick={openSchedule}
          >
            Schedule
          </button>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-[20rem] min-h-[15rem] text-center flex flex-col justify-between">
          <h3 className="text-xl font-semibold mb-2">Trade-In Offers</h3>
          <p className="mb-4">Check the current trade-in value of your vehicle and explore upgrade options.</p>
          <button onClick={scrollToCarTrade}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >Check Offers</button>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-[20rem] min-h-[15rem] text-center flex flex-col justify-between">
          <h3 className="text-xl font-semibold mb-2">New Car Requests</h3>
          <p className="mb-4">Can't find a car you want in our inventory?
            Click here to see a more diverse inventory of cars, place a request and we will get back to you
          </p>
          <Link href='clients/review' className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
          Visit Directory
          </Link>
        </div>
      </main>
      <div className='mt-20 w-[85%]' ref={carTradeRef}>
        <CarTrade 
          initialLimit={5}
          make=''
          model=''
          year={2022}
          fuel='' />
      </div>
      <ScheduleDetails 
        isOpen={isScheduleOpen} 
        closeModal={closeSchedule} 
        userName= {userName || 'Guest'}
      />
    </div>
  );
};

export default Home;
