'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import SplashScreen from '@/components/shared/SplashScreen';
import { getSession } from '@/utils/storage';

export default function Home() {
  const router = useRouter();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const session = getSession();
      if (session) router.push('/dashboard');
      else router.push('/login');
      setShowSplash(false);
    }, 1200); // between 800 and 2000 ms
    return () => clearTimeout(timer);
  }, [router]);

  if (!showSplash) return null;
  return <SplashScreen />;
}