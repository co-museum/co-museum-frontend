import { Button, ButtonGroup, Divider, Grid, LinearProgress } from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import DialogContext from "../../context/DialogContext";
import strings from "../../localization";
import ShareDialog from "./ShareDialog";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import dynamic from "next/dynamic";
const OwlCarousel = dynamic(import("react-owl-carousel"), {ssr: false});

const currencies = [
    {name: 'USD', price: '$400'},
    {name: 'USDT', price: '$400'},
    {name: 'ETH', price: '0.385'},
]

const previewTypes = {
    NFTS: 1,
    TOKENS: 2
}
const BuyTokenPackages = () => {

    const [quantity, setQuantity] = useState(1);
    const [price, setPrice] = useState(400);
    const {initDialog} = useContext(DialogContext);

    const [nftPrice, setNftPrice] = useState(currencies[0]);
    const [tokenPrice, setTokenPrice] = useState(currencies[0]);
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState(0);
    const [loadingValue, setLoadingValue] = useState(0);


    useEffect(() => {
      if (loading) {
        const interval = setInterval(() => {
            setLoadingValue(oldValue => oldValue+20)
        }, 1000);
        setTimeout(() => {
            clearInterval(interval);
            setLoading(false);
            setLoadingValue(0);
        }, 6000);
      }
    }, [loading])

    const changePreview = (value = 0) => {
        setLoading(true);
        setPreview(value);
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
            <OwlCarousel className='owl-theme' dots={false} autoplayTimeout={2000} autoplaySpeed={2000} autoWidth={true} autoplay={true} loop={true}>
                <div className='item'>
                    <h4>You Have Been Allowlisted<span className='dot'/>Redeem NFTs or Tokens<span className='dot'/></h4>
                </div>
                <div className='item'>
                    <h4>You Have Been Allowlisted<span className='dot'/>Redeem NFTs or Tokens<span className='dot'/></h4>
                </div>
                <div className='item'>
                    <h4>You Have Been Allowlisted<span className='dot'/>Redeem NFTs or Tokens<span className='dot'/></h4>
                </div>
                <div className='item'>
                    <h4>You Have Been Allowlisted<span className='dot'/>Redeem NFTs or Tokens<span className='dot'/></h4>
                </div>
                <div className='item'>
                    <h4>You Have Been Allowlisted<span className='dot'/>Redeem NFTs or Tokens<span className='dot'/></h4>
                </div>
                <div className='item'>
                    <h4>You Have Been Allowlisted<span className='dot'/>Redeem NFTs or Tokens<span className='dot'/></h4>
                </div>
                <div className='item'>
                    <h4>You Have Been Allowlisted<span className='dot'/>Redeem NFTs or Tokens<span className='dot'/></h4>
                </div>
                <div className='item'>
                    <h4>You Have Been Allowlisted<span className='dot'/>Redeem NFTs or Tokens<span className='dot'/></h4>
                </div>
                <div className='item'>
                    <h4>You Have Been Allowlisted<span className='dot'/>Redeem NFTs or Tokens<span className='dot'/></h4>
                </div>
                <div className='item'>
                    <h4>You Have Been Allowlisted<span className='dot'/>Redeem NFTs or Tokens<span className='dot'/></h4>
                </div>
                <div className='item'>
                    <h4>You Have Been Allowlisted<span className='dot'/>Redeem NFTs or Tokens<span className='dot'/></h4>
                </div>
            </OwlCarousel>

        </Grid>
        <Divider className={'divider-menu'}/>

        <div className={`p-64-24 buy-token-packages-content ${loading? 'loading-page': ''}  ${preview && !loading? 'preview-page': ''}`}>
            <div className="loading">
                <p className="font-16 font-black text-center">Processing Transaction</p>
                <LinearProgress variant="determinate" value={loadingValue} />
            </div>
            <div className="preview">
                <p className="text-center font-28">Laugh Now <span className="font-grey-2 font-28">#4316</span> and <span className="font-grey-2 font-28">#4317</span> redeemed.</p>
                <Grid container justifyContent={'center'} spacing={2}>
                    {preview === previewTypes.NFTS && <>
                        <Grid item xs={'auto'}>
                            <img src="/images/tier-3.png" className="item"/>
                        </Grid>
                        <Grid item xs={'auto'}>
                            <img src="/images/package-2.png" className="item" />
                        </Grid>
                    </>}
                    {preview === previewTypes.TOKENS && <>
                        <Grid item xs={8} className='d-flex content-center'>
                            <img src="/images/token-packages-token.png" className="item circle"/>
                        </Grid>
                    </>}
                    <Grid item xs={6}>
                        <div className="d-flex content-center pb-64px">
                            <Button className={'black-white-button xs mr-1'} href='/my-collection'>{strings.myCollection.viewInMyCollection}</Button>
                            <Button className={'white-black-button xs bordered'} onClick={onShare}><img src="/images/share.svg" className={'image-14x14'}/>{strings.ourOfferings.share}</Button>
                        </div>
                    </Grid>       
                </Grid>
            </div>
            <Grid container justifyContent={'space-between'} columns={21}>
                <Grid item className="bg-white box buy-token-item" xs={10}>
                    <div className="br-b-1-black">
                    <Grid container justifyContent={'space-between'}>
                        <Grid item>
                            <p>1 of 2</p>
                        </Grid>
                        <Grid item>
                            <p>NFTs</p>
                        </Grid>
                        <Grid item>
                            <p>Member Tier</p>
                        </Grid>
                    </Grid>
                    </div>
                    <div className="br-b-1-black d-flex content-center">
                        <img src="/images/token-packages-nfts.png" className="image-h-284" />
                    </div>
                    <Grid container className="br-b-1-black" justifyContent={'space-between'}>
                        <Grid item>
                            <p>Quantity</p>
                            <ButtonGroup disableElevation className="btn-group-package">
                                <Button onClick={() => setQuantity(1)} disabled={quantity === 1}> <img src="/images/minus.svg"/> </Button>
                                <Button className="btn-txt">{quantity}</Button>
                                <Button onClick={() => setQuantity(2)} disabled={quantity === 2}> <img src="/images/plus.svg"/> </Button>
                            </ButtonGroup>
                        </Grid>
                        <Grid item>
                            <p>Payment Options</p>
                            <div className="btn-payment-options">
                                <Button className={`${nftPrice.name === 'USD'? 'active':''}`} onClick={() => setNftPrice(currencies[0])}>USD</Button>
                                <Button className={`${nftPrice.name === 'USDT'? 'active':''}`} onClick={() => setNftPrice(currencies[1])}>USDT</Button>
                                <Button className={`${nftPrice.name === 'ETH'? 'active':''}`} onClick={() => setNftPrice(currencies[2])}>ETH</Button>
                            </div>
                        </Grid>
                    </Grid>
                    <Grid container justifyContent={'space-between'}>
                        <Grid item>
                            <p>Estimated Price</p>
                        </Grid>
                        <Grid item>
                            <p>~ {nftPrice.price} {nftPrice.name}</p>
                        </Grid>
                        <Grid item xs={12}>
                            <Button className="full-size-button black-white-button w-100 btn-md" onClick={() => changePreview(previewTypes.NFTS)}>Redeem NFTs</Button>
                        </Grid>
                    </Grid>

                </Grid>
                <Grid item className="bg-white box buy-token-item" xs={10}>
                    <div className="br-b-1-black">
                        <Grid container justifyContent={'space-between'}>
                            <Grid item>
                                <p>400 of 800</p>
                            </Grid>
                            <Grid item>
                                <p>Tokens</p>
                            </Grid>
                            <Grid item>
                                <p><img src="/images/blkn.svg"/></p>
                            </Grid>
                        </Grid>
                    </div>
                    <div className="br-b-1-black d-flex content-center">
                        <img src="/images/token-packages-token.png" className="image-h-284" />
                    </div>
                    <Grid container className="br-b-1-black" justifyContent={'space-between'}>
                        <Grid item>
                            <p>Quantity</p>
                            <ButtonGroup disableElevation className="btn-group-package">
                                <Button onClick={() => setPrice(400)} disabled={price === 400}> <img src="/images/minus.svg"/> </Button>
                                <Button className="btn-txt">{price}</Button>
                                <Button onClick={() => setPrice(800)} disabled={price === 800}> <img src="/images/plus.svg"/> </Button>
                            </ButtonGroup>
                        </Grid>
                        <Grid item>
                            <p>Payment Options</p>
                            <div className="btn-payment-options">
                                <Button className={`${tokenPrice.name === 'USD'? 'active':''}`} onClick={() => setTokenPrice(currencies[0])}>USD</Button>
                                <Button className={`${tokenPrice.name === 'USDT'? 'active':''}`} onClick={() => setTokenPrice(currencies[1])}>USDT</Button>
                                <Button className={`${tokenPrice.name === 'ETH'? 'active':''}`} onClick={() => setTokenPrice(currencies[2])}>ETH</Button>
                            </div>
                        </Grid>
                    </Grid>
                    <Grid container justifyContent={'space-between'}>
                        <Grid item>
                            <p>Estimated Price</p>
                        </Grid>
                        <Grid item>
                            <p>~ {tokenPrice.price} {tokenPrice.name}</p>
                        </Grid>
                        <Grid item xs={12}>
                            <Button className="full-size-button black-white-button w-100 btn-md" onClick={() => changePreview(previewTypes.TOKENS)}>Buy Tokens</Button>
                        </Grid>
                    </Grid>


                </Grid>
            </Grid>
        </div>
    </>
}


export default BuyTokenPackages;