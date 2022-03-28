import React from "react"
import styled from "styled-components"

const Container = styled.div`
    padding: 0.25em;
    display: flex;
    flex-direction: column;
    column-gap: 25px;
    align-items: flex-start;
    margin: 0 20% 5.5em 0;
`
const Heading = styled.h3`
    font-weight: 500;
    font-size: 23pt;
    margin: 0 0 1em 0;
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

const ChainNotSupported = () => {
    return(
        <Container>
            <Heading>
                Sorry!{' '}
                <HeadingExtra>Currently this tools does not support NFTs on this chain.</HeadingExtra>
            </Heading>
            <Description>
                Finding a data provider for NFTs for this chain is proving hard.{' '}
                Please <a href="https://github.com/409H/eoa-migrator/issues/new" target="_blank" rel="nofollow">Open an Issue</a> if you can suggest one.
            </Description>
        </Container>
    )
}

export default ChainNotSupported;