import React from 'react';

import styled from 'styled-components';

export default function Matches({}) {
  return (
    <MatchContainer>
      <h1>Kamper</h1>
      <MatchContent>
        <Team>Molde</Team>
        <span>2-0</span>
        <Team>Bodø/glimt</Team>
      </MatchContent>
      <MatchContent>
        <Team>Molde</Team>
        <span>2-0</span>
        <Team>Bodø/glimt</Team>
      </MatchContent>
      <MatchContent>
        <Team>Molde</Team>
        <span>2-0</span>
        <Team>Bodø/glimt</Team>
      </MatchContent>
    </MatchContainer>
  );
}

const MatchContainer = styled.div`
  background-color: var(--primary);
  color: var(--white);
  padding: 0.8rem;
  border-radius: 8px;
  width: 100%;
`;

const MatchContent = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  background-color: var(--light-purple);
  border-radius: 8px;
  padding: 10px 0;
  width: 100%;
  font-size: 1.2rem;
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
`;
