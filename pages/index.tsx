import Head from 'next/head'
import styled from 'styled-components';
import { MainLayout } from '../components/MainLayout';
import { RecipeList, queryEnum } from '../components/RecipeList';
import nextCookies from 'next-cookies';
import { isSessionTokenValid } from '../utils/auth';
import {getSessionByToken} from '../utils/database';
import { GetServerSidePropsContext } from 'next';

const StyledHeader = styled.h1`
  font-size: 2em;
  text-align: left;
  padding: 16px 16px;
  ${({ theme }) => `
    font-size: 2em;
    text-align: left;
    padding: ${theme['padding-small']} ${theme['padding-small']};
    `}
`;

export default function Home() {
  return (
    <>
      <MainLayout title="Recipes">
      <StyledHeader>
      hello potato
      </StyledHeader>
      <RecipeList parentRoute="recipe" queryType={queryEnum.recipes} />
      </MainLayout>
    </>
  )
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
  console.log('token', token);
  const user = await getSessionByToken(token);
// console.log('user', user);
  return {
    props: { loggedIn: false, redirectDestination: redirectDestination },
  };
}
