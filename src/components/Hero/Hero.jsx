import React from 'react';
import styled from 'styled-components';

import { ConnectWallet } from '@components/ConnectWallet'

const Container = styled.div`
  width: 100vw;
  margin: 0;
  background: #000;
`

const HeadingContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
`
const HeadingColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  flex: 1;

  &:nth-child(1) {
    flex-basis: 75%;
    @media only screen and (max-width : 992px) {
      flex-basis: 100%;
    }
  }

  &:nth-child(2) {
    flex-basis: 25%;
    @media only screen and (max-width : 992px) {
      flex-basis: 100%;
    }
  }
`
const Heading = styled.h1`
  flex: 2;
  flex-grow: 1;

  padding: 2.5% 2%;
  color: #FFF;
  font-weight: 800;
`

const Hero = ({ connect, reset }) => (
  <Container>
    <HeadingContainer>
      <HeadingColumn>
        <Heading>
          EOA Migrator
        </Heading>
      </HeadingColumn>
      <HeadingColumn>
        <ConnectWallet
            connect={connect}
            reset={reset}
        />
      </HeadingColumn>
    </HeadingContainer>
  </Container>
);

export default Hero;
