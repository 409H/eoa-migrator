import React, { useState, useContext } from "react"
import styled from "styled-components"

import { AppStateContext } from "../../../App"
import { verifySignedMessage } from '../../../utils/signedMessage'

const Container = styled.div`
    padding: 0.25em;
`
const Heading = styled.h3`
    font-size: 23pt;
    margin: 0 0 1em 0;
`
const Description = styled.p`
    font-size: 12pt;
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

const VerifySafeAddress = (props: any) => {
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
            <Heading>Verify Safe Address</Heading>
            <Description>
                You will need to configure a safe address to proceed with using the 
                application. To do this, you will need to sign a message with the 
                safe address so that we can be sure;
            </Description>

            <List>
                <li>You own the keys to the safe address</li>
                <li>There is no clipboard malware changing crypto addresses to steal your assets</li>
            </List>

            <Description>
                You can sign a message with a third-party tool located at {' '}
                <a href="https://app.mycrypto.com/sign-message">https://app.mycrypto.com/sign-message</a>.<br />

                Then you will have to copy and paste the output of that below and press "Submit".
            </Description>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <TextArea ref={signedMessageRef} rows={15} cols={50} placeholder={`Input your Signed Message proof`}></TextArea>
            <ConfirmButton onClick={() => setIsChecked(!isChecked)}>
                <input type="checkbox" checked={isChecked} />
                If I am migrating EOAs because my address is potentially compromised, I confirm that this safe address is not derived from the same <a href="https://metamask.zendesk.com/hc/en-us/articles/360060826432-What-is-a-Secret-Recovery-Phrase-and-how-to-keep-your-crypto-wallet-secure" target="_blank" rel="nofollow">SRP</a>.
            </ConfirmButton>
            <Button onClick={() => handleClick()}>Submit</Button>
        </Container>
    )
}

export default VerifySafeAddress;