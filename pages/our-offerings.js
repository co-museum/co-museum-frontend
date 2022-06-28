import {Button, Grid, IconButton, Typography} from "@mui/material";
import strings from "../utils/localization";
import {useContext, useState} from "react";
import {OurOfferingsPageState, OurOfferingsPageStates} from "../utils/constants/our-offerings-page-state";
import OurOfferingBeforeSale from "../utils/components/pages/our-offerings/OurOfferingBeforeSale";
import OurOfferingDuringSale from "../utils/components/pages/our-offerings/OurOfferingDuringSale";
import OurOfferingAfterSale from "../utils/components/pages/our-offerings/OurOfferingAfterSale";
import DialogContext from "../utils/context/DialogContext";
import ShareDialog from "../utils/components/dialogs/ShareDialog";
import ImageDialogContext from "../utils/context/ImageDialogContext";

const OurOfferings = () => {

    const [pageState, setPageState] = useState(OurOfferingsPageState.BEFORE_SALE);

    const {initDialog} = useContext(DialogContext);
    const {showImage} = useContext(ImageDialogContext);

    const item = {
        owner: 'Banksy',
        title: 'Laugh now',
        year: 2003,

        startDate: new Date('2022-06-30 22:10'),
        endDate: new Date('2022-06-31 22:10'),
        currency: '$',
        value: 4000000,
        tokenPrice: 1,
        percentageOfTokensSold: 80.6,
        estPrice: 400,
        estCurrency: 'USD',
        percent: '3,261',
        percentOf: '4,077'
    }


    const onShare = () => {
        initDialog({
            title: strings.ourOfferings.share,
            contentClass: 'social-networks',
            content: <ShareDialog link={'https://google.rs/random-link/random-link/random-link'}/>
        })
    }

    return <div className={'page-container our-offerings'}>
        {
            OurOfferingsPageStates.map(state => <Button key={'state-'+state} onClick={() => setPageState(OurOfferingsPageState[state])}>{state}</Button>)
        }
        <Grid container className='offering-container'>
            <Grid item md={6} xs={'auto'} className='show-m items-start-m'>
                <Typography className='font-16'>{item?.title} ({item?.year})</Typography>
                <Typography className="font-28">{item?.owner}</Typography>
            </Grid>
            <Grid item md={6} xs={'auto'} className='show-m'>
                <Button variant={'outlined'} className={'white-black-button bordered xs m-xs'} onClick={onShare}>
                    <img src="/images/share.svg" className={'image-14x14'}/>
                    <span className={'font-16'}>{strings.ourOfferings.share}</span>
                </Button>
            </Grid>

            <Grid item xs={12} md={6}>
                <div className={'float-right mr-1 mt-1'}>
                    <IconButton onClick={() => showImage({url: '/images/preview-image.png'})} className='m-0 p-0'>
                        <img src="/images/zoom-in.svg" className={'image-24x24'}/>
                    </IconButton>
                </div>
                <div className={'offering-image'}>
                    <img src="/images/preview-image.png" className={'image-container'} loading={"lazy"}/>
                </div>
            </Grid>
            <Grid item md={6} xs={12} container alignItems={'center'} justifyContent={'center'}>
                <Grid item container xs={10} spacing={2} justifyContent={'space-between'} className='basics-w-100-m'>
                    <Grid item xs={9} className='hide-m'>
                        <Typography>{item?.title} ({item?.year})</Typography>
                        <Typography variant={'h4'}>{item?.owner}</Typography>
                    </Grid>
                    <Grid item xs={3} className='hide-m' style={{textAlign: "right"}}>
                        <Button variant={'outlined'} className={'white-black-button bordered xs'} onClick={onShare}>
                            <img src="/images/share.svg" className={'image-14x14'}/>
                            <span className={'font-16'}>{strings.ourOfferings.share}</span>
                        </Button>
                    </Grid>
                    {
                        pageState === OurOfferingsPageState.BEFORE_SALE && <OurOfferingBeforeSale item={item}/>
                    }
                    {
                        pageState === OurOfferingsPageState.DURING_SALE && <OurOfferingDuringSale item={item}/>
                    }
                    {
                        pageState === OurOfferingsPageState.AFTER_SALE && <OurOfferingAfterSale item={item}/>
                    }
                </Grid>

            </Grid>
        </Grid>
    </div>
}

export default OurOfferings;
