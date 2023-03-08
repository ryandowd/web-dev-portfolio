import { useState } from 'react';
import { connectToDatabase } from '../lib/db-util';

import { useSession, signIn, signOut } from 'next-auth/react';

import Head from 'next/head';
// import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import { Sidebar } from '@/components/portfolio/Sidebar/Sidebar';
import { useEffect } from 'react';
import { useSidebar } from '@/components/portfolio/Sidebar/use-sidebar';
import Link from 'next/link';
// import { SignupUserForm } from '@/components/login/SignupUserForm';

const inter = Inter({ subsets: ['latin'] });

interface HomeProps {
  staticSkillsList: string[];
}

export default function Home(props: HomeProps) {
  const { data: session, status } = useSession();

  const { staticSkillsList } = props;
  const [modalOpen, setModalOpen] = useState(false);
  const { skillsList, setSkillsList, handleInputChange } = useSidebar();

  useEffect(() => {
    setSkillsList(staticSkillsList);
  }, []);

  // function loginHandler() {
  //   signIn();
  // }

  // function logoutHandler() {
  //   signOut();
  // }

  // function openModalHandler(option: boolean) {
  //   setModalOpen(option);
  // }

  return (
    <>
      <Head>
        <title>Ryan Dowd - Web Developer</title>
        <meta name='description' content='Ryan Dowd - Web Developer' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className={styles.main}>
        {/* {!session ? (
          <button type='button' onClick={loginHandler}>
            Login
          </button>
        ) : (
          <button type='button' onClick={logoutHandler}>
            Logout
          </button>
        )} */}
        <Link href='/auth/signin'>Sign in</Link>
        <Link href='/auth/signup'>Sign up</Link>
        <Sidebar
          skillsList={skillsList}
          setSkillsList={setSkillsList}
          handleInputChange={handleInputChange}
        />
      </main>
    </>
  );
}

export async function getServerSideProps() {
  const client = await connectToDatabase();
  const db = client.db();
  const result = await db.collection('skills').find().toArray();
  const skillsList = result[0]?.skillsList;

  client.close();

  return {
    props: {
      staticSkillsList: skillsList ? skillsList : [],
    },
  };
}
