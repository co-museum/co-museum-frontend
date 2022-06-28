import {Box, Button, Grid, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Typography} from "@mui/material";
import strings from "../../../localization";
import {ArtworkPageState} from "../../../constants/ArtworkPageState";
import ArtworkPage from "../../dialogs/ArtworkPage";
import {useContext, useState} from "react";
import DialogContext from "../../../context/DialogContext";
import QuestionMark from "../../dialogs/QuestionMark";
import {NumberToString} from "../../../StringUtils";
import SwapToken from "../../dialogs/SwapToken";


const currencies = [
    {name: 'USDT', icon: '/images/usdt.png'},
    {name: 'USDC', icon: '/images/usdc.png'},
    {name: 'USD', icon: '/images/usd.png'},
]

const OurOfferingDuringSale = () => {
    const {initDialog} = useContext(DialogContext);

    const [directionBottom, setDirectionBottom] = useState(false);

    const [activeCurrency, setActiveCurrency] = useState(currencies[2])
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (currency) => {
        setAnchorEl(null);
        if (currency) {
            setActiveCurrency(currency);
        }
    };

    const item = {
        owner: 'Banksy',
        title: 'Laugh now',
        year: 2003,
        value: 18120000,
        tokenPrice: 4.53,
        plusPercentage: '+3.56',
        currency: '$',
        from: '0.0',
        to: '0.0',
        availableLiquidity: 400000
    }

    const openArtworkPage = (pageState = ArtworkPageState.ABOUT) => {
        initDialog({
            title: `${item?.title} (${item?.year})`,
            description: item.owner,
            titleClass: 'font-16',
            descriptionClass: 'font-32 font-black',
            dialogClass: 'artwork-page',
            content: <ArtworkPage item={item} pageState={pageState}/>
        })
    }

    const swapToken = () => {
        initDialog({
            title: strings.successfulSwap.title,
            dialogClass: 'dialog-xs',
            titleClass: 'font-20',
            content: <SwapToken/>,
        })
    }

    const menuItems = () => {
        let items = [];
        const newItem = (c, first = false) => (<MenuItem onClick={e => handleClose(c)}>
            <ListItemIcon>
                <img src={c.icon}/>
            </ListItemIcon>
            <ListItemText><span className={'font-12'}>{c.name}</span></ListItemText>
            {first &&
            <ListItemIcon className={'menu-close'}>
                <img src="/images/menu-up.svg" className={'ml-1'}/>
            </ListItemIcon>
                }
        </MenuItem>);
        currencies.forEach(c => {
            if (c === activeCurrency) {
                items.unshift(newItem(c, true));
            } else {
                items.push(newItem(c));
            }
        })
        return items;
    }


    const templateSwapTokens = () => {
        return <Box className={'box-grey-1 w-100 br-b-0-m'}>
        <div>
            <Typography className={'font-16 pb-14px'}>{strings.ourOfferings.swapTokens}
            <span className={'float-right'}>
                <img src="/images/settings.svg" className={'image-15x15 mr-5px mr-8-m'}/>
                <img src="/images/reload.svg" className={'image-15x15'}/>
            </span>
            </Typography>
            <Box className={'box-white box-price-offerings br-b-0-m'}>
                <div>
                    <Typography>{strings.ourOfferings.from} <span className={'float-right'}>{strings.ourOfferings.balance}:-</span></Typography>
                    <Typography><span className={'readonly-text'}>{item.from}</span>
                        <IconButton className={'float-right m-0 p-0'} aria-controls={open ? 'currency-menu' : undefined} aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined} onClick={handleClick}>
                            <img src={activeCurrency.icon} className={'image-15x15 mr-5px'}/>
                            <span className={'mr-5px'}>{activeCurrency.name}</span>
                            <img src="/images/menu-down.svg" className={'image-12x6'}/>
                        </IconButton>
                        <Menu id="currency-menu" anchorEl={anchorEl} open={open}
                            onClose={() => handleClose()} MenuListProps={{'aria-labelledby': 'basic-button',}}>
                            {menuItems()}
                        </Menu>
                    </Typography>
                </div>
            </Box>
            <div className={'d-flex center-flex'}>
                <IconButton className={'arrow-grey-down ' + (directionBottom? 'active-180': '')} onClick={() => setDirectionBottom(v => !v)}>
                    <img src="/images/arrow-green.svg" className={'image-32x32'}/>
                </IconButton>
            </div>
            <Box className={'box-white box-price-offerings br-b-0-m'}>
                <div>
                    <Typography>{strings.ourOfferings.to} <span className={'float-right'}>{strings.ourOfferings.balance}:-</span></Typography>
                    <Typography><span className={'readonly-text'}>{item.to}</span> <span className={'float-right'}>
                        <img src="/images/grey-1-point.svg" className={'image-15x15 mr-5px'}/>
                        {'BKLN'}
                    </span></Typography>
                </div>
            </Box>
            <Button variant={'outlined'} className={'full-size-button black-white-button xs mt-1 m-xs'} onClick={swapToken}>{strings.ourOfferings.swapTokens}</Button>
        </div>
    </Box>

    }

    return <>
        <Grid item xs={12}>
            <Box className={'box-info p-m-0-m br-b-0-m'}>
                <div>
                    <img src="/images/our-offerings-graph.svg" className={'image-container'}/>
                </div>
            </Box>
        </Grid>
        <Grid item md={6} xs={12} className='show-m'>
            {templateSwapTokens()}
        </Grid>
        <Grid item md={6} xs={12}>
            <Box className={'box-green br-b-1-grey-2 py-5px p-m-0-m'}>
                <div className="mt-0-m">
                    <Typography className={'font-16'}>{strings.ourOfferings.tokenPrice} <QuestionMark/></Typography>
                    <Typography className={'d-flex font-20'}>
                        {item.currency} {item.tokenPrice}
                        <div className={'addon-image'}>
                            <img src="/images/up.svg" className={'image-container up-image'}/>
                            <span className={'addon'}>{item.plusPercentage}</span>
                        </div>
                    </Typography>
                </div>
            </Box>
            <Box className={'box-grey-1 br-b-1-grey-2 py-5px p-m-0-m'}>
                <div className="mt-0-m">
                    <Typography className={'font-16'}>{strings.ourOfferings.currentValue} <QuestionMark/></Typography>
                    <Typography className={'font-20'}>
                        {item.currency} {NumberToString(item.value)}
                    </Typography>
                </div>
            </Box>
            <Box className={'box-grey-1 py-5px p-m-0-m br-b-0-m'}>
                <div className="mt-0-m">
                    <Typography className={'font-16'}>{strings.ourOfferings.availableLiquidity} <QuestionMark/></Typography>
                    <Typography className={'d-flex items-center font-20'}>
                        <div className={'mr-12px mr-16-m'}>
                            {NumberToString(item.availableLiquidity)}
                        </div>
                        <div className={'font-13 d-flex items-center'}>
                            <img src="/images/grey-1-point.svg" className={'image-15x15 mr-5px'}/>
                            <div>{'USDC'}</div>
                        </div>
                    </Typography>
                </div>
            </Box>
        </Grid>
        <Grid item md={6} xs={12} className='hide-m'>
            {templateSwapTokens()}
        </Grid>
        <Grid item md={6} xs={12}>
            <Button variant={'outlined'} className={'full-size-button black-white-button btn-md w-100 bordered font-20'} onClick={() => openArtworkPage()}>{strings.ourOfferings.findOutMore}</Button>
        </Grid>
        <Grid item md={6} xs={12}>
            <Button variant={'outlined'} className={'full-size-button white-black-button btn-md w-100 bordered font-20'} onClick={() => openArtworkPage(ArtworkPageState.MEMBERSHIP)}>{strings.ourOfferings.membershipTiers}</Button>
        </Grid>
    </>
}

export default OurOfferingDuringSale;