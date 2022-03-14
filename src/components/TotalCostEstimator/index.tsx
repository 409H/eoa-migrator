import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { utils } from "ethers"

import CONFIG from "@config"

const Container = styled.div`
    display: block;
    margin: 1em 0;
`

interface IProps {
    avgGasLimit: number;
    totalTransactions: number
}

const TotalCostEstimator = (props: IProps) => {
    const { avgGasLimit, totalTransactions } = props;
    const { GAS } = CONFIG;
    const [gasAverage, setGasAverage] = useState<number>(0)

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
        const gas = await fetch(GAS.ENDPOINT)
            .then(response => response.json())
                .then(data => {
                    return data.standard
                })
                .catch((e) => {
                    console.log(e)
                })
       
        return gas;
    }

    return(
        <Container>
            It will cost approximately { utils.formatUnits((avgGasLimit * totalTransactions) * gasAverage, "gwei") } Ether to transfer all of these assets (at current average gas price)!
        </Container>
    )
}

export default TotalCostEstimator;