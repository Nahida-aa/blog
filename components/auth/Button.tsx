"use client";
import React from 'react';
import { Button } from '../ui/button';
// import { signIn } from '@/auth';
import { useSession, signIn, signOut, SessionProvider } from 'next-auth/react'
import GitHubIcon from '../svg/github';

const GitHubLoginButton = () => {
  const handleSignIn = async () => {
    try {
      await signIn('github');
    } catch (error) {
      console.error('Error during GitHub login:', error);
    }
  };

  return (
    <Button
      onClick={handleSignIn}
      className="active:scale-95 transition-transform gap-2 w-full"
    >
      <GitHubIcon />
      <span className="ml-2">Sign in with GitHub</span>
    </Button>
  );
};

export default GitHubLoginButton;