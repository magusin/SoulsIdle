import React, { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

const Header = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  return (
    <header className="bg-gray-800 text-white py-4 px-6 flex justify-between items-center">
      <h1 className="text-2xl font-bold cursor-pointer" onClick={() => router.push('/')}>FromSoft Clicker Game</h1>
      {status === 'unauthenticated' && (
        <div className="flex items-center space-x-4">
          <button
            onClick={() => router.push('/auth/signin')}
            className="bg-blue-600 text-white px-4 py-1 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Se connecter
          </button>
          <button
            onClick={() => router.push('/auth/signup')}
            className="text-gray-300 underline hover:text-white"
          >
            S'enregistrer
          </button>
        </div>
      )}
      {status === 'authenticated' && session && (
        <div className="flex items-center space-x-4">
          <p>Bienvenue, {session.user.name || session.user.email} !</p>
          <button
            onClick={() => signOut()}
            className="bg-red-600 text-white px-4 py-1 rounded-md hover:bg-red-700 transition duration-200"
          >
            Se déconnecter
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;