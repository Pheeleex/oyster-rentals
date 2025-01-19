'use client'
import { useEffect, useState, useRef } from 'react';
import ScheduleDetails from '@/components/ClientSchedule';
import type { NextPage } from 'next';
import CarTrade from '@/components/CarTrade';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { auth } from '@/utils/firebase';
import { checkOrder } from '@/lib/actions/bookingactions';
import CustomButton from '@/components/CustomButton';
import TrackOrdersDialogBox from '@/components/TrackOrdersDialogBox';

const Home: NextPage = () => {
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null); // State for storing email
  const [Orders, setOrders] = useState<any[]>([]); // State for storing preorders
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State to control dialog visibil

  const openSchedule = () => setIsScheduleOpen(true);
  const closeSchedule = () => setIsScheduleOpen(false);
  const carTradeRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  // Get user data from localStorage on initial load
  useEffect(() => {
    const storedAuthInfo = localStorage.getItem("auth");
    if (storedAuthInfo) {
      const authInfo = JSON.parse(storedAuthInfo);
      setUserName(authInfo.name); // Set the username
      setUserEmail(authInfo.email); // Set the email
      console.log(authInfo); // Log the auth info for debugging
    }
  }, []);

  // Fetch preorders for the logged-in user
  useEffect(() => {
    if (userEmail) {
      const fetchPreOrders = async () => {
        try {
          const preOrdersData = await checkOrder(userEmail);
          console.log('Fetched Pre-Orders:', preOrdersData);
          setOrders(preOrdersData!); // Set the fetched preorders to state
        } catch (error) {
          console.error('Error fetching pre-orders:', error);
        }
      };

      fetchPreOrders();
    }
  }, [userEmail]); // Trigger when the email is set

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

  // Open the dialog box
  const openDialog = () => {
    setIsDialogOpen(true);
  };

  // Close the dialog box
  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const scrollToCarTrade = () => {
    carTradeRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col items-center justify-center">
      <header className="w-full bg-blue-200 text-white py-6 pt-10">
        <div className="container mx-auto text-center mt-12">
          <h1 className="text-3xl font-bold">Welcome, {userName}!</h1>
          {/* Conditionally render the preorder progress section */}
          {Orders.length > 0 && (
            <div className="mt-4 text-xl flex justify-center items-center">
              <CustomButton
                title='Track your orders'
                btnType='button'
                containerStyles="bg-primary-blue text-white
              rounded-full mt-10"
                rightIcon="/right-arrow.svg"
                handleClick={() => {
                  console.log('click');
                  openDialog()
                }}
              />
            </div>
          )}
        </div>
        {/* Render the dialog box if open */}
        {isDialogOpen && <TrackOrdersDialogBox orders={Orders} closeDialog={closeDialog} />}
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
          <Link href='/pre-order' className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
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
        userName={userName || 'Guest'}
      />
    </div>
  );
};

export default Home;
