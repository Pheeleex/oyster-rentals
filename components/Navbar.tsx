'use client';
import Link from "next/link";
import Image from "next/image";
import CarIcon from "@/public/CarIcon";
import { signInWithGoogle, signOut } from "@/utils/Authentication";
import { useRouter, usePathname } from "next/navigation"; // Import usePathname
import { useEffect, useState } from "react";
import { auth } from "@/utils/firebase";
import { parseCookies } from "nookies";

const NavBar = () => {
  const router = useRouter();
  const pathname = usePathname(); // Get the current pathname
  const [user, setUser] = useState<any>(null);
  const cookies = parseCookies();


  useEffect(() => {
    // Check cookies for client authentication status
    const authCookie = cookies.auth ? JSON.parse(cookies.auth) : null;

    if (authCookie && authCookie.isAuth) {
      setUser(authCookie); // Set the user if authenticated
    } else {
      setUser(null); // Clear the user if not authenticated
    }
  }, [cookies]);

  const handleSignIn = async () => {
    const isSignedIn = await signInWithGoogle();
    if (isSignedIn) {
      router.push('/clients');
    }
  };

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  return (
    <header className='w-full absolute top-0 z-10'>
      <nav className='max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4'>
        <Link href='/' className='flex justify-center items-center'>
          <h1 className="font-extrabold text-blue-800">CallisDreamMotors</h1>
          <CarIcon />
        </Link>

          {/* Conditionally render the sign-in/sign-out button */}
          {!pathname.startsWith('/Admin') && ( // Check if pathname starts with /Admin
          user && ( 
            <Link href='/clients' className="text-grey bg-blue  p-2">Client Dashboard</Link>
          )
        ) }
        
        {/* Conditionally render the sign-in/sign-out button */}
        {!pathname.startsWith('/Admin') && ( // Check if pathname starts with /Admin
          user ? (
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
          )
        )}
      </nav>
    </header>
  );
};

export default NavBar;
