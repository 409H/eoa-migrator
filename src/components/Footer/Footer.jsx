import React from 'react';
import styled from 'styled-components';

import { RainbowText } from '@components/RainbowText'
import { Donate } from '@components/Donate'

const Container = styled.div`
  background: #000;
  border-top: 2px solid #111;
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
const FootContent = styled.p`
  font-size: 10pt;
`

const Footer = () => (
  <Container>
      <FootHeading>
        <RainbowText text={`EOA Migrator`} />
      </FootHeading>

      <FootContent>
        EOA Migrator is a tool to help you discover different types of assets{' '}
        that you have ownership to across multiple different EVM blockchains.
      </FootContent>

      <br /><br />

      <FootContent>
        This software is provided as-is.<br />
        It is <a href="https://github.com/409H/eoa-migrator" target="_blank" rel="nofollow">open source</a>. 
        There is no warranty. <br />
        The authors do not assume any responsibility for bugs, vulnerabilities, or{' '} 
        other technical defects.
      </FootContent>

      <br /><br />

      <Donate />

      <br /><br />
      
      <FootContent>
        Application is powered using:
        <ul>
          <li>@MyCrypto/eth-scan</li>  
          <li>TokenLists (CoinGecko, Uniswap, PancakeSwap, Quickswap)</li>
          <li>Etherscan (PolygonScan, BscScan)</li>
          <li>Infura, BSC-DataSeed, MyCryptoAPI, Polygon-RPC</li>
        </ul>
      </FootContent>

  </Container>
);

export default Footer;
