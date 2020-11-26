import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useState } from 'react';
import { MainLayout } from '../components/MainLayout';

export default function Register(props: { token: string }) {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  return (
    <MainLayout>
      <Head>
        <title>Register</title>
      </Head>

      <h1>Register</h1>

      <form
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent:'center',
        alignSelf: 'center',
        alignItems: "center",
        margin: "50px 0",
      }}
        onSubmit={async (e) => {
          // Prevent the default browser behavior of forms
          e.preventDefault();

          // Send the username, password and token to the
          // API route
          const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              firstname: firstname,
              lastname: lastname,
              username: username,
              password: password,
              token: props.token,
            }),
          });

          const { success } = await response.json();

          if (success) {
            // Redirect to the homepage if successfully registered
            router.push('/');
          } else {
            // If the response status code (set using response.status()
            // in the API route) is 409 (Conflict) then show an error
            // message that the user already exists
            if (response.status === 409) {
              setErrorMessage('User already exists!');
            } else {
              setErrorMessage('Failed!');
            }
          }
        }}
      >
        <input
          data-cy="register-username-input"
          value={firstname}
          onChange={(e) => setFirstname(e.currentTarget.value)}
        />
        <input
          data-cy="register-username-input"
          value={lastname}
          onChange={(e) => setLastname(e.currentTarget.value)}
        />
        <input
          data-cy="register-username-input"
          value={username}
          onChange={(e) => setUsername(e.currentTarget.value)}
        />

        <input
          data-cy="register-password-input"
          value={password}
          type="password"
          onChange={(e) => setPassword(e.currentTarget.value)}
        />

        <button data-cy="register-button">Register</button>
      </form>

      <p style={{ color: 'red' }}>{errorMessage}</p>

      <Link href="/login">
        <a>Login</a>
      </Link>
    </MainLayout>
  );
}

export async function getServerSideProps() {
  // Import and instantiate a CSRF tokens helper
  const tokens = new (await import('csrf')).default();
  const secret = process.env.CSRF_TOKEN_SECRET;

  if (typeof secret === 'undefined') {
    throw new Error('CSRF_TOKEN_SECRET environment variable not configured!');
  }

  // Create a CSRF token based on the secret
  const token = tokens.create(secret);
  return { props: { token } };
}
