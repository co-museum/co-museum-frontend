import {Button, Divider, Grid, TextField} from "@mui/material";
import strings from "../../localization";


const JoinWaiteList = () => {
    return <>
        <Divider className={'divider'}/>
        <p className={'font-16 font-black'}>
            You will be transfered out of this app to <span className="font-grey">premint.xyz</span> where you will undergo the whitelisting process for this offering.
        </p>
        <Divider className={'divider'}/>
        <Button className={'black-white-button w-100 mt-1'} href='https://premint.xyz' target={'_blank'}>
            I Understand, Take Me There
        </Button>

    </>
}

export default JoinWaiteList;