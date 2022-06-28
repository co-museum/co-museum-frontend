import {Divider} from "@mui/material";


const SuccessfulPurchase = () => {
    return <>
        <Divider className={'divider mx-m'}/>
        <p className={'font-16 font-black-2'}>
            You have successfully purchased 400 $BKLN tokens with 400 USDC.
        </p>
    </>
}

export default SuccessfulPurchase;