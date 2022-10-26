import {createAlchemyWeb3} from "@alch/alchemy-web3";
const alchemyKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;
const web3 = createAlchemyWeb3(alchemyKey);

import TokenVaultABI from '../../def/fractional/ERC721TokenVault.sol/TokenVault.json'

const tokenVaultContract = new web3.eth.Contract(
    TokenVaultABI.abi,
    process.env.NEXT_PUBLIC_CONTRACT_TokenVault
)