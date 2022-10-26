import {Button, ButtonGroup, Divider, Grid, LinearProgress} from "@mui/material";
import {useContext, useEffect, useRef, useState} from "react";
import DialogContext from "../../context/DialogContext";
import strings from "../../localization";
import ShareDialog from "./ShareDialog";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import dynamic from "next/dynamic";
import {getClientProof} from "../../../services/base/SettingsService";
import {getTierWithCode} from "../../constants/Tiers";
import {buyNFTs, getFloorPrice, getMembershipContract} from "../../../services/crowdsale/AllowanceCrowdsale";
import {ethers} from "ethers";
import {useSelector} from "react-redux";
import {getRate} from "../../../services/rateService/RateService";
import {AddressUSDC, AddressZero} from "../../constants/Addresses";

const OwlCarousel = dynamic(import("react-owl-carousel"), {ssr: false});


const previewTypes = {
    NFTS: 1,
    TOKENS: 2
}
const BuyTokenPackages = () => {

    const wallet = useSelector((state) => state.wallet)
    const [quantity, setQuantity] = useState(1);
    const [maxQuantity, setMaxQuantity] = useState(1);
    const [price, setPrice] = useState(400);
    const {initDialog} = useContext(DialogContext);

    const [nftPrice, setNftPrice] = useState(0);
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState(0);
    const [loadingValue, setLoadingValue] = useState(0);

    const [clientSettings, setClientSettings] = useState(null)
    const [tierName, setTierName] = useState('')
    const [tier, setTier] = useState('')
    const [currencies, setCurrencies] = useState(null)
    const [ethRate, setEthRate] = useState(0)
    const [swapConfirmed, setSwapConfirmed] = useState(false);

    useEffect(() => {

        getRate().then(response => {
            setEthRate(response.USD)
        })

        getClientProof(wallet.address).then(async response => {
            setClientSettings(response)
            const tier = getTierWithCode(response.tiercode)
            setTier(tier)
            setMaxQuantity(response.allocation / (tier ? tier.Rate : 1))
            const membershipContract = await getMembershipContract();
            const floorPrice = await getFloorPrice(membershipContract);

            const tempCurrencies = [
                {name: 'USDC', price: floorPrice},
                {name: 'USDT', price: floorPrice},
                {name: 'ETH', price: floorPrice}
            ];

            setCurrencies(tempCurrencies)
            setNftPrice(tempCurrencies[2])
        })
    }, [])


    useEffect(() => {
        if (loading) {
            const interval = setInterval(() => {
                setLoadingValue(oldValue => oldValue + 20)
            }, 1000);
            setTimeout(() => {
                clearInterval(interval);
                setLoading(false);
                setLoadingValue(0);
            }, 6000);
        }
    }, [loading])

    const changePreview = async (value = 0) => {
        setLoading(true);
        setPreview(value);
        setSwapConfirmed(fasle)

        let stabecoinAddress = AddressZero;

        if (nftPrice.name === 'USDC') {
            stabecoinAddress = AddressUSDC;
        }

        if (nftPrice.name === 'USDT') {
            stabecoinAddress = AddressUSDT;
        }

        buyNFTs(tier.Rate + '', quantity,
            clientSettings.whitelistIdx, clientSettings.proof, nftPrice.name === 'ETH', stabecoinAddress).then(response => {
        })
    }


    const onShare = () => {
        initDialog({
            title: strings.ourOfferings.share,
            contentClass: 'social-networks',
            content: <ShareDialog link={'https://google.rs/random-link/random-link/random-link'}/>
        })
    }

    return <>
        <Divider className={'divider-menu'}/>
        <Grid container justifyContent={'center'} className={'artwork-page-navigation'}>
            <OwlCarousel className='owl-theme' dots={false} autoplayTimeout={2000} autoplaySpeed={2000} autoWidth={true}
                         autoplay={true} loop={true}>
                <div className='item'>
                    <h4>You Have Been Allowlisted<span className='dot'/>Redeem NFTs<span className='dot'/></h4>
                </div>
                <div className='item'>
                    <h4>You Have Been Allowlisted<span className='dot'/>Redeem NFTs<span className='dot'/></h4>
                </div>
                <div className='item'>
                    <h4>You Have Been Allowlisted<span className='dot'/>Redeem NFTs<span className='dot'/></h4>
                </div>
                <div className='item'>
                    <h4>You Have Been Allowlisted<span className='dot'/>Redeem NFTs<span className='dot'/></h4>
                </div>
                <div className='item'>
                    <h4>You Have Been Allowlisted<span className='dot'/>Redeem NFTs<span className='dot'/></h4>
                </div>
                <div className='item'>
                    <h4>You Have Been Allowlisted<span className='dot'/>Redeem NFTs<span className='dot'/></h4>
                </div>
                <div className='item'>
                    <h4>You Have Been Allowlisted<span className='dot'/>Redeem NFTs<span className='dot'/></h4>
                </div>
                <div className='item'>
                    <h4>You Have Been Allowlisted<span className='dot'/>Redeem NFTs<span className='dot'/></h4>
                </div>
                <div className='item'>
                    <h4>You Have Been Allowlisted<span className='dot'/>Redeem NFTs<span className='dot'/></h4>
                </div>
                <div className='item'>
                    <h4>You Have Been Allowlisted<span className='dot'/>Redeem NFTs<span className='dot'/></h4>
                </div>
                <div className='item'>
                    <h4>You Have Been Allowlisted<span className='dot'/>Redeem NFTs<span className='dot'/></h4>
                </div>
            </OwlCarousel>

        </Grid>
        <Divider className={'divider-menu'}/>

        <div
            className={`p-64-24 buy-token-packages-content ${loading ? 'loading-page' : ''}  ${preview && !loading ? 'preview-page' : ''}`}>
            <div className="loading">
                <p className="font-16 font-black text-center">Processing Transaction</p>
                <LinearProgress variant="determinate" value={loadingValue}/>
                <a href={'https://etherscan.io/address/' + web3?.address} target='_blank'
                   style={{textDecoration: 'none'}}>
                    <Button className={'font-12 font-black font-capitalize'}><img src="/images/view-grey.svg"
                                                                                  className={'image-12x12 mr-5px'}/>{strings.common.viewOnExplorer}
                    </Button>
                </a>
            </div>
            <div className="preview">
                <p className="text-center font-28">Laugh Now <span
                    className="font-grey-2 font-28">#4316</span> and <span
                    className="font-grey-2 font-28">#4317</span> redeemed.</p>
                <Grid container justifyContent={'center'} spacing={2}>
                    {preview === previewTypes.NFTS && <>
                        <Grid item xs={'auto'}>
                            <img src="/images/tier-3.png" className="item"/>
                        </Grid>
                        <Grid item xs={'auto'}>
                            <img src="/images/package-2.png" className="item"/>
                        </Grid>
                    </>}
                    {preview === previewTypes.TOKENS && <>
                        <Grid item xs={8} className='d-flex content-center'>
                            <img src="/images/token-packages-token.png" className="item circle"/>
                        </Grid>
                    </>}
                    <Grid item xs={6}>
                        <div className="d-flex content-center pb-64px">
                            <Button className={'black-white-button xs mr-1'}
                                    href='/my-collection'>{strings.myCollection.viewInMyCollection}</Button>
                            <Button className={'white-black-button xs bordered'} onClick={onShare}><img
                                src="/images/share.svg" className={'image-14x14'}/>{strings.ourOfferings.share}</Button>
                        </div>
                    </Grid>
                </Grid>
            </div>
            <Grid container justifyContent={'space-between'} columns={21}>
                <Grid item className="bg-white box buy-token-item" xs={21}>
                    <div className="br-b-1-black">
                        <Grid container justifyContent={'space-between'}>
                            <Grid item>
                                <p>{quantity} of {maxQuantity}</p>
                            </Grid>
                            <Grid item>
                                <p>NFTs</p>
                            </Grid>
                            <Grid item>
                                <p>{tier?.Name} Tier</p>
                            </Grid>
                        </Grid>
                    </div>
                    <div className="br-b-1-black d-flex content-center">
                        <img src="/images/token-packages-nfts.png" className="image-h-284"/>
                    </div>
                    <Grid container className="br-b-1-black" justifyContent={'space-between'}>
                        <Grid item>
                            <p>Quantity</p>
                            <ButtonGroup disableElevation className="btn-group-package">
                                <Button onClick={() => setQuantity(quantity - 1)} disabled={quantity - 1 === 0}> <img
                                    src="/images/minus.svg"/> </Button>
                                <Button className="btn-txt">{quantity}</Button>
                                <Button onClick={() => setQuantity(quantity + 1)} disabled={quantity + 1 > maxQuantity}>
                                    <img src="/images/plus.svg"/> </Button>
                            </ButtonGroup>
                        </Grid>
                        <Grid item>
                            <p>Payment Options</p>
                            <div className="btn-payment-options">
                                <Button className={`${nftPrice?.name === 'ETH' ? 'active' : ''}`}
                                        onClick={() => {
                                            setNftPrice(currencies[2]);
                                            setSwapConfirmed(false)
                                        }}>ETH</Button>
                                <Button className={`${nftPrice?.name === 'USDC' ? 'active' : ''}`}
                                        onClick={() => {
                                            setNftPrice(currencies[0]);
                                            setSwapConfirmed(false)
                                        }}>USD</Button>
                                <Button className={`${nftPrice?.name === 'USDT' ? 'active' : ''}`}
                                        onClick={() => {
                                            setNftPrice(currencies[1]);
                                            setSwapConfirmed(false)
                                        }}>USDT</Button>
                            </div>
                        </Grid>
                    </Grid>
                    <Grid container justifyContent={'space-between'}>
                        <Grid item>
                            <p>Estimated Price</p>
                        </Grid>
                        <Grid item>
                            {
                                nftPrice.name === 'ETH' &&
                                <p>~ {nftPrice.price} {nftPrice.name}</p>
                            }
                            {
                                nftPrice.name !== 'ETH' &&
                                <p>~ {(nftPrice.price * ethRate).toFixed(4)} {nftPrice.name}</p>
                            }
                        </Grid>
                        <Grid item xs={12}>

                            {
                                ((nftPrice.name === 'USDC' || nftPrice.name === 'USDT')) &&
                                <Button className="full-size-button black-white-button w-100 btn-md mb-1"
                                        onClick={() => setSwapConfirmed(true)}>{swapConfirmed ? 'Confirmed' : 'Confirm swap'}</Button>
                            }

                            <Button disabled={!(nftPrice.name === 'ETH' || swapConfirmed)} className="full-size-button black-white-button w-100 btn-md"
                                    onClick={() => changePreview(previewTypes.NFTS)}>Redeem</Button>

                        </Grid>
                    </Grid>

                </Grid>
            </Grid>
        </div>
    </>
}


export default BuyTokenPackages;