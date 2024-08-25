'use client'
import Link from "next/link";
import Image from "next/image";
import CarIcon from "@/public/CarIcon";
import { signInWithGoogle, signOut } from "@/utils/Authentication";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { auth } from "@/utils/firebase";

const NavBar = () => {
  const router = useRouter(); // Use the router hook here
  const [signedIn, setSignedIn] = useState(false)
  const [user, setUser] = useState<any>(null); // Use appropriate type if known

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);


  const handleSignIn = async () => {
    const isSignedIn = await signInWithGoogle();
    if (isSignedIn) {
      router.push('/clients');
      setSignedIn(true)
    }
    console.log('signed in',isSignedIn )
  };

  const handleSignOut = async () => {
    await signOut();
    router.push('/'); // Redirect to home or sign-in page after sign-out
  };
  return(
  <header className='w-full absolute top-0 z-10'>
    <nav className='max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4 '>
      <Link href='/' className='flex justify-center items-center'>
        <h1 className="font-extrabold text-blue-800">CallisDreamMotors</h1>
        <CarIcon />
      </Link> 
      {user ? (
          <button 
            onClick={handleSignOut}
            className="bg-red-600 text-white p-2 rounded cursor-pointer"
          >
            Sign out
          </button>
        ) : (
          <button 
            onClick={handleSignIn}
            className="bg-blue-950 text-white p-2 rounded cursor-pointer"
          >
            Sign in
          </button>
        )}  
    </nav>
  </header>
)};

export default NavBar;
