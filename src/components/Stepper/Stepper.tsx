import React, { useContext } from "react";
import styled from "styled-components"

import SafeAddressPanel from "../SafeAddressPanel"
import VerifySafeAddress from "./VerifySafeAddress"
import ERC20 from "./ERC20"
import Nft from "./Nft"
import Contracts from "./Contracts"

interface IStep {
    selected: boolean;
    canSelect: boolean;
}

const Steps = styled.div`
    display: block;
    border: 1px solid #999;
    width: fit-content;
    padding: 0 2em;
    margin: 2em 0;
`
const Step = styled.li<IStep>`
    display: inline-block;
    padding: 0.5em 1em;
    background: ${props => props.selected ? `#302244` : `transparent`};
    color: ${props => props.selected ? `#FFFFFF` : `inherit`};

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

class Stepper extends React.Component<{}, IState> {
    state: IState = DEFAULT_STATE;

    constructor() {
        super({});
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
                return(<VerifySafeAddress 
                            callback={this.updateState} 
                        />)
            case 1 :
                return(<>
                            <SafeAddressPanel  safeAddress={this.state.safeAddress} />
                            <ERC20 
                                callback={this.updateState} 
                                safeAddress={this.state.safeAddress}
                            />
                        </>)
            case 2 :
                return(<>
                            <SafeAddressPanel  safeAddress={this.state.safeAddress} />
                            <Nft
                                callback={this.updateState} 
                                safeAddress={this.state.safeAddress}
                            />
                        </>)
            case 3 :
                return(<>
                            <SafeAddressPanel  safeAddress={this.state.safeAddress} />
                            <Contracts
                                callback={this.updateState} 
                                safeAddress={this.state.safeAddress}
                            />
                        </>)
        }
    }

    render() {
        return(<>
            <Steps>
                <Step 
                    onClick={() => this.state.step > 0 && this.updateState({nextStep: 0})} 
                    selected={this.state.step == 0}
                    canSelect={this.state.step > 0}
                    key={0}
                >
                    Configure Safe Address
                </Step>
                <Step
                    onClick={() => this.state.step > 0 && this.updateState({nextStep: 1})} 
                    selected={this.state.step == 1}
                    canSelect={this.state.step > 0}
                    key={1}
                >
                    Sweep ERC20 Assets
                </Step>
                <Step 
                    onClick={() => this.state.step > 0 && this.updateState({nextStep: 2})} 
                    selected={this.state.step == 2}
                    canSelect={this.state.step > 0}
                    key={2}
                >
                    Sweep ERC721 / ERC1115 Assets
                </Step>
                <Step  
                    onClick={() => this.state.step > 0 && this.updateState({nextStep: 3})} 
                    selected={this.state.step == 3}
                    canSelect={this.state.step > 0}
                    key={3}
                >
                    Reconfigure Contract Ownerships
                </Step>
            </Steps>

            

            <ActionContainer>
                {this.renderSwitch(this.state.step)}
            </ActionContainer>
        </>)
    }
}

export default Stepper;