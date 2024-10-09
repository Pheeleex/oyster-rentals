import { signInWithGoogle } from '@/utils/Authentication';
import { useRouter } from 'next/navigation';
import React from 'react'

const Success = () => {
  const router = useRouter()
  const handleSignIn = async () => {
    const isSignedIn = await signInWithGoogle();
    if (isSignedIn) {
      router.push('/clients');
    }
  };
  return (
    <div>
        <h1>Your order has been created and will be submitted soon, 
            create an account with us to follow through with the process, track your car order
            and get information easily</h1>
            <button 
              onClick={handleSignIn}
              className="bg-blue-950 text-white p-2 rounded cursor-pointer"
            >
              Sign in
            </button>
    </div>
  )
}

export default Success