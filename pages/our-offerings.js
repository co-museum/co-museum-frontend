import {Button, Grid, IconButton, Typography} from "@mui/material";
import strings from "../utils/localization";
import {useContext, useEffect, useState} from "react";
import DialogContext from "../utils/context/DialogContext";
import ShareDialog from "../utils/components/dialogs/ShareDialog";
import ImageDialogContext from "../utils/context/ImageDialogContext";
import dynamic from "next/dynamic";

const OwlCarousel = dynamic(import("react-owl-carousel"), {ssr: false});
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import OurOfferingPreSaleInProgressConnected
    from "../utils/components/pages/our-offerings/OurOfferingPreSaleInProgressConnected";
import OurOfferingFriendsAllowlistSale from "../utils/components/pages/our-offerings/OurOfferingFriendsAllowlistSale";
import OurOfferingFriendsFirstComeFirstServe
    from "../utils/components/pages/our-offerings/OurOfferingFriendsFirstComeFirstServe";
import {getClientProof, getSaleSettings} from "../services/base/SettingsService";
import {useWeb3} from "@3rdweb/hooks";
import OurOfferingPreSaleInProgress from "../utils/components/pages/our-offerings/OurOfferingPreSaleInProgress";
import OurOfferingFoundationFirstComeFirstServe
    from "../utils/components/pages/our-offerings/OurOfferingFriendsFirstComeFirstServe";
import OurOfferingAfterSale from "../utils/components/pages/our-offerings/OurOfferingAfterSale";
import {getTierNumRemainingNFTs} from "../services/nfts/ERC721MembershipUpgradeable";
import Tiers, {getTierWithCode} from "../utils/constants/Tiers";
import {
    ethRate,
    getFloorPrice,
    getMembershipContract,
    getTokenContract
} from "../services/crowdsale/AllowanceCrowdsale";
import {ethers} from "ethers";
import {getCurrentWalletConnected} from "../services/base/WalletService";
import {useSelector} from "react-redux";
import OurOfferingSale from "../utils/components/pages/our-offerings/OurOfferingSale";


const OurOfferings = () => {
    const wallet = useSelector((state) => state.wallet)

    const [settings, setSettings] = useState(null)

    const [data, setData] = useState({
        totalRemaining: 0,
        totalSold: 0,
        total: 5738,
        soldPercent: 0,
        owner: 'Banksy',
        title: 'Laugh now',
        year: 2003,
        startDate: null,
        endDate: null,
        currency: '$',
        value: 4000000,
        tokenPrice: 1,
        percentageOfTokensSold: 80.6,
        estPrice: 400,
        estCurrency: 'USD',
        percent: '180',
        percentOf: '200'
    })

    const images = Array(4).fill('/images/preview-image.png');

    const {initDialog} = useContext(DialogContext);
    const {showImage} = useContext(ImageDialogContext);

    const [genesisRemaining, setGenesisRemaining] = useState(0)
    const [foundationRemaining, setFoundationRemaining] = useState(0)
    const [friendRemaining, setFriendRemaining] = useState(0)
    const [clientSettings, setClientSettings] = useState(null)

    const canRedeem = clientSettings?.message !== 'address not found';

    useEffect(async () => {

        loadRemainingData()

        const loadedSettings = await getSaleSettings()

        setSettings({
            ...loadedSettings,
            startDate: new Date(loadedSettings.startTimestamp * 1000),
            endDate: new Date(loadedSettings.endTimestamp * 1000)
        })

    }, [])

    useEffect(() => {

        if(wallet.address) {
            getClientProof(wallet.address).then(response => {
                setClientSettings(response)
            })
        }
        else {
            setClientSettings(null)
        }

    }, [wallet.address])


    useEffect(() => {

        const totalRemaining = genesisRemaining + foundationRemaining + friendRemaining;

        setData({
            ...data,
            totalRemaining: totalRemaining,
            totalSold: data.total - totalRemaining,
            soldPercent: (100 - (totalRemaining / data.total * 100)).toFixed(2)
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


    const isStarted = (startDate, endDate) => {

        const date = new Date()

        return date >= startDate && date <= endDate
    }

    const isFinished = (endDate) => {
        return endDate < new Date()
    }

    const notStartedJet = (startDate) => {
        return new Date() < startDate
    }

    const onShare = () => {
        initDialog({
            title: strings.ourOfferings.share,
            contentClass: 'social-networks',
            content: <ShareDialog link={'https://google.rs/random-link/random-link/random-link'}/>
        })
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

    return <div className={'page-container our-offerings'}>
        <Grid container className='offering-container'>
            <Grid item md={6} xs={'auto'} className='show-m items-start-m'>
                <Typography className='font-16'>{data?.title} ({data?.year})</Typography>
                <Typography className="font-28">{data?.owner}</Typography>
            </Grid>
            <Grid item md={6} xs={'auto'} className='show-m'>
                <Button variant={'outlined'} className={'white-black-button bordered xs m-xs'} onClick={onShare}>
                    <img src="/images/share.svg" className={'image-14x14'}/>
                    <span>{strings.ourOfferings.share}</span>
                </Button>
            </Grid>

            <Grid item xs={12} md={6}>
                <div className={'float-right mr-1 mt-1'}>
                    <IconButton onClick={() => showImage({images})} className='m-0 p-0'>
                        <img src="/images/zoom-in.svg" className={'image-24x24 image-14x14-m mt-16-m mr-16-m'}/>
                    </IconButton>
                </div>
                <div className={'offering-image'}>
                    <OwlCarousel className='owl-theme white-nav' items={1} loop>
                        {images.map(i => <div className='item'>
                                <img src={i} className={'image-container'} loading={"lazy"}/>
                            </div>
                        )}
                    </OwlCarousel>
                </div>
            </Grid>
            <Grid item md={6} xs={12} container alignItems={'center'} justifyContent={'center'}
                  className='offering-container-form'>
                <Grid item container xs={10} spacing={2} justifyContent={'space-between'} className='basics-w-100-m'>
                    <Grid item xs={9} className='hide-m'>
                        <Typography>{data?.title} ({data?.year})</Typography>
                        <Typography variant={'h4'}>{data?.owner}</Typography>
                    </Grid>
                    <Grid item xs={3} className='hide-m' style={{textAlign: "right"}}>
                        <Button variant={'outlined'} className={'white-black-button bordered xs'} onClick={onShare}>
                            <img src="/images/share.svg" className={'image-14x14'}/>
                            <span className={'font-16 light-font'}>{strings.ourOfferings.share}</span>
                        </Button>
                    </Grid>

                    {
                        settings && !isFinished(settings.endDate) &&
                        <OurOfferingSale canRedeem={canRedeem} item={data} settings={settings}/>
                    }

                    {
                        settings && isFinished(settings.endDate) &&
                        <OurOfferingAfterSale item={data}/>
                    }
                </Grid>

            </Grid>
        </Grid>
    </div>
}

export default OurOfferings;
