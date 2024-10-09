'use client'

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { signInWithGoogle } from '@/utils/Authentication';
import Image from 'next/image';
import Link from 'next/link';
import { fetchPreOrder } from '@/lib/actions/bookingactions';
import { moreProps, PreOrderProps } from '@/types';

const Page = () => {
  // Use router to get the userId from the URL
  const router = useRouter();
  const {id} = useParams()
  const [preorderDetails, setPreorderDetails] = useState<PreOrderProps | null>(null); 
  // Log the user ID to confirm it's correct
  useEffect(() => {
    console.log('User ID from URL:', id);

    const getPreorderDetails = async () => {
      try {
        const data = await fetchPreOrder(); // Call the fetch function without userId to get all preorders
        // Check if the userId matches any of the fetched preorder userIds
        console.log(data)
        const documents = data.documents as PreOrderProps[]
        const foundUser = documents.find((order) => order.userId === id);
        
        if (foundUser) {
          console.log('Found user:', foundUser); // Log the found user details
          setPreorderDetails(foundUser); // Set the found user details to state
        } else {
          console.log('No matching user found.'); // Log if no user is found
        }
      } catch (error) {
        console.error("Error fetching preorder details:", error);
      }
    };
getPreorderDetails()  
  }, []);

  


  const handleSignIn = async () => {
    const isSignedIn = await signInWithGoogle();
    if (isSignedIn) {
      router.push('/clients');
    }
  };

  return (
    <div className="flex-h-screen max-h-screen p-[5%]">
      <div className="success-img">
        <Link href="/">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="logo"
            className="h-10 w-fit"
          />
        </Link>
        <section className="flex flex-col items-center">
          <Image
            src="/assets/gifs/success.gif"
            height={300}
            width={280}
            alt="success"
          />
          <h2 className="header mb-6 max-w-[600px] text-center">
            Your <span className="text-green-500">preorder request</span> has
            been successfully submitted!
          </h2>
          <p>Create an account with us to see real-time updates and track your order.</p>
          <section>
            <p>{preorderDetails?.carManufacturer} {preorderDetails?.carModel}</p>
          </section>
          <button 
            onClick={handleSignIn}
            className="bg-blue-950 text-white p-2 rounded cursor-pointer mt-2"
          >
            Sign in
          </button>
        </section>
      </div>
    </div>
  );
};

export default Page;
