import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const SignIn = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (status === 'authenticated') {
      // Rediriger l'utilisateur s'il est déjà connecté
      router.push('/');
    }
  }, [status]);

  if (status === 'authenticated') {
    return <p>Redirection...</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Appeler NextAuth signIn() avec les credentials
    const result = await signIn('credentials', {
      redirect: false,
      username,
      password,
    });

    if (!result.error) {
      // Si la connexion réussit, redirigez vers la page d'accueil
      router.push('/');
    } else {
      // Afficher un message d'erreur si les identifiants sont incorrects
      setErrorMessage(result.error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center flex-grow py-10 px-6">
    <h1 className="text-3xl font-bold mb-6">Connexion</h1>

      {errorMessage && (
        <div className="text-red-600 mb-4">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Nom d'utilisateur"
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
          className="bg-blue-600 text-white px-6 py-2 rounded-md text-lg hover:bg-blue-700 transition duration-200"
        >
          Se connecter
        </button>
      </form>
    </div>
  );
};

export default SignIn;
