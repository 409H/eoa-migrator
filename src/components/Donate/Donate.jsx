import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { ethers, utils } from "ethers";

import { AppStateContext } from '@app';
import EthLogo from '@assets/images/eth-logo.png';
import CONFIG from "@config"

const Container = styled.div`
    width: inherit;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin: 1em 0 0 0;
`
const Heading = styled.h5`
    font-size: 16pt;
    font-weight: bold;
    margin: 2rem 0 1rem 0;
`
const DonateValue = styled.div`
    padding: 0.5rem;
    background: #222;
    border-radius: 0.5em;
    margin: 0 0.5em;
    font-weight: bold;
    display: flex;
    align-items: center;

    &:hover {
        cursor: pointer;
        background: #444;
    }
`

const CurrencyImg = styled.img`
    width: 15px;
    height: 25px;
    padding: 0 10px 0 0;
`

const Message = styled.div`
    flex: 1 1 100%;
    margin: 1rem;
`

export default function Donate() {
    const [message, setMessage] = useState();
    const AppState = useContext(AppStateContext)
    const { DONATION } = CONFIG

    const executeDonation = (amt, msg, web3, userAddress) => () => {
        setMessage(``)

        if(web3 === null) {
            setMessage(`It looks like you don't have a wallet connected. Please send any donations to ${DONATION.ADDRESS}`)
        } else {
            setMessage(msg)
            try {
                const tx = AppState.signer.sendTransaction({
                    from: utils.getAddress(userAddress),
                    to: utils.getAddress(DONATION.ADDRESS),
                    value: ethers.utils.parseUnits(amt.toString(), 'wei').toHexString(),
                    gasLimit: 21000
                }).catch((e) => {
                    console.log(e);
                    setMessage(e.data.message)
                })
            } catch(e) {
                console.log(e);
                setMessage(e.message)
            }
        }
    };

    return (
        <>
            <Heading>Donate</Heading>
            <small>Donate to help fund development.</small> <br />
            <Container>
                <AppStateContext.Consumer>
                {
                    context => {
                        return DONATION.MAPPING.map((e) => {
                            return (
                                <DonateValue onClick={executeDonation(e.wei, e.msg, context.web3, context.userAddress)}>
                                    <CurrencyImg src={EthLogo} />
                                    <span>{e.name}</span>
                                </DonateValue>
                            )
                        })
                    }
                }
                </AppStateContext.Consumer>
                <Message>
                    {message}
                </Message>
            </Container>
        </>
    )
}
