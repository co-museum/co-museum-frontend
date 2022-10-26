import {Button, Divider} from "@mui/material";
import strings from "../../localization";
import {substring} from "../../StringUtils";
import {useContext, useEffect, useState} from "react";
import DialogContext from "../../context/DialogContext";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {changeAddressState} from "../../../slices/WalletSlice";
import {useDispatch, useSelector} from "react-redux";

export const AccountInfo = () => {

    const dispatch = useDispatch();
    const {close} = useContext(DialogContext);
    const wallet = useSelector((state) => state.wallet)

    const disconnect = async () => {
        dispatch(changeAddressState(''));
        close()
    }

    return <>
        <Divider/>
        <div className={'account'}>
            <span className={'account-title font-black'}>{strings.header.connectedWithWalletConnect}</span>
            <div className={'account-options'}>
                <Button className={'black-white-button bordered mr-1'} onClick={() => disconnect()}>{strings.common.disconnect}</Button>
                {/*<Button className={'white-black-button bordered mr-1'}>{strings.common.change}</Button>*/}
            </div>
        </div>
        <div className={'account-address'}>
            <img src="/images/metamask.svg" className={'image-40x40'}/>
            <span className={'font-20 font-black'}>{substring(wallet.address, {firstBreak: 6, lastBreak: 4})}</span>
        </div>
        <Divider/>
        <CopyToClipboard text={wallet.address}>
            <Button className={'font-12 font-black font-capitalize'}><img src="/images/copy-grey.svg" className={'image-12x12 mr-5px'}/> {strings.common.copyAddress}</Button>
        </CopyToClipboard>
        <a href={'https://etherscan.io/address/' + wallet.address} target='_blank' style={{textDecoration: 'none'}}>
            <Button className={'font-12 font-black font-capitalize'}><img src="/images/view-grey.svg" className={'image-12x12 mr-5px'}/>{strings.common.viewOnExplorer}</Button>
        </a>
    </>
}