"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

/**
 * Real useAuth hook for Luxe Bloom.
 * Connects the UI to Supabase authentication.
 */
export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Check for active session on mount
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };

    checkSession();

    // 2. Listen for auth state changes (login, logout, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
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
    loading,
    signIn,
    signUp,
    signOut
  };
}
