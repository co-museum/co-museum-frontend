import {Button, Chip, Divider} from "@mui/material";
import strings from "../../localization";
import {CopyToClipboard} from 'react-copy-to-clipboard';


const ShareDialog = ({link}) => {
    return <>
        <Divider className={'divider mx-m no-margin-top'}/>
        <div className={'d-flex content-center'}>
            <Button className={'item'}>
                <img src="/images/facebook.svg" className={'image-40x40'}/>
            </Button>
            <Button className={'item'}>
                <img src="/images/instagram.svg" className={'image-40x40'}/>
            </Button>
            <Button className={'item'}>
                <img src="/images/twitter.svg" className={'image-40x40'}/>
            </Button>
            <Button className={'item'}>
                <img src="/images/telegram.svg" className={'image-40x40'}/>
            </Button>
            <Button className={'item'}>
                <img src="/images/whatsapp.svg" className={'image-40x40'}/>
            </Button>
        </div>
        <Divider className={'divider mx-m'}/>
        <p className={'font-16 font-grey'}>{strings.common.orCopyLink}</p>
        <Chip className={'chip-link'} label={link}/>
        <CopyToClipboard text={link}>
            <Button className={'black-white-button copy-btn'}>
                <img src="/images/copy.svg" className={'image-14x14'}/>
                {strings.common.copy}
            </Button>
        </CopyToClipboard>
    </>
}

export default ShareDialog;