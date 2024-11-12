import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Header from 'C/header';

const ResetPassword = () => {
  const router = useRouter();
  const { token } = router.query;
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/reset-password', { token, password });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.error);
    }
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center flex-grow py-10 px-6">
      <h1 className="text-3xl font-bold mb-6">Réinitialiser le mot de passe</h1>
      <form onSubmit={handleResetPassword} className="flex flex-col items-center space-y-4">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Nouveau mot de passe"
          className="px-4 py-2 rounded-md border border-gray-300"
          required
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded-md text-lg hover:bg-green-700 transition duration-200"
        >
          Réinitialiser le mot de passe
        </button>
      </form>
      {message && <p className="mt-4 text-red-500">{message}</p>}
    </div>
    </>
  );
};

export default ResetPassword;