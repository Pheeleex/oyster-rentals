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
    <div className='flex flex-col m-16 p-16 justify-center items-center'>
      <h1>Sign In</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={handleSignIn} disabled={loading}>
        {loading ? "Signing in..." : "Sign in with Google"}
      </button>
    </div>
  );
};
export default SignIn