import React from 'react';
import { AppStateContext } from '@app'
import styled from 'styled-components';

import { RainbowText } from '@components/RainbowText'

const Container = styled.div`
  margin: 0.5em;
  width: 300px;

  @media only screen and (max-width : 992px) {
    width: 100%;
  }
`
const AddressWrapper = styled.div`
  padding: 5px;
  background-color: #302244;
  border: 5px solid transparent;
  border-image-slice: 1;
  width: auto;
  font-size: 12pt;
  display: flex;
  align-items: center;
  gap: 10px;
  row-gap: 10px;
  column-gap: 10px;
  border-radius: 0.5rem;
`
const UserAvatar = styled.img`
  height: 40px;
  width: 40px;
  margin: 0.5rem;
  background-image: url("${props => props.src ?? ''}");
  background-color: #CCC;
  border-radius: 50%;
  order: 0;
  flex-direction: column;
`
const UserAddress = styled(RainbowText)`
  flex-direction: column;
  order: 1;
  flex-grow: 5;
`;
const DisconnectButton = styled.div`
  flex-direction: row;
  font-size: 12pt;
  text-align: right;
  order: 3;

  &:hover {
    cursor: pointer;
  }
`
const ConnectWrapper = styled.div`
  padding: 2rem 5rem;
  background-color: #302244;
  border: 2px solid transparent;
  border-image-slice: 1;
  width: auto;
  font-size: 14pt;
  border-radius: 0.5rem;
  font-weight: bold;

  &:hover {
    cursor: pointer;
    background: #3B2A53;
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
                <UserAvatar src={context.userEnsAvatar} />
                <UserAddress text={context.formattedUserAddress} />
                <DisconnectButton onClick={reset}>Disconnect</DisconnectButton>
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
