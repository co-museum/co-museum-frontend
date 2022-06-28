import {Button, Grid, IconButton, Link, Menu, MenuItem} from "@mui/material";
import {useRouter} from 'next/router'
import strings from "../localization";
import {characters} from "../constants/characters";
import {substring} from "../StringUtils";
import {useContext, useState} from "react";

import {useWeb3} from "@3rdweb/hooks"
import DialogContext from "../context/DialogContext";
import {NoWalletConnected} from "./dialogs/NoWalletConnected";
import {AccountInfo} from "./dialogs/AccountInfo";

const Header = () => {

    const { address } = useWeb3();

    const {initDialog} = useContext(DialogContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const links = [
        {title: strings.header.ourOfferings, link: '/our-offerings'},
        {title: strings.header.myCollection, link: '/my-collection', compareWith: ['/my-collection', '/']},
        {title: strings.header.howItWorks, link: '/how-it-works'},
    ]

    const router = useRouter()

    const isCurrentPath = (path, compareWith) => {
        if (compareWith) {
            return compareWith.indexOf(router.pathname) > -1;
        }
        return router.pathname === path;
    }

    const connectToWallet = () => {
        initDialog({
            title: strings.header.noWalletConnected,
            description: strings.header.noWalletConnectedDescription,
            titleClass: 'font-20',
            descriptionClass: 'font-16 font-grey',
            content: <NoWalletConnected/>
        })
    }

    const disconnectWallet = () => {
        initDialog({
            title: strings.header.myAccount,
            titleClass: 'font-20',
            content: <AccountInfo/>
        })
    }

    const responsiveMenu = () => {
        return <div className={'show-m'}>
            <IconButton
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <img src="/images/menu.svg" className="image-16x16" />
            </IconButton>
            <Menu
                PaperProps={{className: 'menu-m-options'}}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                {links.map(({link, title, compareWith}) => (
                    <MenuItem component={Link} key={link} selected={ isCurrentPath(link, compareWith)} href={link} onClick={handleClose}>
                        {title}
                    </MenuItem>
                ))}

            </Menu>
        </div>
    }

    return<header className={'header'}>
        <div className={'header-container'}>
            <div className={'main-menu'}>
                <Link href={'/'} key={'home'}>
                    <img className='logo hide-m' src={"/images/logo.svg"} />
                    <img className='logo show-m' src={"/images/logo-m.svg"} />
                </Link>

                    <div className="show-m m-menu">
                        {
                            !address &&
                            <Button variant={"contained"} className={'black-white-button xs'} onClick={connectToWallet}>{strings.header.connectYourWallet}</Button>
                        }
                        {
                            address &&
                            <Button variant={"contained"} className={'black-white-button xs'} onClick={disconnectWallet}><span className={'mr-1 font-white'}>{substring(address)}</span> <img src="/images/green-point.svg" className={'image-16x16'}/></Button>
                        }
                        {responsiveMenu()}                    
                    </div>

            </div>
            <div>
                <div className={'header-links hide-m'}>
                    {
                        links.map(({title, link, compareWith}) => <Link href={link} key={link} underline="none" className={`link ${isCurrentPath(link, compareWith) && 'active'}`}>
                                {title} {characters.to}
                            </Link>
                        )
                    }
                </div>
            </div>
            <div>
                <div className="hide-m">
                    {
                        !address &&
                        <Button variant={"contained"} className={'black-white-button xs'} onClick={connectToWallet}>{strings.header.connectYourWallet}</Button>
                    }
                    {
                        address &&
                        <Button variant={"contained"} className={'black-white-button xs'} onClick={disconnectWallet}><span className={'mr-1 font-white'}>{substring(address)}</span> <img src="/images/green-point.svg" className={'image-16x16'}/></Button>
                    }
                </div>
            </div>
        </div>
    </header>;
}

export default Header;


