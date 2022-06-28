import {Button, Divider} from "@mui/material";
import strings from "../../localization";
import {NumberToString} from "../../StringUtils";


const Release = ({price =0}) => {
    return <>
        <Divider className={'divider'}/>
        <p className={'font-12 text-center'}>
            {strings.common.importantNote}:
            <br/>
            <span className={'font-12 font-grey text-center'}>{strings.release.description}</span>
        </p>
        <div className={'d-flex center-flex'}>
            <Button className={'black-white-button w-50 mr-1'}>{strings.release.btn} <span className={'font-grey'}> = {NumberToString(price)} $BKLN</span></Button>
            <Button className={'white-black-button bordered w-30'}>{strings.common.close}</Button>
        </div>
    </>
}

export default Release;