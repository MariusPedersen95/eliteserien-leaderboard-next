import React from 'react';

import styled from 'styled-components';

import { useQuery, gql } from '@apollo/client';

const STANDINGS_QUERY = gql`
  query table($tournamentStageId: ID!) {
    tournamentStage(id: $tournamentStageId) {
      name
      standings(type: LEAGUE_TABLE) {
        participants {
          participant {
            id
            name
          }
          rank
          data {
            code
            value
          }
        }
      }
    }
  }
`;

export default function Leaderboard({ id = '4e50ba57-d5fe-4370-b2f8-e357ebeb4c83', onSet }) {
  const { data, loading, error } = useQuery(STANDINGS_QUERY, {
    variables: {
      tournamentStageId: id,
    },
  });

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    console.log(error);
    return null;
  }

  const participants = data.tournamentStage.standings[0].participants;

  console.log(participants);

  const dataValue = (dataArr, code) => {
    const item = dataArr.find((item) => item.code === code);
    return item.value;
  };

  return (
    <LeaderboardContainer>
      <h1>Standings</h1>
      <Table>
        <thead>
          <tr>
            <BigTh>Klubb</BigTh>
            <StatsTh>P</StatsTh>
            <StatsTh>S</StatsTh>
            <StatsTh>U</StatsTh>
            <StatsTh>T</StatsTh>
            <GoalsTh>M</GoalsTh>
            <GoalsTh>D</GoalsTh>
            <PoengTh>Poeng</PoengTh>
          </tr>
        </thead>
        <TableBody>
          {participants.map((participant) => (
            <tr onClick={() => onSet(participant.participant.id)} key={participant.participant.id}>
              <td>
                {participant.rank}.{participant.participant.name}
              </td>
              <StatsTd>{dataValue(participant.data, 'played')}</StatsTd>
              <StatsTd>{dataValue(participant.data, 'draws')}</StatsTd>
              <StatsTd>{dataValue(participant.data, 'played')}</StatsTd>
              <StatsTd>{dataValue(participant.data, 'defeits')}</StatsTd>
              <GoalsTd>
                {dataValue(participant.data, 'goalsfor')}-{dataValue(participant.data, 'goalsagainst')}
              </GoalsTd>
              <GoalsTd>
                {Number(dataValue(participant.data, 'goalsfor')) - Number(dataValue(participant.data, 'goalsagainst'))}
              </GoalsTd>
              <PoengTd>
                <PointCircle>{dataValue(participant.data, 'points')}</PointCircle>
              </PoengTd>
            </tr>
          ))}
        </TableBody>
      </Table>
      <StandingsRules>
        <div>
          <span>Kvalifisering UEFA Champions league</span>
          <span>Kvalifisering UEFA Europa Conference league</span>
          <span>Sluttspill nedrykk</span>
          <span>Nedrykk</span>
        </div>
      </StandingsRules>
    </LeaderboardContainer>
  );
}

const LeaderboardContainer = styled.div`
  width: 100%;
  background: var(--primary);
  color: var(--white);
  border-radius: 7.88px;
  margin-right: 15px;
  padding: 2rem 0.5rem 2rem 1.5rem;

  @media (min-width: 992px) {
    padding: 2rem;
  }
`;

const Table = styled.table`
  padding: 2rem 0;
  border-collapse: separate;
  border-spacing: 0;
  width: 100%;
  font-weight: bold;
  font-size: 0.8rem;
  tr:first-of-type td:first-of-type:before,
  tr:nth-of-type(2) td:first-of-type:before,
  tr:nth-of-type(3) td:first-of-type:before,
  tr:nth-last-of-type(3) td:first-of-type:before,
  tr:nth-last-of-type(2) td:first-of-type:before,
  tr:last-child td:first-child:before {
    content: '';
    position: absolute;
    display: inline-block;
    width: 9px;
    height: 9px;
    border-radius: 7.5px;
    margin-left: -15px;
    @media (min-width: 992px) {
      margin-left: -20px;
    }
  }
  tr:first-of-type td:first-of-type:before {
    background-color: var(--blue);
  }
  tr:nth-of-type(2) td:first-of-type:before,
  tr:nth-of-type(3) td:first-of-type:before {
    background-color: var(--yellow);
  }
  tr:nth-last-of-type(3) td:first-of-type:before {
    background-color: var(--orange);
  }
  tr:nth-last-of-type(2) td:first-of-type:before,
  tr:last-child td:first-child:before {
    background-color: var(--red);
  }

  @media (min-width: 992px) {
    padding: 2rem;
  }
`;

const TableBody = styled.tbody`
  margin-top: 22px;
  tr {
    height: 44px;
    padding: 0;
  }
  td {
    border-bottom: 1.33px solid var(--greey);
  }
`;

const BigTh = styled.th`
  text-align: left;
  @media (min-width: 992px) {
    min-width: 180px;
  }
`;

const GoalsTh = styled.th`
  width: 56px;
  min-width: 56px;
  padding-left: 8px;
  @media (min-width: 992px) {
    width: 80px;
    min-width: 80px;
  }
`;

const GoalsTd = styled(GoalsTh).attrs({
  as: 'td',
})`
  text-align: center;
`;

const PoengTh = styled.th`
  width: 34px;
  min-width: 34px;
  text-align: right;
  @media (min-width: 992px) {
    width: 80px;
    min-width: 80px;
  }
`;

const PoengTd = styled(PoengTh).attrs({
  as: 'td',
})``;

const StatsTh = styled.th`
  width: 16px;
  min-width: 16px;
  padding-left: 8px;
  @media (min-width: 992px) {
    width: 40px;
    min-width: 40px;
  }
`;

const StatsTd = styled(StatsTh).attrs({
  as: 'td',
})`
  text-align: center;
`;

const PointCircle = styled.span`
  border-radius: 8px;
  background-color: var(--light-purple);
  margin-top: -4px;
  padding: 5px 7px;
}
`;

const StandingsRules = styled.div`
  margin: 0 auto;
  width: 100%;
  div {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    flex-direction: column;
    span {
      flex: 1 0 47%; /* explanation below */
      margin: 5px;
      font-size: 0.8rem;
    }
    span:before {
      content: '';
      display: inline-block;
      width: 9px;
      height: 9px;
      border-radius: 7.5px;
      margin-right: 5px;
    }
    span:first-of-type:before {
      background-color: var(--blue);
    }
    span:nth-of-type(2):before {
      background-color: var(--yellow);
    }
    span:nth-of-type(3):before {
      background-color: var(--orange);
    }
    span:last-of-type:before {
      background-color: var(--red);
    }
    @media (min-width: 992px) {
      flex-direction: row;
    }
  }
  @media (min-width: 992px) {
    width: 90%;
  }
`;
