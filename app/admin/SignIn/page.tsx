'use client'
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';
import { auth } from '@/utils/firebase';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import { destroyCookie, setCookie } from 'nookies';

type Inputs = {
  error: string,
  email: string,
  password: string
}



const SignIn = () => {
  const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<Inputs>({
    
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { email, password } = data;

    try {
      await signInWithEmailAndPassword(email, password);

      if (user) {
        sessionStorage.setItem('admin', JSON.stringify(user));
        // Set the auth token in a cookie
        setCookie(null, 'admin', JSON.stringify(user), {
          maxAge: 30 * 24 * 60 * 60, // 30 days
          path: '/',
        });
        router.push('./Dashboard');
      }else{
        if (error) {
          const errorMessage = error.message || "An error occurred";
          setError("password", {
            type: "server",
            message: errorMessage,
          });
          console.log(errorMessage)
        }
      }
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-800 p-10 rounded-lg shadow-xl w-96">
        <h1 className="text-white text-2xl mb-5">Sign In</h1>
        <input
          {...register("email", { required: 'Email is required' })}
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
        />
        {errors.email && (
          <p className="text-red-500">{errors.email.message}</p>
        )}
        <input
          {...register("password", { required: 'Password is required' })}
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
        <button
          type="submit"
          className="w-full p-3 bg-indigo-600 rounded text-white hover:bg-indigo-500"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Signing In...' : 'Sign In'}
        </button>
        <div className='mt-8'>
          <p>New User?
            <Link href={'./SignUp'} className='text-white'> Create an Account here </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignIn;