'use client'
import { signInWithGoogle } from '@/utils/Authentication';
import { useRouter } from 'next/navigation'; // For Next.js 13+
import { useState } from 'react';

const SignIn: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async () => {
    setLoading(true);
    setError(null);
    const success = await signInWithGoogle();
    setLoading(false);
    
    if (success) {
      router.push('/'); // Redirect to the homepage or any other page
    } else {
      setError("Failed to sign in. Please try again.");
    }
  };

  return (
    <div className='flex justify-center items-center my-[10rem]'>
      <div className="flex flex-col items-center justify-center border-gray-800 rounded-md border-2 p-16">
      <h1 className="text-blue text-2xl mb-5">Sign In</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={handleSignIn} disabled={loading} 
      className="w-full p-3 bg-indigo-600 rounded text-white hover:bg-indigo-500">
        {loading ? "Signing Up..." : "Sign Up with Google"}
      </button>
    </div>
    </div>
  );
};
export default SignIn