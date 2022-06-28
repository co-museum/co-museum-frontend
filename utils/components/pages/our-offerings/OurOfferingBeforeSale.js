import {Box, Button, Grid, Typography} from "@mui/material";
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


const OurOfferingBeforeSale = ({item}) => {
    let now = moment(); //todays date
    let end = moment(item.startDate); // another date
    const [duration, setDuration] = useState(moment.duration(end.diff(now)));
    const {initDialog} = useContext(DialogContext);

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
    return <>
        <Grid item xs={12} className='p-m-0-m'>
            <Box className={'box-green p-m-0-m'}>
                <div className="mt-0-m">
                    <Typography className={'font-16'}>{strings.ourOfferings.timeToSaleStart} <QuestionMark/> </Typography>
                    <Typography className={'date-duration-format'}>
                        {formatDuration(duration)}
                    </Typography>
                </div>
            </Box>
        </Grid>
        <Grid item xs={12} md={6} className='p-m-0-m'>
            <Box className={'box-grey-1 p-m-0-m'}>
                <div className="mt-0-m">
                    <Typography className={'font-16'}>{strings.ourOfferings.currentValue} <QuestionMark/></Typography>
                    <Typography className={'font-20'}>{item.currency} {NumberToString(item.value, item.currency)}</Typography>
                </div>
            </Box>
        </Grid>
        <Grid item xs={12} md={6} className='p-m-0-m'>
            <Box className={'box-grey-1 token-price p-m-0-m br-b-1-m'}>
                <div className="mt-0-m">
                    <Typography className={'font-16'}>{strings.ourOfferings.tokenPrice} <QuestionMark/></Typography>
                    <Typography className={'font-20'}>{item.currency} {item.tokenPrice}</Typography>
                </div>
            </Box>
        </Grid>
        <Grid item xs={12}>
            <Button variant={'outlined'} className={'full-size-button black-white-button btn-md w-100 font-20'} onClick={joinWaitList}>{strings.ourOfferings.joinWaitlist}</Button>
        </Grid>
        <Grid item md={6} xs={5}>
            <Button variant={'outlined'} className={'full-size-button white-black-button btn-md bordered w-100 m-xs font-20'} onClick={() => openArtworkPage()}>{strings.ourOfferings.findOutMore}</Button>
        </Grid>
        <Grid item md={6} xs={5}>
            <Button variant={'outlined'} className={'full-size-button white-black-button btn-md bordered w-100 m-xs font-20'} onClick={notifyMe}>{strings.ourOfferings.notifyMe}</Button>
        </Grid>
    </>
}

export default OurOfferingBeforeSale;