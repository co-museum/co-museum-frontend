import {Box, Button, Grid, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Typography} from "@mui/material";
import strings from "../../../localization";
import {ArtworkPageState} from "../../../constants/ArtworkPageState";
import ArtworkPage from "../../dialogs/ArtworkPage";
import {useContext, useEffect, useState} from "react";
import DialogContext from "../../../context/DialogContext";
import QuestionMark from "../../dialogs/QuestionMark";
import {NumberToString} from "../../../StringUtils";
import SwapToken from "../../dialogs/SwapToken";
import {getOpenSeaCollectionStats} from "../../../../services/opensea/OpenSeaService";
import {getRate} from "../../../../services/rateService/RateService";


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
    const [collectionStats, setCollectionStats] = useState(null);
    const [ethRate, setEthRate] = useState(0)
    const open = Boolean(anchorEl);

    useEffect(() => {
        getOpenSeaCollectionStats(process.env.NEXT_PUBLIC_COLLECTION_SLUG).then(response => {

            if(!response) {
                return
            }

            setCollectionStats(response.stats)
        })

        getRate().then(response => {
            setEthRate(response.USD)
        })
    }, [])


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
        plusPercentage: '+3.56% (7d)',
        currency: '$',
        from: '0.0',
        to: '0.0',
        availableLiquidity: 400000
    }

    const openArtworkPage = (pageState = ArtworkPageState.ABOUT) => {
        initDialog({
            title: item.owner,
            description: `${item?.title} (${item?.year})`,
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
                <Typography className={'font-16 pb-14px light-font'}>{strings.ourOfferings.swapTokens}
                    <span className={'float-right'}>
                <img src="/images/settings.svg" className={'image-15x15 mr-5px mr-8-m'}/>
                <img src="/images/reload.svg" className={'image-15x15'}/>
            </span>
                </Typography>
                <Box className={'box-white box-price-offerings br-b-0-m'}>
                    <div>
                        <Typography>{strings.ourOfferings.from} <span
                            className={'float-right'}>{strings.ourOfferings.balance}:-</span></Typography>

                        {
                            directionBottom &&
                            <Typography><span className={'readonly-text'}>{item.from}</span>
                                <IconButton className={'float-right m-0 p-0'}
                                            aria-controls={open ? 'currency-menu' : undefined} aria-haspopup="true"
                                            aria-expanded={open ? 'true' : undefined} onClick={handleClick}>
                                    <img src={activeCurrency.icon} className={'image-15x15 mr-5px mr-6-m'}/>
                                    <span className={'mr-5px'}>{activeCurrency.name}</span>
                                    <img src="/images/menu-down.svg" className={'image-12x6'}/>
                                </IconButton>
                                <Menu id="currency-menu" anchorEl={anchorEl} open={open}
                                      onClose={() => handleClose()}
                                      MenuListProps={{'aria-labelledby': 'basic-button',}}>
                                    {menuItems()}
                                </Menu>
                            </Typography>
                        }
                        {
                            !directionBottom &&
                            <Typography><span className={'readonly-text'}>{item.to}</span> <span
                                className={'float-right'}>
                        <img src="/images/grey-1-point.svg" className={'image-15x15 mr-5px mr-6-m'}/>
                                {'BKLN'}
                            </span>
                            </Typography>
                        }
                    </div>
                </Box>
                <div className={'d-flex center-flex'}>
                    <IconButton className={'arrow-grey-down p-0-m '} onClick={() => setDirectionBottom(v => !v)}>
                        <img src="/images/arrow-green.svg" className={'image-32x32'}/>
                    </IconButton>
                </div>
                <Box className={'box-white box-price-offerings br-b-0-m'}>
                    <div>
                        <Typography>{strings.ourOfferings.to} <span
                            className={'float-right'}>{strings.ourOfferings.balance}:-</span></Typography>
                        {
                            directionBottom &&
                            <Typography><span className={'readonly-text'}>{item.to}</span> <span className={'float-right'}>
                        <img src="/images/grey-1-point.svg" className={'image-15x15 mr-5px mr-6-m'}/>
                                {'BKLN'}
                    </span></Typography>
                        }
                        {
                            !directionBottom &&
                            <Typography><span className={'readonly-text'}>{item.from}</span>
                                <IconButton className={'float-right m-0 p-0'}
                                            aria-controls={open ? 'currency-menu' : undefined} aria-haspopup="true"
                                            aria-expanded={open ? 'true' : undefined} onClick={handleClick}>
                                    <img src={activeCurrency.icon} className={'image-15x15 mr-5px mr-6-m'}/>
                                    <span className={'mr-5px'}>{activeCurrency.name}</span>
                                    <img src="/images/menu-down.svg" className={'image-12x6'}/>
                                </IconButton>
                                <Menu id="currency-menu" anchorEl={anchorEl} open={open}
                                      onClose={() => handleClose()}
                                      MenuListProps={{'aria-labelledby': 'basic-button',}}>
                                    {menuItems()}
                                </Menu>
                            </Typography>
                        }
                    </div>
                </Box>
                <Button variant={'outlined'} className={'full-size-button black-white-button xs mt-1 m-xs'}
                        onClick={swapToken}>{strings.ourOfferings.swapTokens}</Button>
            </div>
        </Box>

    }

    const viewOnOpenSea = () => {
        window.open(process.env.NEXT_PUBLIC_COLLECTION_LINK);
    }

    return <>

        <Grid item xs={12} md={12} className='p-m-0-m'>
            <Box className={'box-grey-1 p-m-0-m'}>
                <div className="mt-0-m">
                    <Typography className={'font-16 light-font'}>{strings.ourOfferings.membership}<QuestionMark
                        title='Current artwork value'
                        description={"Effectively, $BKLN tokens market cap in USD. Total supply of $BKLN tokens multiplied by the current BKLN/USDC exchange rate in Co-Museum's primary liquidity pool."}/></Typography>
                    <Typography className={'font-20 fw-500'}>5,738 membership NFTs</Typography>
                </div>
            </Box>
        </Grid>
        <Grid item xs={12} md={12} className='p-m-0-m'>
            <Box className={'box-grey-1 p-m-0-m'}>
                <div className="mt-0-m">
                    <Typography className={'font-16 light-font'}>{strings.ourOfferings.floorPrice}<QuestionMark
                        title='Current artwork value'
                        description={"Effectively, $BKLN tokens market cap in USD. Total supply of $BKLN tokens multiplied by the current BKLN/USDC exchange rate in Co-Museum's primary liquidity pool."}/></Typography>
                    <Typography className={'font-20 fw-500'}>{collectionStats?.floor_price}</Typography>
                </div>
            </Box>
        </Grid>
        <Grid item xs={12} md={12} className='p-m-0-m'>
            <Box className={'box-grey-1 p-m-0-m'}>
                <div className="mt-0-m">
                    <Typography className={'font-16 light-font'}>{strings.ourOfferings.tradingValue}<QuestionMark
                        title='Current artwork value'
                        description={"Effectively, $BKLN tokens market cap in USD. Total supply of $BKLN tokens multiplied by the current BKLN/USDC exchange rate in Co-Museum's primary liquidity pool."}/></Typography>
                    <Typography className={'font-20 fw-500'}>{NumberToString(collectionStats?.market_cap, '')}</Typography>
                </div>
            </Box>
        </Grid>
        <Grid item xs={12}>
            <Button variant={'outlined'}
                    className={'full-size-button black-white-button btn-md w-100 font-20'}
                    onClick={() => viewOnOpenSea()}>{strings.ourOfferings.ViewOnOpenSea}</Button>
        </Grid>
        <Grid item md={6} xs={12}>
            <Button variant={'outlined'} className={'full-size-button black-white-button btn-md w-100 bordered font-20'}
                    onClick={() => openArtworkPage()}>{strings.ourOfferings.findOutMore}</Button>
        </Grid>
        <Grid item md={6} xs={12}>
            <Button variant={'outlined'} className={'full-size-button white-black-button btn-md w-100 bordered font-20'}
                    onClick={() => openArtworkPage(ArtworkPageState.MEMBERSHIP)}>{strings.ourOfferings.membershipTiers}</Button>
        </Grid>
    </>
}

export default OurOfferingDuringSale;