import React, { useContext } from "react";
import styled from "styled-components"

import ConnectWalletStep from "./ConnectWallet";
import SafeAddressPanel from "../SafeAddressPanel"
import VerifySafeAddress from "./VerifySafeAddress"
import ERC20 from "./ERC20"
import Nft from "./Nft"
import Contracts from "./Contracts"

interface IStep {
    selected: boolean;
    canSelect: boolean;
}

const Container = styled.div`
    padding: 5% 5%;
`
const Heading = styled.h3`
    font-weight: 500;
    font-size: 23pt;
    margin: 0 0 0.5em 0;
`
const HeadingExtra = styled.span`
    font-weight: 200;
`
const Steps = styled.div`
    width: 100%;
    display: block;
    border: 1px solid #999;
    padding: 0 2em;
    margin: 2em 0;
`
const Step = styled.li<IStep>`
    width: 33%;
    display: inline-block;
    text-align: center;
    padding: 1em 0;
    background: ${props => props.selected ? `#FFF` : `#F1F1F1`};
    color: ${props => props.selected ? `#111` : `inherit`};

    :hover {
        cursor: ${props => props.canSelect ? `pointer` : `not-allowed`};
    }
`
const ActionContainer = styled.div`
    padding: 1em 0.25rem;
`

interface IState {
    step: number; // holds the current step the user is in the process
    safeAddress: string; // holds the identified safe address
}

const DEFAULT_STATE = {
    step: 0,
    safeAddress: "0x0000000000000000000000000000000000000000"
}

class Stepper extends React.Component<{ connect: any, reset: any }, IState> {
    state: IState = DEFAULT_STATE;

    constructor(connect: any, reset: any) {
        super({ connect, reset});
        this.updateState = this.updateState.bind(this)
    }

    updateState(args: any) {
        this.setState({
            ...this.state,
            ...args,
            step: args.nextStep
        })
    }

    renderSwitch(step: number) {
        switch(step) {
            default :
            case 0 :
                return(<>
                            <ConnectWalletStep
                                connect={this.props.connect}
                                reset={this.props.reset}    
                            />
                            <VerifySafeAddress 
                                callback={this.updateState} 
                            />
                        </>)
            case 1 :
                return(<>
                            <ERC20 
                                callback={this.updateState} 
                                safeAddress={this.state.safeAddress}
                            />
                        </>)
            case 2 :
                return(<>
                            <Nft
                                callback={this.updateState} 
                                safeAddress={this.state.safeAddress}
                            />
                        </>)
            case 3 :
                return(<>
                            <Contracts
                                callback={this.updateState} 
                                safeAddress={this.state.safeAddress}
                            />
                        </>)
        }
    }

    render() {
        return(<Container>

            { this.state.step > 0 && <>
                <Heading>
                    3. Migrate Assets
                </Heading>
                <SafeAddressPanel disconnect={this.props.reset} callback={this.updateState} safeAddress={this.state.safeAddress} />
            </>}

            { 
                this.state.step > 0 &&
                    <Steps>
                        <Step
                            onClick={() => this.state.step > 0 && this.updateState({nextStep: 1})} 
                            selected={this.state.step == 1}
                            canSelect={this.state.step > 0}
                            key={1}
                        >
                            ERC20 Assets
                        </Step>
                        <Step 
                            onClick={() => this.state.step > 0 && this.updateState({nextStep: 2})} 
                            selected={this.state.step == 2}
                            canSelect={this.state.step > 0}
                            key={2}
                        >
                            ERC721 / ERC1115 Assets
                        </Step>
                        <Step  
                            onClick={() => this.state.step > 0 && this.updateState({nextStep: 3})} 
                            selected={this.state.step == 3}
                            canSelect={this.state.step > 0}
                            key={3}
                        >
                            Contract Ownership
                        </Step>
                    </Steps>
            }

            <ActionContainer>
                {this.renderSwitch(this.state.step)}
            </ActionContainer>
        </Container>)
    }
}

export default Stepper;