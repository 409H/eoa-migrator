import React, { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import { utils, BigNumber } from "ethers"

import CONFIG from "@config"
import { AppStateContext } from "@app"
import { IChain } from "../Stepper/ERC20/types"

interface IContainer {
    color: string;
}

const Container = styled.div<IContainer>`
    display: block;
    justify-content: space-evenly;
    align-items: center;
    margin: 0 0 5.5em 0;
    background: #FFF;
    border-left: 3px solid ${props => props.color};
    padding: 0.25em;
    border-radius: 0 8px 8px 0;
`

interface IProps {
    avgGasLimit: number;
    totalTransactions: number
}

const TotalCostEstimator = (props: IProps) => {
    const AppState = useContext(AppStateContext)
    const { avgGasLimit, totalTransactions } = props;
    const { CHAINS } = CONFIG;
    const [gasAverage, setGasAverage] = useState<number>(0)
    const chainInfo = CHAINS.filter((chain: IChain) => chain.chainId === AppState.chainId)[0]

    useEffect(() => {
        let mounted = true;
        getCurrentGasPrice().then((ret) => {
            if(!mounted) {
                return;
            }

            setGasAverage(ret)
        });
        return () => {
            mounted = false
        };
    }, [props]);

    const getCurrentGasPrice = async() => {
        // Get the gas oracle
        if(chainInfo.gas === "") {
            return 
        }
        
        const response = await fetch(chainInfo.gas)

        if(!response.ok) {
            const body = await response.text();
            const res = JSON.parse(body);

            // Try to gracefully handle the error
            switch(res.code) {
                case "ERR_NO_DATA_PROVIDER" :
                    throw new Error(res.code)
                default:
                    throw new Error(`Unable to fetch gas data. HTTP status code ${response.status} - ${res.message} - (${res.code})`)
            }
        }

        // Chheck the response body
        const resp = await response.text();
        const res = JSON.parse(resp);

        return res.data.gas.safe;
    }
    
    const totalGas = BigNumber.from((avgGasLimit * totalTransactions).toString()).mul(Math.ceil(gasAverage))

    return(
        <Container color={chainInfo.bg}>
            It will cost approximately { utils.formatUnits(totalGas, 9) } {chainInfo.ticker} to transfer all of these assets (at current average gas price)!
        </Container>
    )
}

export default TotalCostEstimator;