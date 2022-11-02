import react, { useState } from 'react';

import styled from 'styled-components';

import Head from 'next/head';

import ClientOnly from '../components/ClientOnly';
import Leaderboard from '../components/Leaderboard';
import Matches from '../components/Matches';

import styles from '../styles/Home.module.css';

export default function Home() {
  const [participantId, setParticipantId] = useState('83af5c96-fe8d-4f60-a1ea-d89e01a14826');
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main>
        <ClientOnly>
          <Section>
            <Leaderboard setParticipantId={setParticipantId} />
            <Matches participantId={participantId} />
          </Section>
        </ClientOnly>
      </Main>
    </div>
  );
}

const Main = styled.div`
  margin: 0 auto;
  max-width: 1010px;
  min-width: 320px;
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  @media (min-width: 992px) {
    flex-direction: row;
  }
`;
