import React, { createContext } from 'react';
import styled from 'styled-components';
import regeneratorRuntime from "regenerator-runtime";

import { web3Modal, initWeb3 } from '@providers/';
import { Hero } from '@components/Hero';
import { Stepper } from '@components/Stepper';
import { Footer } from '@components/Footer';
import { ethers, utils } from 'ethers';

const Container = styled.div`
  background: #FEFEFE;
  min-height: 75vh;
`
const MainBody = styled.div`
  padding: 1rem;
`

const INITIAL_STATE = {
  web3: null,
  connected: false,
  chainId: 1,
  networkId: 1,
  userAddress: null,
  provider: null,
  transactions: [{
    pending: {},
    confirmed: {}
  }]
}

export const AppStateContext = createContext(null)

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      ...INITIAL_STATE
    }

    this.web3Modal = web3Modal
  }

  componentDidMount() {
    if(this.web3Modal.cachedProvider) {
      this.onConnect()
    }
  }

  onConnect = async () => {
    const instance = await web3Modal.connect();
    
    await this.subscribeProvider(instance);
    const provider = new ethers.providers.Web3Provider(instance)
    const signer = provider.getSigner()

    const accounts = await provider.listAccounts();
    const userAddress = utils.getAddress(accounts[0]);

    console.log(`connected`)

    // See if the user has a reverse record set on their ens name
    const userEnsAddress = userAddress; //await ethersProvider.lookupAddress(userAddress) ?? userAddress;
    const userEnsAvatar = null; //userEnsAddress.match(/0x[A-Z]{40}/i) ? null : await ethersProvider.getAvatar(userEnsAddress);
    const formattedUserAddress = userAddress === userEnsAddress ? [userAddress.substring(0, 6), userAddress.substring(36, 42)].join(`...`) : userEnsAddress;

    const { chainId } = await provider.getNetwork()

    await this.setState({
      web3,
      provider,
      signer,
      connected: true,
      userAddress,
      userEnsAddress,
      userEnsAvatar,
      formattedUserAddress,
      chainId,
    })
  }

  subscribeProvider = async(provider) => {
    if(!provider.on) {
      return;
    }

    provider.on("close", () => this.resetApp());

    provider.on("accountsChanged", async (accounts) => {
      await this.onConnect()
    });

    provider.on("chainChanged", async (chainId) => {
      await this.onConnect()
    });

    provider.on("networkChanged", async (networkId) => {
      await this.onConnect()
    });
  }

  resetApp = async () => {
    console.log(`disconnect`)
    const { web3 } = this.state;

    if (web3 && web3.currentProvider && web3.currentProvider.close) {
      await web3.currentProvider.close();
    }

    await this.web3Modal.clearCachedProvider();
    this.setState({ ...INITIAL_STATE });

  };

  render() {
    return (
      <AppStateContext.Provider value={this.state}>
        <Container>
          <Hero 
            connect={this.onConnect}
            reset={this.resetApp}
          />
          <MainBody>
            <Stepper />
          </MainBody>
        </Container>
        <Footer />
      </AppStateContext.Provider>
    );
  }
}

export default App;
