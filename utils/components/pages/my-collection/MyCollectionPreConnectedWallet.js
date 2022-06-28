import {Box} from "@mui/material";
import {NoWalletConnected} from "../../dialogs/NoWalletConnected";
import strings from "../../../localization";


const MyCollectionPreConnectedWallet = () => {

    return (<>
        <div className={'my-collection-info d-flex center-flex hide-m'}>
            <Box className={'box-white mr-1 p-m-0-m'}>
                <div>
                </div>
            </Box>
            <Box className={'box-white mr-1 p-m-0-m'}>
                <div></div>
            </Box>
            <Box className={'box-white mr-1 p-m-0-m'}>
                <div></div>
            </Box>
            <Box className={'box-white p-m-0-m'}>
                <div></div>
            </Box>
        </div>
        <div className="membership-tiers p-m-0-m">
            <Box className={'box-grey-1 mt-2 mb-2 w-90 account-connect w-100-m'}>
                <div className={'d-flex content-center mt-2'}>
                    <Box className={'box-white p-30px'} style={{width: '500px'}}>
                        <p className={'font-24 m-0'}>{strings.header.noWalletConnected}</p>
                        <p className={'font-16 font-grey m-0'}>{strings.header.noWalletConnectedDescription}</p>
                        <NoWalletConnected/>
                    </Box>
                </div>
            </Box>
        </div>
    </>)
}

export default MyCollectionPreConnectedWallet;