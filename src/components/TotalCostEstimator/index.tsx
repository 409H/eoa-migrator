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
        const gas = await fetch(chainInfo.gas.replace("{apikey}", chainInfo.default_api_key))
            .then(response => response.json())
                .then(data => {
                    return data.result.SafeGasPrice
                })
                .catch((e) => {
                    console.log(e)
                })
       
        // Get the average
        return gas;
    }

    const totalGas = BigNumber.from(avgGasLimit * totalTransactions).mul(gasAverage)

    return(
        <Container color={chainInfo.bg}>
            It will cost approximately { utils.formatUnits(totalGas, 9) } {chainInfo.ticker} to transfer all of these assets (at current average gas price)!
        </Container>
    )
}

export default TotalCostEstimator;