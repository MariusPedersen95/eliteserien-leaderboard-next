import React from 'react';

import styled from 'styled-components';

export default function Matches({}) {
  return (
    <MatchContainer>
      <h1>Kamper</h1>
      <ContentContainer>
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
