import React, { useContext } from "react"
import styled from "styled-components"
import CONFIG from "@config";
import { AppStateContext } from "@app";

const Container = styled.div`
    width: fit-content;
    border: 1px solid #222;
    padding: 1em;
    margin: 0 0 1em 0;
`

interface IProps {
    safeAddress: string;
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

    return(<Container>
        <strong>Migrating From:</strong> <a href={`${getAddressLink()}${userAddress}`} target="_blank" rel="nofollow">{userAddress}</a><br />
        <strong>Safe Address:</strong> <a href={`${getAddressLink()}${props.safeAddress}`} target="_blank" rel="nofollow">{props.safeAddress}</a><br />
        <strong>Network:</strong> {getNetworkName()}
    </Container>)
}

export default SafeAddressPanel;