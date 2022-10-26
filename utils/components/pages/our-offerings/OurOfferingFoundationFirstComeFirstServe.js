import {Box, Button, Chip, Divider, Grid, Slider, Typography} from "@mui/material";
import strings from "../../../localization";
import {formatDuration} from "../../../DateUtils";
import moment from "moment";
import {useContext, useEffect, useState} from "react";
import DialogContext from "../../../context/DialogContext";
import ArtworkPage from "../../dialogs/ArtworkPage";
import {ArtworkPageState} from "../../../constants/ArtworkPageState";
import QuestionMark from "../../dialogs/QuestionMark";
import {NumberToString} from "../../../StringUtils";
import {NoWalletConnected} from "../../dialogs/NoWalletConnected";
import {useWeb3} from "@3rdweb/hooks";
import BuyToken from "../../dialogs/BuyToken";
import SuccessfulPurchase from "../../dialogs/SuccessfulPurchase";
import BuyTokenPackages from "../../dialogs/BuyTokenPackages";


const OurOfferingFoundationFirstComeFirstServe = ({item}) => {
    let now = moment(); //todays date
    let end = moment(item.endDate); // another date
    const [duration, setDuration] = useState(moment.duration(end.diff(now)));
    const {initDialog, close} = useContext(DialogContext);

    const [activePrice, setActivePrice] = useState('USD');
    const { address } = useWeb3();


    const isActivePrice = (label) => {
        return activePrice === label? 'active': ''
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setDuration(value => {
                let v = moment.duration(value);
                v.add(-1, 'seconds');
                return v;
            })
        }, 1000);
        return () => {
            clearInterval(interval);
        }
    }, [])

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

    const buyTokenPackages = () => {
        initDialog({
            description: <span>{strings.ourOfferings.choosePackage} <QuestionMark title={'Redeem NFTs'} description={'You will only receive a placeholder NFT. The collection reveal will happen after the sale.'}/></span>,
            title: `${item.percent} of ${item.percentOf} Sold`,
            titleClass: 'font-16 line-h-22',
            descriptionClass: 'font-32 font-black line-h-40',
            dialogClass: 'artwork-page',
            contentClass: 'bg-black',
            content: <BuyTokenPackages />
        })
    }

    const connectToWallet = () => {
        initDialog({
            title: strings.header.noWalletConnectedDescription,
            description: strings.header.noWalletConnected,
            titleClass: 'font-20',
            descriptionClass: 'font-16 font-grey',
            content: <NoWalletConnected/>
        })
    }

    const changeActivePrice = newValue => {
        setActivePrice(newValue);
        close();
    }

    const buyTokens = () => {
        if (activePrice === 'USD') {
            initDialog({
                title: strings.buyTokens.title,
                titleClass: 'font-20',
                content: <BuyToken/>,
                actions: <div className={'d-flex center-flex mt-1'}>
                    <Button className={'black-white-button mr-12px w-50'}>{strings.common.continue}</Button>
                    <Button className={'white-black-button bordered w-50'} onClick={() => changeActivePrice('USDC')}>{strings.common.changeCurrency}</Button>
                </div>
            })
        } else {
            initDialog({
                title: strings.successfulPurchase.title,
                dialogClass: 'dialog-xs',
                titleClass: 'font-20',
                content: <SuccessfulPurchase/>,
            })

        }
    }
    return <>
        <Grid item xs={12}>
            <Box className={'box-green p-m-0-m'}>
                <div>
                    <Typography className={'font-16 light-font'}>{strings.ourOfferings.timeToAllowlistSaleEnd} </Typography>
                    <Typography className={'date-duration-format'}>
                        {formatDuration(duration)}
                    </Typography>
                </div>
            </Box>
        </Grid>
        <Grid item xs={12} md={12}>
            <Box className={'box-grey-1 p-m-0-m'}>
                <div className="mt-0-m">
                    <Typography className={'font-16 light-font'}>{strings.ourOfferings.currentValue}</Typography>
                    <Typography className={'font-20'}>{item.currency} {NumberToString(item.value, item.currency)}</Typography>
                </div>
            </Box>
        </Grid>
        <Grid item xs={12}>
            <Box className={'box-grey-1 p-m-0-m br-b-0-m'}>
                <div className="mt-0-m">
                    <Typography className={'font-16 light-font'}>{strings.ourOfferings.nftsSold} <span className={'font-12 float-right'}>{item.percent} of {item.percentOf}</span></Typography>
                    <Slider className={'percentage-slider'} defaultValue={item.percentageOfTokensSold} step={10} min={0} max={100} disabled />
                </div>
            </Box>
        </Grid>
        <Grid item xs={12}>
            <Button variant={'outlined'} className={'full-size-button black-white-button btn-md w-100 font-20'} onClick={() => buyTokenPackages()}>{strings.ourOfferings.RedeemNFTs}</Button>
        </Grid>
        <Grid item md={6} xs={5}>
            <Button variant={'outlined'} className={'full-size-button white-black-button btn-md bordered w-100 m-xs font-20'} onClick={() => openArtworkPage()}>{strings.ourOfferings.findOutMore}</Button>
        </Grid>
        <Grid item md={6} xs={5}>
            <Button variant={'outlined'} className={'full-size-button white-black-button btn-md bordered w-100 m-xs font-20'} onClick={() => openArtworkPage(ArtworkPageState.MEMBERSHIP)}>{strings.ourOfferings.membershipTiers}</Button>
        </Grid>
    </>
}

export default OurOfferingFoundationFirstComeFirstServe;