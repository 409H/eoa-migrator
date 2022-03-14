import React from 'react';
import styled from 'styled-components';

import { RainbowText } from '@components/RainbowText'
import { Donate } from '@components/Donate'

const Container = styled.div`
  background: #302244;
  border-top: 2px solid #302266;
  color: #FFF;
  min-height: 25vh;
  margin: 0;
  padding: 2.5rem;
  bottom: 0;
  position: relative;
`

const FootHeading = styled.h3`
    font-size: 22pt;
    font-weight: bold;
    margin: 0 0 1rem 0;
`
const FootSubHeading = styled.h5`
    font-size: 16pt;
    font-weight: bold;
    margin: 2rem 0 1rem 0;
`
const ExternalLink = styled.a`
    color: #DEDEDE;
    text-decoration: underline;
    text-decoration-style: dotted;
`

const Footer = () => (
  <Container>
      <FootHeading>
        <RainbowText text={`EOA Migrator`} />
      </FootHeading>
      This service is provided as-is. There is no guarantees. <br />

      <FootSubHeading>Donate</FootSubHeading>
      <small>Donate to help fund development.</small> <br />
      <Donate />
  </Container>
);

export default Footer;
