import React, { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useSession, signOut } from 'next-auth/react';
import 'tailwindcss/tailwind.css';

const Header = () => {
  const { data: session, status } = useSession();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [message, setMessage] = useState('');

  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/signin', { email, password });
      setMessage(response.data.message);
      if (response.data.user) {
        window.location.href = '/';
      }
    } catch (error) {
      setMessage(error.response.data.error);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/signup', { username, email, password });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.error);
    }
  };

  return (
    <header className="bg-gray-800 text-white py-4 px-6 flex justify-between items-center">
      <h1 className="text-2xl font-bold">FromSoft Clicker Game</h1>
      {status === 'unauthenticated' && (
        <div className="flex items-center space-x-4">
          {isRegistering ? (
            <form onSubmit={handleSignup} className="flex space-x-4 items-center">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Nom d'utilisateur"
                className="px-2 py-1 rounded-md border border-gray-300 text-black"
                required
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="px-2 py-1 rounded-md border border-gray-300 text-black"
                required
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mot de passe"
                className="px-2 py-1 rounded-md border border-gray-300 text-black"
                required
              />
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-1 rounded-md hover:bg-green-700 transition duration-200"
              >
                S'enregistrer
              </button>
              <button
                type="button"
                onClick={() => setIsRegistering(false)}
                className="text-gray-300 underline hover:text-white"
              >
                Se connecter
              </button>
            </form>
          ) : (
            <form onSubmit={handleSignin} className="flex space-x-4 items-center">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="px-2 py-1 rounded-md border border-gray-300 text-black"
                required
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mot de passe"
                className="px-2 py-1 rounded-md border border-gray-300 text-black"
                required
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-1 rounded-md hover:bg-blue-700 transition duration-200"
              >
                Se connecter
              </button>
              <button
                type="button"
                onClick={() => setIsRegistering(true)}
                className="text-gray-300 underline hover:text-white"
              >
                S'enregistrer
              </button>
            </form>
          )}
        </div>
      )}
      {status === 'authenticated' && session && (
        <div className="flex items-center space-x-4">
          <p>Bienvenue, {session.user.name} !</p>
          <button
            onClick={() => signOut()}
            className="bg-red-600 text-white px-4 py-1 rounded-md hover:bg-red-700 transition duration-200"
          >
            Se déconnecter
          </button>
        </div>
      )}
      {message && <p className="mt-2 text-red-500">{message}</p>}
    </header>
  );
};

const Footer = () => (
  <footer className="bg-gray-800 text-white py-4 text-center mt-10">
    <p>&copy; 2024 FromSoft Idle Game. Tous droits réservés.</p>
  </footer>
);

const Home = () => {
  return (
    <div className="font-sans">
      <Header />
      <main className="flex flex-col items-center justify-center py-10 px-6">
        <div className="mb-10 text-center">
          <img
            src="/path/to/your/hero-image.jpg"
            alt="Illustration de FromSoftware Idle Game"
            className="w-full max-w-md mb-6 rounded-lg shadow-lg"
          />
          <h2 className="text-2xl font-semibold mb-4">Collectez des âmes, améliorez vos armes, et devenez une légende !</h2>
          <p className="text-gray-700 mb-6">Un clicker game inspiré de l'univers fascinant de FromSoftware. Cliquez, farmez, et améliorez votre personnage.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
