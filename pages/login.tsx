import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import nextCookies from 'next-cookies';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { isSessionTokenValid } from '../utils/auth';
import { MainLayout } from '../components/MainLayout';

type Props = { loggedIn: boolean; redirectDestination: string };

export default function Login(props: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  return (
    <>
    <MainLayout >
      <Head>
        <title>Login</title>
      </Head>

      <h1 style={{        
        margin: "50px 0",
      }}>Login</h1>

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
          e.preventDefault();

          const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
          });

          const { success } = await response.json();

          if (!success) {
            setErrorMessage('Login failed!');
          } else {
            setErrorMessage('');
            router.push(props.redirectDestination);
          }
        }}
      >
        <input
        className="input"
          data-cy="login-username-input"
          value={username}
          onChange={(e) => setUsername(e.currentTarget.value)}
        />

        <input
        className="input"
          data-cy="login-password-input"
          value={password}
          type="password"
          onChange={(e) => setPassword(e.currentTarget.value)}
        />

        <button         
        className="button" 
        data-cy="login-button"
        >Log in</button>
      <Link href="/register">
        <a>Register</a>
      </Link>
      </form>

      <p style={{ color: 'red' }}>{errorMessage}</p>

    </MainLayout>
    <style jsx>{`
    .input {
      border: 1px solid #004620;
      background-color: transparetn;
      width: 320px;
      height: 50px;
      align-self: center;
      margin-bottom: 20px;
    }
    .button {
      text-transform: uppercase;
      text-decoration: none;
      letter-spacing: 0.15em;
      text-align: center;
      display: inline-block;
      align-self: center;
      position: relative;
      width: 100px;
      height: 3em;
      margin: 2em auto;
    }
    
    }
  `}</style>
  </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { session: token } = nextCookies(context);

  const redirectDestination = context?.query?.returnTo ?? '/';

  if (await isSessionTokenValid(token)) {
    return {
      redirect: {
        destination: redirectDestination,
        permanent: false,
      },
    };
  }

  return {
    props: { loggedIn: false, redirectDestination: redirectDestination },
  };
}
