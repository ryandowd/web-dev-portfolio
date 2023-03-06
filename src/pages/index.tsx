import { connectDatabase } from '../helpers/db-util';

import Head from 'next/head';
// import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import { Sidebar } from '@/components/portfolio/Sidebar/Sidebar';
import { useEffect } from 'react';
import { useSidebar } from '@/components/portfolio/Sidebar/use-sidebar';

const inter = Inter({ subsets: ['latin'] });

interface HomeProps {
  staticSkillsList: string[];
}

export default function Home(props: HomeProps) {
  const { staticSkillsList } = props;
  const { skillsList, setSkillsList, handleInputChange } = useSidebar();

  useEffect(() => {
    setSkillsList(staticSkillsList);
  }, []);

  return (
    <>
      <Head>
        <title>Ryan Dowd - Web Developer</title>
        <meta name='description' content='Ryan Dowd - Web Developer' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className={styles.main}>
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
  const client = await connectDatabase();
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
