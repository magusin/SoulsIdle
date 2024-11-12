import { useState } from 'react';
import axios from 'axios';

const ResendConfirmation = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleResend = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/resend-confirmation', { email });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-3xl font-bold mb-6">Renvoyer l'e-mail de confirmation</h1>
      <form onSubmit={handleResend} className="flex flex-col items-center space-y-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="px-4 py-2 rounded-md border border-gray-300"
          required
        />
        <button
          type="submit"
          className="bg-yellow-600 text-white px-6 py-2 rounded-md text-lg hover:bg-yellow-700 transition duration-200"
        >
          Renvoyer l'email
        </button>
      </form>
      <p className="mt-4 text-red-500">{message}</p>
    </div>
  );
};

export default ResendConfirmation;
