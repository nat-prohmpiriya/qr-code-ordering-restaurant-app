'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { AuthInput } from '@/components/auth/AuthInput';
import { AuthButton } from '@/components/auth/AuthButton';
import { sendPasswordResetEmail } from '@/lib/auth';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const validateEmail = () => {
    if (!email) {
      setError('Email is required');
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail()) return;

    setIsLoading(true);
    setError('');

    try {
      await sendPasswordResetEmail(email);
      setEmailSent(true);
    } catch (error: any) {
      let errorMessage = 'Failed to send reset email. Please try again.';

      if (error.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address';
      }

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (emailSent) {
    return (
      <div className="bg-white rounded-3xl shadow-sm p-8 md:p-10">
        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>

        <div className="text-center py-8">
          <div className="w-24 h-24 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
            <svg
              className="w-12 h-12 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1 className="text-2xl font-bold mb-3">Email Sent!</h1>
          <p className="text-gray-600 mb-8">
            We've sent a password reset link to
            <br />
            <span className="font-semibold text-gray-900">{email}</span>
          </p>

          <AuthButton onClick={() => router.push('/login')}>
            Back to Login
          </AuthButton>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-sm p-8 md:p-10">
      <Link
        href="/login"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
      </Link>

      <h1 className="text-3xl font-bold text-center mb-3">Forgot</h1>

      <div className="my-8 flex justify-center">
        <div className="relative w-64 h-64">
          <svg
            viewBox="0 0 200 200"
            className="w-full h-full"
            fill="none"
          >
            {/* Illustration placeholder - simplified version */}
            <circle cx="100" cy="80" r="40" fill="#E5E7EB" />
            <rect x="70" y="110" width="60" height="70" rx="8" fill="#D1D5DB" />
            <rect x="80" y="125" width="40" height="25" rx="4" fill="#9CA3AF" />
            <circle cx="100" cy="70" r="20" fill="#6B7280" />
            <path
              d="M85 90 Q90 95 95 90"
              stroke="#4B5563"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-center mb-3">Forgot Password?</h2>
      <p className="text-center text-gray-600 mb-8">
        Don't worry! It happens. Please enter email associated with your account
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <AuthInput
          label="Enter your Email"
          type="email"
          placeholder="abc12@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={error}
          showValidation
        />

        <AuthButton type="submit" isLoading={isLoading}>
          Send Reset Link
        </AuthButton>
      </form>
    </div>
  );
}
