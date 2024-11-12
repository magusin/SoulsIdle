import React, { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Signup = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/signup', { username, email, password });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.error);
    }
  };

  const handleResendConfirmation = async () => {
    try {
      const response = await axios.post('/api/auth/resend-confirmation', { email });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center flex-grow py-10 px-6">
    <h1 className="text-3xl font-bold mb-6">S'enregistrer</h1>
      <form onSubmit={handleSignup} className="flex flex-col items-center space-y-4">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Nom d'utilisateur"
          className="px-4 py-2 rounded-md border border-gray-300"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="px-4 py-2 rounded-md border border-gray-300"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mot de passe"
          className="px-4 py-2 rounded-md border border-gray-300"
          required
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded-md text-lg hover:bg-green-700 transition duration-200"
        >
          S'enregistrer
        </button>
        <button
          type="button"
          onClick={handleResendConfirmation}
          className="bg-yellow-500 text-white px-4 py-1 rounded-md hover:bg-yellow-600 transition duration-200"
        >
          Renvoyer l'e-mail de confirmation
        </button>
        <Link href="/auth/signin"
          className="text-blue-500 hover:underline">Vous avez déjà un compte ? Connectez-vous ici
        </Link>
        <Link href="/auth/forgot-password"
          className="text-blue-500 hover:underline">Mot de passe oublié ?
        </Link>
      </form>
      {message && <p className="mt-4 text-red-500">{message}</p>}
    </div>
  );
};

export default Signup;