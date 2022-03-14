import React, { useState, useContext, useEffect } from "react"
import styled from "styled-components"

import { AppStateContext } from "../../../App"
import CONFIG from "@config"

import Token from "./Token"

import { getUserErc20AssetBalances } from '../../../utils/erc20'
import { RainbowText } from "../../RainbowText"
import { ITokenList } from "../../../utils/erc20/types"
import { IChain, IGetTokenBalances } from "./types"

const Container = styled.div`
    padding: 0.25em;
`
const Heading = styled.h3`
    font-size: 23pt;
    margin: 0 0 1em 0;
`
const Loading = styled.div`
    margin: 0.25em;
`

const ERC20 = (props: any) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<null | string>()
    const [tokens, setTokens] = useState([])
    const AppState = useContext(AppStateContext)
    const { CHAINS } = CONFIG

    useEffect(() => {
        let mounted = true;
        setLoading(true)
        getTokenBalances().then((ret) => {
            if(!mounted) {
                return;
            }

            const { error, tokens, loading } = ret;
            setLoading(loading);
            setError(error);
            setTokens(tokens)
        });
        return () => {
            mounted = false
        };
    }, [AppState]);

    const getRpcForChainId = () => {
        const chain = CHAINS.filter((chain: IChain) => chain.chainId === AppState.chainId)[0]
        return chain.rpc
    }

    const getTokenBalances = async() => {
        let tokensFromEthScan;
        const RPC_ENDPOINT = getRpcForChainId()
        try {
            tokensFromEthScan = await getUserErc20AssetBalances(RPC_ENDPOINT, AppState.userAddress, AppState.chainId);
        } catch(e) {
            console.log(e);

            let ret: IGetTokenBalances = {
                tokens: [],
                loading: false,
                error: e.message
            }
            return ret;
        }

        let ret: IGetTokenBalances = {
            tokens: tokensFromEthScan.assets.erc20,
            loading: false,
            error: null
        }

        return ret;
    }

    const renderLoadingOrTokens = () => {
        if(loading) {
            return(
                <Loading>
                    <RainbowText text={`Fetching Tokens. Please sit tight!`} />
                </Loading>
            )
        }

        if(error) {
            return(<>
                {error}
            </>)
        }

        if(tokens) {
            if(!tokens.length) {
                return(
                    <>
                        No ERC20 tokens found on the address!
                    </>
                )
            }

            // Some tokens found... loop through!
            return tokens.map( (token: ITokenList) => {
                return(<Token 
                            key={token.address} 
                            token={token}
                            safeAddress={props.safeAddress}
                        />)
            })
        }
    }

    return(
        <Container>
            <Heading>ERC20 Tokens</Heading>
            {renderLoadingOrTokens()}
        </Container>
    )
}

export default ERC20