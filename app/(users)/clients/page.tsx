'use client'
import { useRef, useState } from 'react';
import ScheduleDetails from '@/components/ClientSchedule';
import type { NextPage } from 'next';
import CarTrade from '@/components/CarTrade';

import { CarSpecProps, HomeProps } from '@/types';
import Link from 'next/link';


interface Props {
  userName: string;
}

const Home: NextPage<Props> = ({ userName }) => {
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const openSchedule = () => setIsScheduleOpen(true);
  const closeSchedule = () => setIsScheduleOpen(false);
  const carTradeRef = useRef<HTMLDivElement>(null);

  const scrollToCarTrade = () => {
    carTradeRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col items-center justify-center">
      <header className="w-full bg-blue-200 text-white py-6">
        <div className="container mx-auto text-center">
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
            Go
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
          <p className="mb-4">Request information or schedule a test drive for new car models.</p>
          <Link href='clients/review' className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">Request Info</Link>
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
      />
    </div>
  );
};

export default Home;
