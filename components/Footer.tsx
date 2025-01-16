'use client'
import { footerLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import PassKeyModal from "./PassKeyModal";
import { useEffect, useState } from "react";  // Import useState
import { SearchParamProps } from "@/types";
import { Router } from "next/router";
import { useRouter } from "next/navigation";


// Utility function to retrieve a cookie value
function getCookie(name: string) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
}

const Footer = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // State to track if modal is open
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter()

  useEffect(() => {
    // Check for the 'accessKey' cookie on the client side
    const accessKey = getCookie('accessKey');

    if (accessKey) {
      // If cookie exists, consider the user logged in
      setIsLoggedIn(true);
    }
  }, [isLoggedIn]);

  // Function to open the modal
  const handleAdminClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault(); // Prevent default link behavior
   if(!isLoggedIn) {
    setIsModalOpen(true)
   } else{
    router.push("/admin")
   }
  };

  return (
    <footer className='flex flex-col text-black-100  mt-16 border-t border-gray-100'>
      {/* Render PassKeyModal and control its visibility */}
      {
        isModalOpen && <PassKeyModal closeModal={() => setIsModalOpen(false)}   /> }
    
      <div className='flex max-md:flex-col flex-wrap justify-between gap-5 sm:px-16 px-6 py-10'>
        <div className='flex flex-col justify-start items-start gap-6'>
          <Image src='/logo.svg' alt='logo' width={118} height={18} className='object-contain' />
          <p className='text-base text-gray-700'>
            Carhub 2023 <br />
            All Rights Reserved &copy;
          </p>
        </div>

        <div className="footer__links">
          {footerLinks.map((link) => (
            <div key={link.title} className="footer__link">
              <h3 className="font-bold">{link.title}</h3>
              <div className="flex flex-col gap-5">
                {link.links.map((item) => (
                  <Link key={item.title} href={item.url} className="text-gray-500">
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='flex justify-between items-center flex-wrap mt-10 border-t border-gray-100 sm:px-16 px-6 py-10'>
        <p>@2023 CarHub. All rights reserved</p>

        <div className="footer__copyrights-link">
          <Link href="/" className="text-gray-500">
            Privacy & Policy
          </Link>
          <Link href="/" className="text-gray-500">
            Terms & Condition
          </Link>
          {/* Updated Admin Dashboard link to open the modal */}
          <Link href="/admin" className="text-gray-500" onClick={handleAdminClick}>
            Admin Dashboard
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
