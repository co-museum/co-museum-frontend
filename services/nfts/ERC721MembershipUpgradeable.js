import {createAlchemyWeb3} from "@alch/alchemy-web3";
const alchemyKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY_WITH_URL;
const web3 = createAlchemyWeb3(alchemyKey);

import ERC721MembershipUpgradeableABI from '../../def/nfts/ERC721MembershipUpgradeable.sol/ERC721MembershipUpgradeable.json'

const membershipUpgradeableContract = new web3.eth.Contract(
    ERC721MembershipUpgradeableABI.abi,
    process.env.NEXT_PUBLIC_CONTRACT_ERC721MembershipUpgradeable
)

export const getTierNumRemainingNFTs = async (tier) => {
    return await membershipUpgradeableContract.methods.getTierNumRemainingNFTs(tier).call()
}