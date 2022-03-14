import React, { useEffect, useContext, useState } from "react"
import styled from "styled-components"
import { ethers, utils } from "ethers"

import CONFIG from "@config"
import { AppStateContext } from "../../../App"

import Contract from "./Contract"
import { IChain } from "./types"

interface IViewSelector {
    selected: boolean;
}

const Loading = styled.img`
    display: block;
`
const TotalCreated = styled.div`
    margin: 0.5em 0;
`
const Error = styled.div`
    margin: 0.5em 0;
    padding: 0.25em;
    background: #BE5125;
`
const ItemList = styled.ul`
    list-style-type: disc;
    margin: 0 1em;
`

const Item = styled.li`
    margin: 0.25em 0;
`
const ViewSelector = styled.div<IViewSelector>`
    font-size: 80%;
    display: inline-block;
    margin: 0 1em 2em 0;
    border: 1px solid #999;
    color: ${props => props.selected ? `#FFF` : `#000`};
    border-radius: 5%;
    padding: 0.5em;
    background: ${props => props.selected ? `#353535` : `transparent`};

    :hover {
        cursor: ${props => !props.selected ? `pointer` : `not-allowed`};
    }
`
const Button = styled.div`
    display: inline-block;
`

const Contracts = (props: any) => {
    const [isLoading, setIsLoading] = useState(true)
    const [totalToFetch, setTotalToFetch] = useState(0)
    const [prettyView, setPrettyView] = useState(true)
    const [error, setError] = useState("")
    const [results, setResults] = useState<{ hash: string; addr: string; block: number;}[]>([])
    const AppState = useContext(AppStateContext)
    const { CHAINS } = CONFIG

    useEffect(() => {
        setIsLoading(true)
        getPastTransactions();
    }, [AppState]);

    const getChainEndpoint = (api: boolean = true) => {
        const chain = CHAINS.filter((chain: IChain) => chain.chainId === AppState.chainId)
        if(chain.length) {

            if(api) {
                let endpoint = chain[0].api;
            
                endpoint = endpoint.replace("{address}", "0x11b6A5fE2906F3354145613DB0d99CEB51f604C9") //AppState.userAddress)
                endpoint = endpoint.replace("{apikey}", chain[0].default_api_key)

                return endpoint;
            }

            return chain[0].explorer_tx
        }
    
        console.log(`Unsupported chain!`)
    }

    const getTxReceipt = async (hash: string) => {
        const { provider } = AppState
        console.log(`Fetching data for tx ${hash}`)
        return await provider.getTransactionReceipt(hash)
    }

    const getTransactionReceipts = async (txData: any[]) => {
        return Promise.all(
            txData.map(data => getTxReceipt(data.hash))
        )
    }

    const getPastTransactions = async () => {
        const endpoint = getChainEndpoint()
        const res = await fetch(endpoint)
            .then(response => response.json())
            .then(data => {
                if(data.message === "NOTOK") {
                    setIsLoading(false)
                    setError(data.result)
                    return []
                } 
                return data.result
            })
            .catch((e) => {
                console.log(e)
            })

        if(res.length) {
            // Filter out results for contract creations tx
            const contracts = res.filter( (tx: any) => tx.to == "")
            setTotalToFetch(contracts.length)

            // Get the transaction receipts for each tx to get the contract address
            await getTransactionReceipts(contracts).then( (res) => {
                const contractsCreated = res.map((result) => {
                        return {
                            hash: result?.transactionHash ?? `RPC: Error`,
                            addr: result?.contractAddress ?? `RPC: Error`,
                            block: result?.blockNumber ?? 0,
                        }
                })

                setResults(Object.values(contractsCreated))
            })
        }

        setIsLoading(false)
    }

    const showResultsPretty = () => {
        // Render the contracts, if any. And paginate them?
        const totalPages = Math.ceil(results.length / 10)

        const endpoint = getChainEndpoint(false)
        return(<ItemList>
                {results.map((e) => {
                    return(
                        <Contract
                            safeAddress={props.safeAddress}
                            contract={e}
                        />
                        // <Item key={e.hash}>
                        //     <a href={`${endpoint}/${e.hash}`} target="_blank" rel="nofollow noreferer">{e.addr}</a> (Block: {e.block}) <Button onClick={() => checkIfEip173(e.addr)}>Check</Button>
                        // </Item>
                    )})
                }
            </ItemList>)
    }

    const showResultsCodeBlock = () => {
        return(<pre className="language-json">{JSON.stringify(results, null, 4)}</pre>)
    }

    const renderResults = () => {
        if(isLoading) {
            return(<>Fetching Data...<br /></>)
        }

        if(error.length > 0) {
            return(<Error>{error}</Error>)
        }

        if(results.length === 0) {
            return(<Error>No contract creations found</Error>)
        }

        return (<>
            <ViewSelector
                selected={prettyView}
                onClick={() => setPrettyView(!prettyView)}
            >
                Show Pretty View
            </ViewSelector>
            <ViewSelector
                selected={!prettyView} 
                onClick={() => setPrettyView(!prettyView)}  
            >
                Show Raw Data View
            </ViewSelector>
        {
                prettyView 
                    ? showResultsPretty() 
                    : showResultsCodeBlock()
        }
        </>
        )
    }

    return (<>
        <h3>Results</h3>
        <p>
            We check to see if your connected address has directly created a contract within the last 10,000 transactions{' '}
            and if it has and it is detected to be <a href="https://eips.ethereum.org/EIPS/eip-173" target="_blank">EIP173</a> compliant, then we will offer you an easy-to-use button to{' '}
            transfer ownership to your identified safe address.
        </p>
    

        {!isLoading && totalToFetch > 0 && <TotalCreated>Total Contracts Created: {totalToFetch.toString()}</TotalCreated>}

        {renderResults()}
    </>)
}

export default Contracts;