import React, { useContext, useState } from "react"
import styled from "styled-components"
import { ethers, utils } from "ethers"

import CONFIG from "@config"

import { IChain, IContract } from "./types"
import { AppStateContext } from "../../../App"

import { checkIfEip173, getContractOwner } from "../../../utils/contracts"

interface ITransferButton {
    txPending: boolean;
    bgColor: string;
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
const Fullname = styled.div`
    padding: 1em;
    font-size: 26px;
    color: black;
    font-weight: 900;
    margin-bottom: 5px;
`
const Description = styled.div`
    padding: 20px;
    margin-bottom: 10px;
    font: 14px/20px "Lato", Arial, sans-serif;
    color: #9E9E9E;
`
const TransferButton = styled.div<ITransferButton>`
    background: ${props => !props.txPending
                    ? 
                        props.bgColor
                    : 
                    '#DEBC1F'
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
                        ? props.bgColor
                        : '#DEBC1F'};
    }
`

interface IProps {
    contract: IContract,
    safeAddress: string
}

const Contract = (props: IProps) => {
    const AppState = useContext(AppStateContext)
    const [hasCheckedIfEip173, setHasCheckedIfEip173] = useState<boolean>(false)
    const [isContractOwner, setIsContractOwner] = useState<boolean>(false)
    const [isEip173Interface, setIsEip173Interface] = useState<boolean>(false)
    const [txPending, setTxPending] = useState<boolean>(false);
    const { contract, safeAddress } = props;
    const { CHAINS } = CONFIG;

    const isEip173 = async() => {
        const isEip173 = await checkIfEip173(AppState.provider, utils.getAddress(contract.addr));
        let owner = await getContractOwner(AppState.provider, utils.getAddress(contract.addr));

        if(!isEip173) {
            console.log(`${contract.addr} does not seem to be EIP173. Cannot transfer ownership!`)
            setHasCheckedIfEip173(true)
            return;
        }

        if(owner === null) {
            owner = "0x"
        }

        setHasCheckedIfEip173(true)
        setIsEip173Interface(true)
        setIsContractOwner(utils.getAddress(owner as string) === utils.getAddress(AppState.userAddress))
    }

    const transferOwnership = async () => {
        if(txPending) {
            console.log(`There is a transaction pending to transferOwnership of this contract!`);
            return;
        }

        const ABI = ["function transferOwnership(address _newOwner) external"];
        const instance = new ethers.Contract(utils.getAddress(contract.addr), ABI, AppState.signer);

        let tx;
        try {
            tx = await instance.transferOwnership(utils.getAddress(safeAddress))
        } catch(e) {
            console.log(e)
            return;
        }

        // @todo - watch for tx to be mined.
        setTxPending(true)
    }

    const getBlockExplorerLink = () => {
        return CHAINS.filter((chain: IChain) => chain.chainId === AppState.chainId)[0].explorer_addr
    }

    return(
        <Container>
            <Fullname>{[contract.addr.substring(0, 6), contract.addr.substring(36, 42)].join(`...`)}</Fullname>
            <Description>
                Deployed on block {contract.block} <br />
                <a href={`${getBlockExplorerLink()}/${contract.addr}`} target="_blank" rel="nofollow">View on Block Explorer</a>
            </Description>

            {
                // We haven't checked the contract ownership yet
                !hasCheckedIfEip173 
                && <TransferButton
                        bgColor={`#3B2A53`}
                        onClick={() => isEip173()}
                        txPending={txPending}>
                            Check EIP173
                    </TransferButton>
            }

            {
                // We have checked the contract ownership
                // and it is not EIP173
                hasCheckedIfEip173  && !isEip173Interface
                && <TransferButton
                        txPending={txPending}
                        bgColor={`#de1f51`}
                    >
                            Contract is not Ownable
                    </TransferButton>
            }

            {
                // We have checked the contract ownership
                // and they are not the current owner
                hasCheckedIfEip173  && isEip173Interface && !isContractOwner
                && <TransferButton
                        txPending={txPending}
                        bgColor={`#de1f51`}
                    >
                            You are not the owner
                    </TransferButton>
            }

            {
                // We have checked the contract ownership
                // and it can be transferred
                hasCheckedIfEip173 && isContractOwner
                && <TransferButton
                        onClick={() => transferOwnership()}
                        txPending={txPending}
                        bgColor={`#1fde24`}
                    >
                            Transfer Ownership
                    </TransferButton>
            }
        </Container>
    )
}

export default Contract;