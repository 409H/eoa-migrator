import React from "react";
import styled from "styled-components"

import CONFIG from '@config';

const Container = styled.div`
    margin: 1em;
    text-align: center;
    font-weight: 800;
`
const ChainBox = styled.div`
    display: block;
    border: 1px solid #999;
    border-radius: 5%;
    padding: 0.5em;
    width: fit-content;
    margin: 0.25em auto;
`

const NotSupportedChain = () => {
    const { CHAINS } = CONFIG;

    return(<Container>
        Sorry, but you are not on a supported network! <br /><br />
        Please switch to a supported network. <br /><br />
        {
            CHAINS.map((chain: any) => {
                return(
                    <ChainBox>
                        <strong>{chain.name}</strong> (ID: {chain.chainId})
                    </ChainBox>
                )
            })
        }
    </Container>)
}

export default NotSupportedChain;