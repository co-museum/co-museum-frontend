import {Box, Button, Divider, Typography} from "@mui/material";
import { useState } from "react";
import strings from "../../../localization";
import QuestionMark from "../../dialogs/QuestionMark";


const MyCollectionZeroState = () => {
    const [usdActiveHeader, setUsdActiveHeader] = useState(true);

    return (<>
        <div className={'my-collection-info d-flex center-flex'}>
            <Box className={'box-green mr-1 p-m-0-m h-auto-m'}>
                <div>
                    <Button className={'green-button bordered p-0 float-right m-xxs font-12-m'} onClick={() => setUsdActiveHeader(v => !v)}>
                            <img src="/images/switch.svg" className={'image-10x10'}/>
                            {usdActiveHeader? 'USD': 'ETH'}
                    </Button>
                    <Typography className={'font-black-2 font-16 p-m-0-m'}>{strings.myCollection.totalValue} <QuestionMark/></Typography>
                    <Typography className={'font-black-2 font-20 p-m-0-m'}>_</Typography>
                </div>
            </Box>
            <Box className={'box-white mr-1 p-m-0-m h-auto-m'}>
                <div>
                    <Typography className={'font-black-2 font-16 p-m-0-m'}>{strings.myCollection.membershipTier}</Typography>
                    <Typography className={'font-20 p-m-0-m'}>_</Typography>
                </div>
            </Box>
            <Box className={'box-white mr-1 p-m-0-m h-auto-m'}>
                <div>
                    <Typography className={'font-black-2 font-16 p-m-0-m'}>{strings.myCollection.coOwnerSince}</Typography>
                    <Typography className={'font-20 p-m-0-m'}>
                        <img src="/images/grey-point.svg" className={'image-15x15 mr-5px'}/>
                        <span>-</span>
                    </Typography>
                </div>
            </Box>
            <Box className={'box-white p-m-0-m h-auto-m'}>
                <div>
                    <Typography className={'font-black-2 font-16 p-m-0-m'}>{strings.myCollection.numberOfNFT}</Typography>
                    <Typography className={'font-20 p-m-0-m'}>_</Typography>
                </div>
            </Box>
        </div>
        <div className="membership-tiers zero-state h-auto-m">
            <Box className={'box-grey-1 mt-2 w-90 d-flex content-center'}>
                <Box className={'box-white zero-state-content'} sx={{ boxShadow: 6 }}>
                    <div className='zero-state-content-wrapper'>
                        <p className={'font-24 text-center title'}>{strings.myCollection.emptyCollection}</p>
                        <p className={'font-16 font-grey'}>{strings.myCollection.startCollecting}</p>
                        <Divider className={'mt-1'}/>
                        <Button className={'black-white-button'} href={'/our-offerings'}>{strings.myCollection.viewOurOfferings}</Button>
                    </div>
                </Box>
            </Box>
        </div>
    </>)
}

export default MyCollectionZeroState;