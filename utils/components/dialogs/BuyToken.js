import {Divider} from "@mui/material";


const BuyToken = () => {
    return <>
        <Divider className={'divider mx-m'}/>
        <p className={'font-16 font-black-2'}>
            You have selected USD as your preferred payment currency. Tokens purchased in USD will be authorised via the Circle platform. Click ‘Continue’ to be transferred to Circle to complete the purchase of your tokens. Alternatively, click ‘Change Currency’ to purchase tokens directly via USDC or USDT.
        </p>
        <Divider className={'divider mx-m'}/>
    </>
}

export default BuyToken;