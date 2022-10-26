import {createAlchemyWeb3} from "@alch/alchemy-web3";
const alchemyKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;
const alchemyKeyWithURL = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY_WITH_URL;

let web3 = null;
import AllowanceCrowdsaleABI from '../../def/crowdsale/AllowanceCrowdsale.sol/AllowanceCrowdsale.json'
import { Network, Alchemy } from "alchemy-sdk";
import {AddressZero} from "../../utils/constants/Addresses";
import {ethers} from "ethers";

const alchemyOptions = {
    apiKey: alchemyKey,
    network: Network.ETH_GOERLI
}

const alchemy = new Alchemy(alchemyOptions);

let allowanceCrowdsaleContract = null;

const getAllowanceCrowdsaleContract = () => {

    if(!web3) {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        web3 = createAlchemyWeb3(alchemyKeyWithURL,{ writeProvider: provider })
    }

    if(!allowanceCrowdsaleContract) {
        allowanceCrowdsaleContract = new web3.eth.Contract(
            AllowanceCrowdsaleABI.abi,
            process.env.NEXT_PUBLIC_CONTRACT_AllowanceCrowdsale
        )
    }

    return allowanceCrowdsaleContract
}

export const test = () => {

}

export const getNFTs = async (address) => {
    return await alchemy.nft.getNftsForOwner(address);
}

export const ethRate = async () => {
    return await getAllowanceCrowdsaleContract().methods.ethRate().call()
}

export const isActive = async () => {
    return await getAllowanceCrowdsaleContract().methods.isActive().call()
}

export const getMembershipContract = async () => {
    return await getAllowanceCrowdsaleContract().methods.membershipContract().call()
}

export const getTokenContract = async () => {
    return await getAllowanceCrowdsaleContract().methods.tokenContract().call()
}

export const getFloorPrice = async (contractAddress) => {

    if(alchemyOptions.network === Network.ETH_GOERLI) {
        return 0.4
    }

    return await alchemy.nft.getFloorPrice(contractAddress)
}

export const buyNFTs = async (tierPrice, nftNum, whitelistIndex, proof, payWithEth, stablecoinAddress = AddressZero) => {

    const rate = await ethRate();
    const value = ethers.utils.parseUnits(tierPrice, 6).mul(nftNum).mul(rate);

    const transactionParameters = {
        to: process.env.NEXT_PUBLIC_CONTRACT_AllowanceCrowdsale,
        from: window.ethereum.selectedAddress,
        data: getAllowanceCrowdsaleContract().methods.buyNFTs(nftNum, whitelistIndex, proof, payWithEth, stablecoinAddress).encodeABI(),
        value: value.toHexString()
    };

    try {
        return await window.ethereum.request({
            method: "eth_sendTransaction",
            params: [transactionParameters],
        });
    } catch (error) {
        return ''
    }
}