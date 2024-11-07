'use client';
import { auth, provider } from "@/utils/firebase";
import { signInWithPopup } from "firebase/auth";
import { destroyCookie, setCookie } from 'nookies';

export const signInWithGoogle = async (): Promise<boolean> => {
  try {
    await signInWithPopup(auth, provider);
    const authInfo = {
      userId: auth.currentUser?.uid,
      name: auth.currentUser?.displayName,
      isAuth: true,
    };

    // Set the auth token in a cookie
    setCookie(null, 'auth', JSON.stringify(authInfo), {
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: '/',
    });

    localStorage.setItem("auth", JSON.stringify(authInfo));
    return true; // Sign-in was successful
  } catch (error: any) {
    console.error("Authentication error:", error);
    if (error.code === "auth/popup-closed-by-user") {
      console.log("Authentication popup closed by the user.");
    } else {
      console.error("Authentication error:", error.message);
    }
    return false; // Sign-in failed
  }
};

export const signOut = async (): Promise<void> => {
    try {
      auth.signOut(); // Use the correct signOut method
      localStorage.removeItem("auth");

      //clear auth cookie
      destroyCookie(null, 'auth')
      console.log("Signed out successfully");
    } catch (error: any) {
      console.error("Sign-out error:", error.message);
    }
  };


  