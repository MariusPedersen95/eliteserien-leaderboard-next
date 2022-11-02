import React from 'react';

import styled from 'styled-components';

import { useQuery, gql } from '@apollo/client';

const MATCHES_QUERY = gql`
  query teamMatches($participantId: ID!, $fromDate: LocalDate!, $toDate: LocalDate!) {
    eventsByParticipantAndDateRange(participantId: $participantId, fromDate: $fromDate, toDate: $toDate) {
      startDate
      tournamentStage {
        name
      }
      participants {
        results {
          resultType
          value
        }
        participant {
          name
        }
      }
    }
  }
`;

export default function Matches({ fromDate = '2022-04-03', toDate = '2022-11-02', participantId }) {
  const { data, loading, error } = useQuery(MATCHES_QUERY, {
    variables: {
      participantId: participantId,
      fromDate: fromDate,
      toDate: toDate,
    },
  });

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    console.log(error);
    return null;
  }

  const matches = data.eventsByParticipantAndDateRange;

  const filteredMatches = matches.filter((match) => match.tournamentStage.name === 'Eliteserien');

  return (
    <MatchContainer>
      <h1>Kamper</h1>
      <ContentContainer>
        {filteredMatches.map((match) => (
          <MatchContent key={+1}>
            <Team>{match.participants[0].participant.name}</Team>
            <span>
              {match.participants[0].results[3].value}-{match.participants[1].results[3].value}
            </span>
            <Team>{match.participants[1].participant.name}</Team>
          </MatchContent>
        ))}
      </ContentContainer>
    </MatchContainer>
  );
}

const MatchContainer = styled.div`
  background-color: var(--primary);
  color: var(--white);
  padding: 2rem 0.8rem;
  border-radius: 8px;
  width: 100%;
  margin-top: 2rem;
  overflow: auto;
  max-height: 920px;

  @media (min-width: 992px) {
    margin-top: 0rem;
    padding: 2rem 1rem;
  }
`;

const ContentContainer = styled.div`
  padding-top: 2rem;
`;

const MatchContent = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  background-color: var(--light-purple);
  border-radius: 8px;
  padding: 10px 0;
  width: 100%;
  font-size: 0.8rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const Team = styled.div`
  max-width: 85px;
  text-align: center;
  flex-grow: 1;
  width: 33%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  @media (min-width: 992px) {
    max-width: 64px;
  }
`;
