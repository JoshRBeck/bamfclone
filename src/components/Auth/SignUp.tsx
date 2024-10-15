import React, { useState } from 'react';
import useSignUp from '../../composables/useSignUp';

const SignupComponent = () => {
  // const { error, isPending, signup } = useSignup();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup, isPending, error } = useSignUp()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signup(email, password);

    if (error) {
      console.log(error)
    }
  };

  console.log(email, password)

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit" disabled={isPending}>
        {isPending ? 'Signing up...' : 'Signup'}
      </button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default SignupComponent;
