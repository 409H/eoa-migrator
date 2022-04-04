import React, { useContext, useEffect, useState } from "react"
import styled from "styled-components"

import { AppStateContext } from "../../../App"
import CONFIG from "@config"
import { INftEndpoints, IGetUserNFTs } from "./types"
import { getUserNftsFromApi } from "../../../utils/nfts"
import { IResponseFromNftApi, IResponseFromNftApi_Data_Collections } from "../../../utils/nfts/types"

import Loading from "@components/Loading"

import ChainNotSupported from "./ChainNotSupported"
import Collection from "./Collection"

const Container = styled.div`
    padding: 0.25em;
`
const Heading = styled.h3`
    font-size: 23pt;
    margin: 0 0 1em 0;
`

const Nft = (props: any) => {
    const [loading, setLoading] = useState<boolean>(true)
    const [notSupported, setNotSupported] = useState<boolean>(false)
    const [error, setError] = useState<null | string>()
    const [provider, setProvider] = useState<null | string>()
    const [tokens, setTokens] = useState([])

    const AppState = useContext(AppStateContext)
    const { NFTS } = CONFIG

    // Fetch the endpoint for the selected chain
    useEffect(() => {
        let mounted = true;
        setLoading(true)
        getUserNfts().then((ret) => {
            if(!mounted) {
                return;
            }

            const { error, tokens, provider, loading } = ret;

            setLoading(loading);
            setError(error);
            setTokens(tokens);
            setProvider(provider);
        });
        return () => {
            mounted = false
        };
    }, [AppState]);

    const getEndpointForChain = () => {
        const chain = NFTS.ENDPOINTS.filter((endpoint: INftEndpoints) => endpoint.chainId === AppState.chainId)[0]
        return chain.endpoint
    }

    const getUserNfts = async() => {
        let NftsForAddress: IResponseFromNftApi;
        const ENDPOINT = getEndpointForChain()
        setNotSupported(false);

        let ret: IGetUserNFTs = {
            tokens: [],
            provider: null,
            loading: false,
            error: null
        }

        try {
            NftsForAddress = await getUserNftsFromApi(ENDPOINT, AppState.userAddress);
        } catch(e) {
            switch(e.message) {
                case "ERR_NO_DATA_PROVIDER" :
                    setNotSupported(true)
                break;
                default: 

                (ret as IGetUserNFTs) = {
                    tokens: [],
                    provider: null,
                    loading: false,
                    error: e.message
                }

            }

            return ret;
        }

        (ret as IGetUserNFTs) = {
            tokens: NftsForAddress.data.collections,
            provider: NftsForAddress.data.provider,
            loading: false,
            error: null
        }
        
        return ret;
    }
    
    const renderLoadingOrTokens = () => {
        if(loading) {
            return(
                <Loading text={`Fetching NFTs. Please sit tight!`} />
            )
        }

        if(notSupported) {
            return(<ChainNotSupported />)
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
                        No NFTs found belonging to your address from our third-party provider {provider}
                    </>
                )
            }

            // Some tokens found... loop through!
            return tokens.map( (token: IResponseFromNftApi_Data_Collections) => {
                return(<Collection 
                            key={token.contractAddress} 
                            collection={token}
                            safeAddress={props.safeAddress}
                        />)
            })
        }
    }

    return(
        <Container>
             <Heading>NFTs</Heading>

            {renderLoadingOrTokens()}
        </Container>
    )
}

export default Nft;