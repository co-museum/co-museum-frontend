import {Button, Divider, Grid, TextField} from "@mui/material";
import strings from "../../localization";


const NotifyMe = () => {
    return <>
        <Divider className={'divider'}/>
        <p className={'font-16 font-grey'}>{strings.notifyMe.message}</p>
        <Divider className={'divider'}/>
        <Grid container alignItems={'center'} spacing={2}>
            <Grid item xs={10}>
                <TextField className={'standard-input w-100 xs'} placeholder={strings.common.yourEmailAddress}/>
            </Grid>
            <Grid item xs={2}>
                <Button className={'black-white-button'}>{strings.notifyMe.button}</Button>
            </Grid>
        </Grid>
        <a className={'font-13 font-grey text-d-none'} href={'https://metamask.io/faqs/'} target={'_blank'}>{strings.notifyMe.info}</a>
    </>
}

export default NotifyMe;