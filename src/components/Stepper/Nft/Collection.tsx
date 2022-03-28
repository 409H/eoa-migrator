import React, { useContext, useState } from "react"
import styled from "styled-components"

import { IResponseFromNftApi_Data_Collections, IResponseFromNftApi_Data_Assets } from "../../../utils/nfts/types"

import Token from "./Token"

interface IProps {
    collection: IResponseFromNftApi_Data_Collections,
    safeAddress: string
}

const Collection = (props: IProps) => {
    const { collectionName, contractAddress, assets } = props.collection

    console.log(props);

    return(
        <>
            <h3>{collectionName}</h3>

            {
                assets.map( (asset: IResponseFromNftApi_Data_Assets) => {
                    return(<Token 
                                key={asset.id} 
                                token={asset}
                                contractAddr={contractAddress}
                                safeAddress={props.safeAddress}
                            />)
                })
            }
        </>
    )

}

export default Collection;