import { useState, useEffect } from 'react';
import { connectToDatabase } from '@/lib/db-util';

import { useSession, signIn, signOut } from 'next-auth/react';

import Head from 'next/head';
// import Image from 'next/image';
import { Inter } from 'next/font/google';
import { Sidebar } from '@/components/Portfolio/Sidebar/Sidebar';
import { Nav } from '@/components/Nav';
import { useSidebar } from '@/components/Portfolio/Sidebar/use-sidebar';
import { Timeline } from '@/components/Portfolio/Timeline/Timeline';
import Link from 'next/link';
// import { SignupUserForm } from '@/components/login/SignupUserForm';

import styles from '@/styles/Home.module.scss';
import {
  EventProps,
  useTimeline,
} from '@/components/Portfolio/Timeline/use-timeline';

const inter = Inter({ subsets: ['latin'] });

interface PortfolioProps {
  staticSkillsList: string[];
  staticEvents: EventProps[];
}

export default function Portfolio(props: PortfolioProps) {
  const { data: session, status } = useSession();

  const { staticSkillsList, staticEvents } = props;
  const [modalOpen, setModalOpen] = useState(false);
  const { skillsList, setSkillsList, handleInputChange } = useSidebar();
  const { events, setEvents, deleteEventHandler, createEventFormHandler } =
    useTimeline();

  let eventsList = events;

  if (events.length === 0) {
    eventsList = staticEvents;
  }

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
        <Sidebar
          skillsList={skillsList}
          setSkillsList={setSkillsList}
          handleInputChange={handleInputChange}
        />
        <Timeline
          events={eventsList}
          setEvents={setEvents}
          deleteEventHandler={deleteEventHandler}
          createEventFormHandler={createEventFormHandler}
        />
      </main>
    </>
  );
}

export async function getServerSideProps() {
  const client = await connectToDatabase();
  const db = client.db();
  const resultSkills = await db.collection('skills').find().toArray();
  const skillsList = resultSkills[0]?.skillsList;

  const resultEvents = await db
    .collection('events')
    .find()
    .sort({ _id: -1 })
    .toArray();
  const eventsList = resultEvents.map((event: any) => {
    const updatedEvent = {
      ...event,
      id: event._id.toString(),
      title: 'From server',
    };

    delete updatedEvent._id;
    return updatedEvent;
  });

  client.close();

  return {
    props: {
      staticSkillsList: skillsList ? skillsList : [],
      staticEvents: eventsList ? eventsList : [],
    },
  };
}
