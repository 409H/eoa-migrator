import React, { useContext } from "react"
import styled from "styled-components"
import CONFIG from "@config";
import { AppStateContext } from "@app";

const Container = styled.div`
    width: fit-content;
    padding: 1em;
    margin: 0 0 1em 0;
`
const Label = styled.div`
    display: inline-block;
    font-weight: 500;
    font-size: 16pt;
    margin: 0 0 0.5em 0;
`
const FakeLink = styled.div`
    display: inline-block;
    padding: 0 2em;
    color: inherit;
    text-decoration: underline;
    font-weight: 700;
    font-size: 10pt;

    &:hover {
        cursor: pointer;
    }
`

interface IProps {
    safeAddress: string;
    disconnect: any;
    callback: any;
}

const SafeAddressPanel = (props: IProps) => {
    const AppState = useContext(AppStateContext)
    const { userAddress } = AppState
    const { CHAINS } = CONFIG;

    const getNetworkName = () => {
        return CHAINS.filter((es: any) => es.chainId === AppState.chainId)[0].name
    }

    const getAddressLink = () => {
        return CHAINS.filter((es: any) => es.chainId === AppState.chainId)[0].explorer_addr
    }

    const handleDisconnect = (disconnect: boolean = true) => {
        if(disconnect) {
            props.disconnect();
        }

        props.callback({
            nextStep: 0
        })
    }

    return(
        <Container>
            <Label>From:</Label> <a href={`${getAddressLink()}${userAddress}`} target="_blank" rel="nofollow">{userAddress}</a>
            <FakeLink onClick={() => handleDisconnect()}>Disconnect</FakeLink>
            
            <br />
            <Label>To:</Label> <a href={`${getAddressLink()}${props.safeAddress}`} target="_blank" rel="nofollow">{props.safeAddress}</a>
            <FakeLink onClick={() => handleDisconnect(false)}>Change</FakeLink>
            
            <br />
            <Label>Network:</Label> {getNetworkName()}
        </Container>
    )
}

export default SafeAddressPanel;