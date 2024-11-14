import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Confirm = () => {
  const router = useRouter();
  const { token } = router.query;
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (token) {
      const confirmUser = async () => {
        try {
          const response = await axios.get(`/api/auth/confirm?token=${token}`);
          setMessage(response.data.message);
          if (response.status === 200) {
            setTimeout(() => {
              router.push('/auth/signin');
            }, 2000);
          }
        } catch (error) {
          setMessage(error.response.data.error);
        }
      };
      confirmUser();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center flex-grow py-10 px-6">
    <h1 className="text-3xl font-bold mb-6">Confirmation de l'inscription</h1>
      <p className="text-lg">{message}</p>
    </div>
  );
};

export default Confirm;