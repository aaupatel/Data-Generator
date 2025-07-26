"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const TRIAL_KEY = 'data_generator_trial';
const MAX_TRIALS = 3;

interface TrialData {
  usedTrials: number;
  lastUsed: string;
}

export const useTrial = () => {
  const [trialData, setTrialData] = useState<TrialData>({ usedTrials: 0, lastUsed: '' });
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem(TRIAL_KEY);
    if (stored) {
      setTrialData(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  const incrementTrial = () => {
    const newTrials = trialData.usedTrials + 1;
    const newData = {
      usedTrials: newTrials,
      lastUsed: new Date().toISOString(),
    };

    // Update both localStorage and cookie
    setTrialData(newData);
    localStorage.setItem(TRIAL_KEY, JSON.stringify(newData));
    // document.cookie = `${TRIAL_KEY}=${JSON.stringify(newData)}; path=/; max-age=31536000`; // 1 year

    if (newTrials >= MAX_TRIALS) {
      toast.error("Free trials exhausted. Please sign in to continue.");
      setTimeout(() => {
        router.push('/auth/login');
      }, 10000);
    }
  };

  const clearTrials = () => {
    localStorage.removeItem(TRIAL_KEY);
    setTrialData({ usedTrials: 0, lastUsed: '' });
  };

  const hasTrialsLeft = trialData.usedTrials < MAX_TRIALS;
  const trialsRemaining = MAX_TRIALS - trialData.usedTrials;

  return {
    loading,
    hasTrialsLeft,
    trialsRemaining,
    incrementTrial,
    clearTrials,
    totalTrials: trialData.usedTrials,
  };
};