import React, { createContext } from 'react';
import styled from 'styled-components';
import regeneratorRuntime from "regenerator-runtime";

import { web3Modal } from '@providers/';
import { Hero } from '@components/Hero';
import NotSupportedChain from '@components/NotSupportedChain';
import { Stepper } from '@components/Stepper';
import { Footer } from '@components/Footer';
import { ethers, utils } from 'ethers';

import CONFIG from '@config';

const Container = styled.div`
  background: #E5E5E5;
  min-height: 75vh;

  display: flex;
  flex-direction: row;
`
const SideBar = styled.div`
  min-width: 20%;
  max-width: 20%;
  min-height: 75vh;
`
const MainBody = styled.div`
  width: 100%;
  padding: 1rem;
  max-width: 100%;
  min-height: 75vh;
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
    this.supportedChain = this.supportedChain.bind(this)
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

  supportedChain = () => {
    const chainInfo = CONFIG.CHAINS.filter((chain) => chain.chainId === this.state.chainId)
    if(!chainInfo.length) {
      return false
    }

    return true
  }

  render() {
    return (
      <AppStateContext.Provider value={this.state}>
        <Container>
          <SideBar>
            <Hero />
          </SideBar>
          <MainBody>
            {
              this.supportedChain()
              ? <Stepper 
                  connect={this.onConnect}
                  reset={this.resetApp}
                />
              : <NotSupportedChain />
            }
          </MainBody>
        </Container>
        <Footer />
      </AppStateContext.Provider>
    );
  }
}

export default App;
