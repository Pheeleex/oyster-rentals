'use client';
import Link from "next/link";
import Image from "next/image";
import CarIcon from "@/public/CarIcon";
import { signInWithGoogle, signOut } from "@/utils/Authentication";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { auth } from "@/utils/firebase";
import { onAuthStateChanged } from "firebase/auth";

const NavBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const authInfo = {
          userId: currentUser.uid,
          name: currentUser.displayName,
          photoURL: currentUser.photoURL,
          isAuth: true,
        };

        setUser(authInfo);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  const handleSignIn = async () => {
    const isSignedIn = await signInWithGoogle();
    if (isSignedIn) {
      router.push('/clients');
    }
  };

  const handleSignOut = async () => {
    await signOut();
    setDropdownOpen(false);
    setUser(null);
    router.push('/');
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header className='w-full absolute top-0 z-10'>
      <nav className='max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4'>
      <Link href='/' className='flex justify-center 
        items-center'>
        <Image
          src='/logo.svg'
          alt='logo'
          width={118}
          height={18}
          className='object-contain'
        />
      </Link>
        {!pathname.startsWith('/admin') && (
          user ? (
            <div className="relative">
              <div 
                className="cursor-pointer flex items-center space-x-2"
                onClick={toggleDropdown}
              >
                <Image
                  src={user.photoURL || "/default-avatar.png"} 
                  alt="User Avatar"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
               
              </div>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
                  <Link href="/clients" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                    Dashboard
                  </Link>
                  <button 
                    onClick={handleSignOut}
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
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
