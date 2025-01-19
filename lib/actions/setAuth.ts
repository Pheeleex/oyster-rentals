'use server'
import { cookies } from "next/headers";

export async function getCookie() {
  const cookieStore = await cookies(); // Get the cookies from the request header
  
  // Access the 'accessKey' cookie value
  const passkeyCookie = cookieStore.get('accessKey');
  
  if (passkeyCookie) {
    console.log('accessKey:', passkeyCookie.value);
    try {
      return passkeyCookie.value; // Return the value of the cookie
    } catch (error) {
      console.error('Error retrieving accessKey cookie:', error);
      return null; // Or return an appropriate fallback
    }
  }

  return null; // Return null if the 'accessKey' cookie is not found
}
