import {ethers} from "ethers";

export const connectWallet = async () => {

    if (!window.ethereum) {
        return ''
    }

    try {
        const requested = await window.ethereum.request({
            method: "wallet_requestPermissions",
            params: [{ eth_accounts: {} }],
        });

        const addressArray = await window.ethereum.request({
            method: "eth_requestAccounts",
        });

        return addressArray[0]
    } catch (err) {
        return ''
    }
};

export const getCurrentWalletConnected = async () => {

    if (!window.ethereum) {
        return ''
    }

    try {
        const addressArray = await window.ethereum.request({
            method: "eth_accounts",
        });

        return addressArray.length > 0 ? addressArray[0] : ''
    } catch (err) {
        return ''
    }
};

export const getCurrentNetwork = async () => {

    if (!window || !window.ethereum) {
        return ''
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    return await provider.getNetwork();
}