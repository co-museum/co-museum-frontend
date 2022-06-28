import {useWeb3} from "@3rdweb/hooks";
import {Button, Divider} from "@mui/material";
import strings from "../../localization";
import {substring} from "../../StringUtils";
import {useContext} from "react";
import DialogContext from "../../context/DialogContext";
import {CopyToClipboard} from 'react-copy-to-clipboard';

export const AccountInfo = () => {

    const web3 = useWeb3();

    const {close} = useContext(DialogContext);

    if (!web3.address) {
        close();
    }

    const disconnect = () => {
        // TODO: disconnect problem on github: https://github.com/gnosis/cowswap/issues/227
        web3.connector.emitDeactivate();
        web3.connector.deactivate();
    }

    return <>
        <Divider/>
        <div className={'account'}>
            <span className={'account-title font-black'}>{strings.header.connectedWithWalletConnect}</span>
            <div className={'account-options'}>
                <Button className={'black-white-button bordered mr-1'} onClick={() => disconnect()}>{strings.common.disconnect}</Button>
                <Button className={'white-black-button bordered mr-1'}>{strings.common.change}</Button>
            </div>
        </div>
        <div className={'account-address'}>
            <img src="/images/metamask.svg" className={'image-40x40'}/>
            <span className={'font-20 font-black'}>{substring(web3?.address, {firstBreak: 6, lastBreak: 4})}</span>
        </div>
        <Divider/>
        <CopyToClipboard text={web3?.address}>
            <Button className={'font-12 font-black font-capitalize'}><img src="/images/copy-grey.svg" className={'image-12x12 mr-5px'}/> {strings.common.copyAddress}</Button>
        </CopyToClipboard>
        <a href={'https://etherscan.io/address/' + web3?.address} target='_blank' style={{textDecoration: 'none'}}>
            <Button className={'font-12 font-black font-capitalize'}><img src="/images/view-grey.svg" className={'image-12x12 mr-5px'}/>{strings.common.viewOnExplorer}</Button>
        </a>
    </>
}