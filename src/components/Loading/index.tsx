import React from "react"
import styled from "styled-components"

import SvgLoading from "@assets/images/loading.svg"

const Container = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    align-items: center;
`
const LoadingIcon = styled.img`
    height: 70px;
    width: 70px;
`

interface IProps {
    text: string;
}

const Loading = (props: IProps) => {
    const { text } = props
    return(<Container>
        <LoadingIcon src={SvgLoading} />
        {text}
    </Container>)
}

export default Loading;