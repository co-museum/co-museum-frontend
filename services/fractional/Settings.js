import {createAlchemyWeb3} from "@alch/alchemy-web3";
const alchemyKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;
const web3 = createAlchemyWeb3(alchemyKey);

import SettingsABI from '../../def/fractional/Settings.sol/Settings.json'

const settingsContract = new web3.eth.Contract(
    SettingsABI.abi,
    process.env.NEXT_PUBLIC_CONTRACT_Settings
)