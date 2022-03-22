import React from 'react';
import { AppStateContext } from '@app'
import styled from 'styled-components';

import { RainbowText } from '@components/RainbowText'

const Container = styled.div`
  margin: 0;
  padding: 0;
`
const AddressWrapper = styled.div`
  padding: 2rem 5rem;
  background-color: #000;
  border: 5px solid transparent;
  border-image-slice: 1;
  width: fit-content;
  font-size: 12pt;
  display: flex;
  align-items: center;
  gap: 10px;
  row-gap: 10px;
  column-gap: 10px;
  border-radius: 0.5rem;
  flex-direction: column;
`
const UserAddress = styled(RainbowText)`
  font-size: 13px;
`;
const DisconnectButton = styled.div`
  color: #fff;
  font-size: 12px;
  font-weight: 300;
  display: block;
  line-height: 0px;
  padding: 11px 3px; 

  &:before {
    content: "Disconnect";
  }

  &:hover {
    cursor: pointer;
  }
`
const ConnectWrapper = styled.div`
  padding: 2rem 5rem;
  background-color: #000;
  border: 2px solid transparent;
  border-image-slice: 1;
  width: fit-content;
  font-size: 14pt;
  border-radius: 0.5rem;
  font-weight: 300;

  &:hover {
    cursor: pointer;
  }
`

const ConnectWallet = ({ connect, reset }) => (
  <Container>
    <AppStateContext.Consumer>
      {
        context => {
          return context.connected
            ?
              <AddressWrapper>
                <UserAddress text={context.formattedUserAddress} />
                <DisconnectButton onClick={reset} />
              </AddressWrapper>
            :
              <ConnectWrapper onClick={connect}>
                <RainbowText text={`Connect Wallet`} />
              </ConnectWrapper>
        }
      }
    </AppStateContext.Consumer>
  </Container>
);

ConnectWallet.propTypes = {};

ConnectWallet.defaultProps = {};

export default ConnectWallet;
