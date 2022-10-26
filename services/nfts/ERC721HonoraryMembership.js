import {createAlchemyWeb3} from "@alch/alchemy-web3";
const alchemyKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;
const web3 = createAlchemyWeb3(alchemyKey);

import ERC721HonoraryMembershipABI from '../../def/nfts/ERC721HonoraryMembership.sol/ERC721HonoraryMembership.json'

const honoraryMembershipContract = new web3.eth.Contract(
    ERC721HonoraryMembershipABI.abi,
    process.env.NEXT_PUBLIC_CONTRACT_ERC721ArtNFT
)