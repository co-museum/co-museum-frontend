

import MembershipERC721 from '../def/MembershipERC721.json';
import {nftContractAddress} from "../utils/config";
import { ethers } from 'ethers';

export const connectMembershipERC721 = async () => {
    return connect(MembershipERC721)
}

const connect = async (value) => {
    console.log('value', value);
    try {
        const { ethereum } = window

        if (ethereum) {
            const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545")
            // const provider = new ethers.providers.Web3Provider(ethereum)
            const signer = provider.getSigner()
            const address = await signer.getAddress()
            const network = await provider.getNetwork()
            console.log('address', address);
            console.log('network', network);
            const nftContract = new ethers.Contract(
                nftContractAddress,
                value.abi,
                signer
            )

            return nftContract;


        } else {
            console.log("Ethereum object doesn't exist!")
        }
    } catch (error) {
        console.log('Error minting character', error)
    }
}