import {createAlchemyWeb3} from "@alch/alchemy-web3";
const alchemyKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;
const web3 = createAlchemyWeb3(alchemyKey);

import ERC721ArtNFTABI from '../../def/nfts/ERC721ArtNFT.sol/ERC721ArtNFT.json'

const artNFTContract = new web3.eth.Contract(
    ERC721ArtNFTABI.abi,
    process.env.NEXT_PUBLIC_CONTRACT_ERC721ArtNFT
)