import { connectToDatabase } from '@/utils/db-util';
import Head from 'next/head';
import { EventProps } from 'src/types';
import { PortfolioPage } from '@/components/portfolio/PortfolioPage';
// import { authOptions } from '@/pages/api/auth/[...nextauth]';
// import { getServerSession } from 'next-auth/next';
// import type { GetServerSidePropsContext } from 'next';
// import { AuthSession } from '@/types';

interface PortfolioProps {
  staticSkillsList: string[];
  staticEvents: EventProps[];
  // isAdmin: boolean;
}

export default function Portfolio(props: PortfolioProps) {
  const { staticSkillsList, staticEvents } = props;

  return (
    <>
      <Head>
        <title>Ryan Dowd - Web Developer</title>
        <meta name='description' content='Ryan Dowd - Web Developer' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <PortfolioPage
        staticSkillsList={staticSkillsList}
        staticEvents={staticEvents}
        // isAdmin={isAdmin}
      />
    </>
  );
}

export async function getStaticProps() {
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

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   const session: AuthSession | null = await getServerSession(
//     context.req,
//     context.res,
//     authOptions
//   );
//   const isAdminEmail = session?.user?.email === process.env.ADMIN_USER_EMAIL;
//   const isAdminID = session?.user?.id === process.env.ADMIN_USER_ID;

//   return {
//     props: {
//       session,
//       isAdmin: isAdminEmail && isAdminID,
//     },
//   };
// }
