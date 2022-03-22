import React, { useState, useContext } from "react"
import styled from "styled-components"

import { AppStateContext } from "../../../App"
import { verifySignedMessage } from '../../../utils/signedMessage'
import { ConnectWallet } from '@components/ConnectWallet'

const Container = styled.div`
    padding: 0.25em;
    display: flex;
    flex-direction: row;
    column-gap: 25px;
    align-items: flex-start;
    margin: 0 0 5.5em 0;
`
const ContainerBody = styled.div`
`
const Heading = styled.h3`
    font-weight: 500;
    font-size: 23pt;
    margin: 0 0 0.5em 0;
`
const HeadingExtra = styled.span`
    font-weight: 200;
`
const Description = styled.p`
    font-size: 12pt;
    font-weight: 200;
    text-align: left;
    padding: 0 2em;
`
const List = styled.ul`
    padding: 0.25em 1em;
    list-style-type: circle;
`
const Button = styled.div`
    display: block;
    margin: 1em 0;
    padding: 0.5em 1em;
    background: #302266;
    color: #FFF;
    width: fit-content;

    :hover {
        cursor: pointer;
    }
`
const ConfirmButton = styled(Button)`
    background: #FFF;
    color: #000;
`
const TextArea = styled.textarea`
    margin: 1em 0;
    cols: 50;
`
const ErrorMessage = styled.div`
    display: block;
    width: fit-content;
    background: #BE5125;
    color: #FFF;
    padding: 0.25em;
    margin: 1em 0;
`

const ConnectWalletStep = (props: any) => {
    const [isChecked, setIsChecked] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const AppState = useContext(AppStateContext)

    const signedMessageRef = React.useRef<HTMLTextAreaElement>(null);

    const handleClick = () => {
        setError(``)

        // Check we have connected the wallet
        if(AppState.web3 === null) {
            setError(`Please first connect your wallet in the top right!`)
            return;
        }

        if(!isChecked) {
            setError(`Please confirm your safe address is not derived from the same SRP`)
            return;
        }

        let inputValue = signedMessageRef.current?.value ?? "";

        let formattedInput;
        try {
            formattedInput = JSON.parse(inputValue);
        } catch(e) {
            setError(`Invalid JSON! Cannot verify signed message`)
            return;
        }

        let valid: boolean;
        try {
            valid = verifySignedMessage(formattedInput)
        } catch(e) {
            valid = false
        }

        if(valid) {
            const { address }= formattedInput

            // Signed message is all good!
            props.callback({
                nextStep: 1,
                safeAddress: address
            })

        } else {
            setError(`Invalid Proof! Cannot verify identified safe address through signature.`)
        }
    }

    return(
        <Container>
            <ContainerBody>
                <Heading>
                    1. Connect{' '}
                    <HeadingExtra>the wallet with your assets</HeadingExtra>
                </Heading>
                <Description>
                    This is your potentially compromised wallet. <br />
                    Learn <a href="https://metamask.zendesk.com/hc/en-us/articles/360052511372-I-ve-been-Hacked-Scammed-Unauthorized-transactions-on-my-Account-" target="_blank" rel="nofollow">
                                how to recognize if your wallet is compromised
                    </a>.
                </Description>
            </ContainerBody>
            <ConnectWallet
                connect={props.connect}
                reset={props.reset}
            />
        </Container>
    )
}

export default ConnectWalletStep;