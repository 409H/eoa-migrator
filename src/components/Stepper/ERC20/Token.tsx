import React, { useContext, useState } from "react"
import styled from "styled-components"
import { ethers, utils } from "ethers"

import { ITokenList } from "../../../utils/erc20/types"
import { RainbowText } from "../../RainbowText"
import { AppStateContext } from "../../../App"

interface ITokenLogo {
    src: string;
}
interface ISweepButton {
    txPending: boolean;
}

const Container = styled.div`
    background: white;
    width: 300px;
    display: inline-block;
    border-radius: 19px;
    position: relative;
    text-align: center;
    box-shadow: -1px 15px 30px -12px black;
    margin: 50px;
`
const ImageContainer = styled.div`
    position: relative;
    height: 150px;
    margin-bottom: 5px;
    border-top-left-radius: 14px;
    border-top-right-radius: 14px;
`
const TokenLogo = styled.div<ITokenLogo>`
    background: url(${props => props.src}) no-repeat center;
    width: 150px;
    height: 150px;
    opacity: 0.3;
    margin: 3em auto;
`
const Heading = styled.div`
    position: relative;
    top: -100px;
`
const Fullname = styled.div`
    font-size: 26px;
    color: black;
    font-weight: 900;
    margin-bottom: 5px;
`
const Description = styled.div`
    padding: 20px;
    margin-bottom: 10px;
    font-weight: 200;
    color: #9E9E9E;
`
const SweepButton = styled.div<ISweepButton>`
    background: ${props => !props.txPending
                    ? '#000' 
                    : '#DEBC1F'
                };
    width: 100%;
    color: #FFF;
    font-weight: 800;
    font-size: 16px;
    padding: 15px 0;
    border-bottom-left-radius: 14px;
    border-bottom-right-radius: 14px;
    &:hover {
        cursor: ${props => !props.txPending ? 'pointer' : 'not-allowed'};
        background: ${props => !props.txPending
                        ? '#000'
                        : '#DEBC1F'};
    }
`

interface IProps {
    token: ITokenList,
    safeAddress: string
}

const Token = (props: IProps) => {
    const AppState = useContext(AppStateContext)
    const [txPending, setTxPending] = useState(false);
    const { token, safeAddress } = props;

    const sweepAsset = async () => {
        if(txPending) {
            console.log(`There is a transaction pending to transfer the token balance!`);
            return;
        }

        const ABI = ["function transfer(address to, uint amount) returns (bool)"];
        const contract = new ethers.Contract(utils.getAddress(token.address), ABI, AppState.signer);

        let tx;
        try {
            tx = await contract.transfer(utils.getAddress(safeAddress), token.balance)
        } catch(e) {
            console.log(e)
            return;
        }

        // @todo - watch for tx to be mined.
        setTxPending(true)
    }

    return(
        <Container>
            <ImageContainer>
                <TokenLogo src={token.logoURI ?? ""} />
                <Heading>
                    <RainbowText text={token.symbol} />
                </Heading>
            </ImageContainer>
            <Fullname>{token.name}</Fullname>
            <Description>
                {utils.formatUnits(token.balance, token.decimals)} {token.symbol}
            </Description>
                <SweepButton 
                    txPending={txPending}
                    onClick={() => !txPending && sweepAsset()}>
                        {!txPending
                            ? `Sweep to safe address` 
                            : `Sweeping in progress`
                        }
                </SweepButton>
        </Container>
    )
}

export default Token;