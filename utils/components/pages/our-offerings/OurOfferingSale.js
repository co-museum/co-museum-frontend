import {Box, Button, Grid, Slider, Typography} from "@mui/material";
import strings from "../../../localization";
import moment from 'moment'
import {useContext, useEffect, useState} from "react";
import {formatDuration} from "../../../DateUtils";
import QuestionMark from "../../dialogs/QuestionMark";
import {NumberToString} from "../../../StringUtils";
import {ArtworkPageState} from "../../../constants/ArtworkPageState";
import ArtworkPage from "../../dialogs/ArtworkPage";
import DialogContext from "../../../context/DialogContext";
import NotifyMe from "../../dialogs/NotifyMe";
import JoinWaiteList from "../../dialogs/JoinWaitList";
import {useSelector} from "react-redux";
import {getClientProof} from "../../../../services/base/SettingsService";
import Tiers, {getTierWithCode} from "../../../constants/Tiers";
import BuyTokenPackages from "../../dialogs/BuyTokenPackages";
import {getTierNumRemainingNFTs} from "../../../../services/nfts/ERC721MembershipUpgradeable";
import SalesType from "../../../constants/SalesType";


const OurOfferingSale = ({item, settings}) => {

    const wallet = useSelector((state) => state.wallet)
    const [duration, setDuration] = useState(null);
    const {initDialog} = useContext(DialogContext);
    const [clientSettings, setClientSettings] = useState(null)

    const [genesisRemaining, setGenesisRemaining] = useState(0)
    const [foundationRemaining, setFoundationRemaining] = useState(0)
    const [friendRemaining, setFriendRemaining] = useState(0)
    const [remaining, setRemaining] = useState({
        totalRemaining: 0,
        totalSold: 0,
        total: 5738,
        soldPercent: 0,
    })

    useEffect(() => {
        const interval = setInterval(() => {
            setDuration(value => {
                let v = moment.duration(value);
                v.add(-1, 'seconds');
                return v;
            })
        }, 1000);
        return () => {
            clearInterval(interval)
        }
    }, [])

    useEffect(() => {

        if(settings) {
            const now = moment();
            const end = moment(settings.endDate);
            setDuration(moment.duration(end.diff(now)))
        }

        if(wallet && wallet.address) {
            getClientProof(wallet.address).then(response => {
                setClientSettings(response)
            })
        }

        loadRemainingData()

    }, [settings])

    useEffect(() => {

        const totalRemaining = genesisRemaining + foundationRemaining + friendRemaining;

        setRemaining({
            ...remaining,
            totalRemaining: totalRemaining,
            totalSold: remaining.total - totalRemaining,
            soldPercent: (100 - (totalRemaining / remaining.total * 100)).toFixed(2)
        })

    }, [genesisRemaining, foundationRemaining, friendRemaining])

    const loadRemainingData = () => {
        getTierNumRemainingNFTs(Tiers.Genesis.Code).then(response => {
            setGenesisRemaining(parseInt(response))
        })

        getTierNumRemainingNFTs(Tiers.Friend.Code).then(response => {
            setFriendRemaining(parseInt(response))
        })

        getTierNumRemainingNFTs(Tiers.Foundation.Code).then(response => {
            setFoundationRemaining(parseInt(response))
        })
    }

    const openArtworkPage = (pageState = ArtworkPageState.ABOUT) => {
        initDialog({
            title: `Banksy`,
            description: 'Laugh now (2003)',
            titleClass: 'font-32',
            descriptionClass: 'font-16 font-black',
            dialogClass: 'artwork-page',
            content: <ArtworkPage item={item} pageState={pageState}/>
        })
    }

    const joinWaitList = () => {
        initDialog({
            title: strings.ourOfferings.joinWaitlist,
            content: <JoinWaiteList />
        })
    }
    const notifyMe = () => {
        initDialog({
            title: strings.notifyMe.title,
            content: <NotifyMe />
        })
    }

    const buyTokenPackages = () => {
        initDialog({
            description: `${remaining.totalSold} of ${remaining.total} Sold`,
            title: strings.ourOfferings.choosePackage,
            titleClass: 'font-16 line-h-22',
            descriptionClass: 'font-32 font-black line-h-40',
            dialogClass: 'artwork-page',
            contentClass: 'bg-black',
            content: <BuyTokenPackages/>
        })
    }

    const isStarted = (startDate, endDate) => {
        const date = new Date()
        return date >= startDate && date <= endDate
    }

    const notStartedJet = (startDate) => {

        if(!settings) {
            return true
        }

        return new Date() < startDate
    }

    const notConnectedOrAllocated = () => {
        if(!wallet.address) {
            return true
        }

        return !hasAllocation(clientSettings)
    }

    const hasAllocation = (clientSettings) => {
        if(!clientSettings || !clientSettings.allocation) {
            return false
        }

        const tier = getTierWithCode(parseInt(clientSettings.tiercode))
        if(!tier) {
            return false
        }

        const numberOfAllocations = clientSettings.allocation / tier.Rate

        return numberOfAllocations >= 1
    }

    const getTitle = () => {
        if((settings && settings.type === SalesType.PRE_SALE) || notConnectedOrAllocated()) {
            return strings.ourOfferings.preSaleInProgress
        }

        if(settings && settings.type === SalesType.ALLOWLIST) {
            return strings.ourOfferings.guaranteedAllowlist
        }

        if(settings && settings.type === SalesType.FIRST_COME) {

            if(clientSettings.tiercode === Tiers.Friend.Code) {
                return strings.ourOfferings.timeToPublicSaleEnd
            }
            else {
                return strings.ourOfferings.timeToAllowlistSaleEnd
            }

        }

        return ''
    }

    const canRedeem = () => {

        if(!clientSettings) {
            return false
        }

        return clientSettings?.message !== 'address not found'
    }

    return <>
        <Grid item xs={12} className='p-m-0-m'>
            <Box className={'box-green p-m-0-m'}>
                <div className="mt-0-m">
                    <Typography className={'font-16'}>{getTitle()}</Typography>
                    {
                        settings && settings.type !== SalesType.PRE_SALE &&
                        <Typography className={'date-duration-format'}>
                            {formatDuration(duration)}
                        </Typography>
                    }
                </div>
            </Box>
        </Grid>
        <Grid item xs={12} md={12} className='p-m-0-m'>
            <Box className={'box-grey-1 p-m-0-m'}>
                <div className="mt-0-m">
                    <Typography className={'font-16 light-font'}>{strings.ourOfferings.currentValue}</Typography>
                    <Typography className={'font-20 fw-500'}>$ {NumberToString(4000000, '$')}</Typography>
                </div>
            </Box>
        </Grid>
        {
            settings && settings.type !== SalesType.PRE_SALE &&
            <Grid item xs={12}>
                <Box className={'box-grey-1 p-m-0-m br-b-0-m'}>
                    <div className="mt-0-m">
                        <Typography className={'font-16 light-font'}>{strings.ourOfferings.nftsSold} <span
                            className={'font-12 float-right'}>{remaining.totalSold} of {remaining.total}</span></Typography>
                        <Slider className={'percentage-slider'} value={remaining.soldPercent} step={1} min={0} max={100}
                                disabled/>
                    </div>
                </Box>
            </Grid>
        }
        {
            notConnectedOrAllocated() &&
            <Grid item xs={12}>
                <Button variant={'outlined'} className={'full-size-button black-white-button btn-md w-100 font-20'} onClick={joinWaitList}>{strings.ourOfferings.joinWaitlist}</Button>
            </Grid>
        }

        {
            !notConnectedOrAllocated() &&
            <Grid item xs={12}>
                <Button disabled={!canRedeem()} variant={'outlined'}
                        className={'full-size-button black-white-button btn-md w-100 font-20'}
                        onClick={() => buyTokenPackages()}>{strings.ourOfferings.RedeemNFTs}</Button>
            </Grid>
        }
        <Grid item md={6} xs={5}>
            <Button variant={'outlined'} className={'full-size-button white-black-button btn-md bordered w-100 m-xs font-20'} onClick={() => openArtworkPage()}>{strings.ourOfferings.findOutMore}</Button>
        </Grid>
        {
            notConnectedOrAllocated() &&
            <Grid item md={6} xs={5}>
                <Button variant={'outlined'} className={'full-size-button white-black-button btn-md bordered w-100 m-xs font-20'} onClick={notifyMe}>{strings.ourOfferings.notifyMe}</Button>
            </Grid>
        }
        {
            !notConnectedOrAllocated() &&
            <Grid item md={6} xs={5}>
                <Button variant={'outlined'}
                        className={'full-size-button white-black-button btn-md bordered w-100 m-xs font-20'}
                        onClick={() => openArtworkPage(ArtworkPageState.MEMBERSHIP)}>{strings.ourOfferings.membershipTiers}</Button>
            </Grid>
        }
    </>
}

export default OurOfferingSale;