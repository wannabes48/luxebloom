"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

/**
 * Real useAuth hook for Luxe Bloom.
 * Connects the UI to Supabase authentication.
 */
export function useAuth() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async (userId) => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (!error) setProfile(data);
    };

    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
        await fetchProfile(session.user.id);
      }
      setLoading(false);
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        await fetchProfile(session.user.id);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  /**
   * Log in a user with email and password
   */
  const signIn = async (email, password) => {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    return { data, error };
  };

  /**
   * Register a new user and store metadata (first_name, last_name, etc.)
   */
  const signUp = async (email, password, metadata) => {
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata, // This metadata will be caught by our DB trigger to create a profile
        emailRedirectTo: `${window.location.origin}/my-account`,
      },
    });
    setLoading(false);
    return { data, error };
  };

  /**
   * Sign out the current user
   */
  const signOut = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    setLoading(false);
    return { error };
  };

  return {
    user,
    profile,
    isAdmin: profile?.role === 'admin',
    loading,
    signIn,
    signUp,
    signOut
  };
}
