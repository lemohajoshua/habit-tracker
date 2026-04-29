'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import SplashScreen from '@/components/shared/SplashScreen';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      const session = localStorage.getItem('habit-tracker-session');
      if (session) {
        router.push('/dashboard');
      } else {
        router.push('/login');
      }
    }, 1200); // Meets the 800ms-2000ms requirement

    return () => clearTimeout(timer);
  }, [router]);

  return <SplashScreen />;
}