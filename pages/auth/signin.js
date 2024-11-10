import { signIn } from 'next-auth/react';

const SignIn = () => (
  <div>
    <h1>Connexion</h1>
    <form onSubmit={(e) => { e.preventDefault(); signIn(); }}>
      <button type="submit">Se connecter</button>
    </form>
  </div>
);

export default SignIn;