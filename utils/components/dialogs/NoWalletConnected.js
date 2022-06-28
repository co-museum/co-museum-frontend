import {useWeb3} from "@3rdweb/hooks";
import {Button, Divider} from "@mui/material";
import strings from "../../localization";
import {useContext} from "react";
import DialogContext from "../../context/DialogContext";
import {characters} from "../../constants/characters";


export const NoWalletConnected = () => {

    const web3 = useWeb3();

    const {close} = useContext(DialogContext);

    const connectMetamask = () => {
        web3.connectWallet('injected').then(r => close())
    }

    const connectWalletConnect = () => {
        web3.connectWallet('walletconnect').then(r => close())
    }

    return <>
        <Divider className={'mx-m'}/>
        <Button className={'wallet-btn font-black'} onClick={() => connectMetamask()}>
            <span className={'wallet-btn-title'}>
                <img src="/images/metamask.svg" className={'image-40x40'}/>
                <span>Metamask</span>
            </span>
            <span>{characters.to}</span>
        </Button>
        <Divider className={'mx-m'}/>
        <Button className={'wallet-btn font-black'} onClick={() => connectWalletConnect()}>
            <span className={'wallet-btn-title'}>
                <img src="/images/wallet-connect.svg" className={'image-40x40'}/>
                <span>WalletConnect</span>
            </span>
            <span>{characters.to}</span>
        </Button>
        <Divider className={'mx-m'}/>
        <Button className={'font-13 font-black font-capitalize'} href={'https://metamask.io/faqs/'} target={'_blank'}>
            <img src="/images/question-mark.svg" className={'image-13x13'}/>
            <span className={'ml-1'}>{strings.header.metamaskInfo}</span>
        </Button>
    </>
}