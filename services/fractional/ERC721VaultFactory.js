import {createAlchemyWeb3} from "@alch/alchemy-web3";
const alchemyKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;
const web3 = createAlchemyWeb3(alchemyKey);

import ERC721VaultFactoryABI from '../../def/fractional/ERC721VaultFactory.sol/ERC721VaultFactory.json'

const tokenVaultFactoryContract = new web3.eth.Contract(
    ERC721VaultFactoryABI.abi,
    process.env.NEXT_PUBLIC_CONTRACT_ERC721VaultFactory
)