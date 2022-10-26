import {
    Avatar,
    Box,
    Button,
    Divider,
    Grid, Grow,
    IconButton,
    ImageList,
    ImageListItem,
    ImageListItemBar,
    Typography
} from "@mui/material";
import strings from "../../../localization";
import QuestionMark from "../../dialogs/QuestionMark";
import moment from "moment";
import {QuestionMarkType} from "../../../constants/QuestionMarkType";
import {Close} from "@mui/icons-material";
import {useContext, useEffect, useState} from "react";
import ShareDialog from "../../dialogs/ShareDialog";
import {ArtworkPageState} from "../../../constants/ArtworkPageState";
import ArtworkPage from "../../dialogs/ArtworkPage";
import DialogContext from "../../../context/DialogContext";
import ImageDialogContext from "../../../context/ImageDialogContext";
import {NumberToString} from "../../../StringUtils";
import Release from "../../dialogs/Release";
import {getOpenSeaCollectionStats} from "../../../../services/opensea/OpenSeaService";
import {getRate} from "../../../../services/rateService/RateService";
import Tiers, {getTierWithCode} from "../../../constants/Tiers";

import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import dynamic from "next/dynamic";

const OwlCarousel = dynamic(import("react-owl-carousel"), {ssr: false});

const MyCollectionConnectedWallet = ({data,item, items, clientSettings, noNft = false, nfts = []}) => {
    const {initDialog} = useContext(DialogContext);
    const {showImage} = useContext(ImageDialogContext);


    const [activeItem, setActiveItem] = useState(null);
    const [usdActiveHeader, setUsdActiveHeader] = useState(true);
    const [usdActive, setUsdActive] = useState(false);
    const [collectionStats, setCollectionStats] = useState(null);
    const [ethRate, setEthRate] = useState(0)

    useEffect(() => {
        getOpenSeaCollectionStats(process.env.NEXT_PUBLIC_COLLECTION_SLUG).then(response => {

            if(!response) {
                return
            }

            setCollectionStats(response.stats)
        })

        getRate().then(response => {
            setEthRate(response.USD)
        })
    }, [])

    const onShare = () => {
        initDialog({
            title: strings.ourOfferings.share,
            contentClass: 'social-networks',
            content: <ShareDialog link={'https://google.rs/random-link/random-link/random-link'}/>
        })
    }


    const openArtworkPage = (pageState = ArtworkPageState.ABOUT) => {
        initDialog({
            title: item.owner,
            description: `${item?.title} (${item?.year})`,
            titleClass: 'font-20',
            descriptionClass: 'font-32 font-black',
            dialogClass: 'artwork-page',
            content: <ArtworkPage item={item} pageState={pageState}/>
        })
    }

    const openRelease = () => {
        initDialog({
            title: <div className={'text-center font-20'}>
                    Release {activeItem.title} <span className={'font-grey-3 font-20'}>#{activeItem.id}</span><br/> for 40,000 $BKLN?
            </div>,
            hideClose: true,
            titleBoxClass: 'release-title',
            descriptionClass: 'font-36 font-black',
            content: <Release/>
        })
    }

    const openItem = (item) => {
        setActiveItem(item);
    }


    const imageItems = () => {
        return <ImageList cols={1} className={'my-collection-items'}>
            {
                items.map(item => <ImageListItem className={'box-grey-1 image-item'}>
                    <img src={item.img} className={'image-container image-gr-bg c-pointer image-156x156-m'} loading={'lazy'} onClick={() => openItem(item)}/>
                    <ImageListItemBar
                        sx={{
                            background: 'transparent'
                        }}
                        onClick={(v) => openItem(item)}
                        className={'px-0 c-pointer'}
                        title={<>
                            <span className={'font-16 mr-1'}>{item.item}</span>
                            <span className={'font-16 font-grey'}>#{item.id}</span>
                            <div className={'float-right'}>
                                <img src="/images/circle-right.svg" className={'image-16x16'}/>
                            </div>
                        </>}
                        position="below"
                    />
                    <ImageListItemBar
                        sx={{
                            background: 'transparent',
                        }}
                        className={'items-top-form'}
                        title={<div className={'item-options'}>
                            <div className={'item-title c-pointer'} onClick={(v) => openItem(item)}>
                                <img src={'/images/grey-point.svg'} className={'image-12x12'} loading={'lazy'}/>
                                <div className={'font-12'}>{item.title}</div>
                            </div>
                            <div className={'float-right c-pointer'} onClick={onShare}>
                                <img src={'/images/share.svg'} className={'image-container image-12x12'} loading={'lazy'}/>
                            </div>
                        </div>}
                        position="top"
                    />
                </ImageListItem>)
            }
        </ImageList>

    }

    const getNFTImage = (tokenId) => {

        if(!tokenId) {
            return ''
        }

        return process.env.NEXT_PUBLIC_IPFS + '/' + tokenId + '.png'
    }

    const getNFTTitle = (tokenId) => {

        if(!tokenId) {
            return ''
        }

        const token = parseInt(tokenId);

        if(token <= 18) {
            return 'Friend'
        }

        if(token > 18 && token <= 238) {
            return 'Foundation'
        }

        if(token > 238) {
            return 'Genesis'
        }
    }

    const getNFTType = (tokenId) => {

        if(!tokenId) {
            return ''
        }

        const token = parseInt(tokenId);

        if(token <= 18) {
            return Tiers.Friend
        }

        if(token > 18 && token <= 238) {
            return Tiers.Foundation
        }

        if(token > 238) {
            return Tiers.Genesis
        }
    }

    const renderNFTs = () => {

        return <ImageList cols={1} className={'my-collection-items'}>
            {
                nfts.map(item => <ImageListItem className={'box-grey-1 image-item'}>
                    <img src={getNFTImage(item.tokenId)} className={'image-container image-gr-bg c-pointer image-156x156-m'} loading={'lazy'} onClick={() => openItem(item)}/>
                    <ImageListItemBar
                        sx={{
                            background: 'transparent'
                        }}
                        onClick={(v) => openItem(item)}
                        className={'px-0 c-pointer'}
                        title={<>
                            <span className={'font-16 mr-1'}>Laugh now</span>
                            <span className={'font-16 font-grey'}>#{item.tokenId}</span>
                            <div className={'float-right'}>
                                <img src="/images/circle-right.svg" className={'image-16x16'}/>
                            </div>
                        </>}
                        position="below"
                    />
                    <ImageListItemBar
                        sx={{
                            background: 'transparent',
                        }}
                        className={'items-top-form'}
                        title={<div className={'item-options'}>
                            <div className={'item-title c-pointer'} onClick={(v) => openItem(item)}>
                                <img src={'/images/grey-point.svg'} className={'image-12x12'} loading={'lazy'}/>
                                <div className={'font-12'}>{getNFTTitle(item.tokenId)}</div>
                            </div>
                            <div className={'float-right c-pointer'} onClick={onShare}>
                                <img src={'/images/share.svg'} className={'image-container image-12x12'} loading={'lazy'}/>
                            </div>
                        </div>}
                        position="top"
                    />
                </ImageListItem>
                )
            }
        </ImageList>
    }

    const renderMiniNFTWidget = (nfts) => {

        let result = [];

        for(let nft of nfts) {
            result.push(
                <img src={getNFTImage(nft.tokenId)}/>
            )
        }

        return <div className={'mini-nfts'}>
            <div className={'images-container'}>
                {result}
            </div>
            {nfts.length} x NFTs
        </div>
    }

    return (<>
        <div className={'my-collection-info d-flex center-flex'}>
            <Box className={'box-white mr-1 p-m-0-m h-auto-m'}>
                <div>
                    <Typography className={'font-black-2 font-16 p-m-0-m'}>{strings.myCollection.membershipTier}</Typography>
                    <Typography className={'font-20 p-m-0-m'}>
                        <img src="/images/grey-point.svg" className={'image-15x15 mr-5px'}/>
                        {
                            noNft && '-'
                        }
                        {
                            !noNft && <span>{getTierWithCode(clientSettings?.tiercode)?.Name}</span>
                        }
                    </Typography>
                </div>
            </Box>
            <Box className={'box-white mr-1 p-m-0-m h-auto-m'}>
                <div>
                    <Typography className={'font-black-2 font-16 p-m-0-m'}>{strings.myCollection.coOwnerSince}</Typography>
                    <Typography className={'font-20 p-m-0-m'}>{moment(data.date).format('DD MMMM YYYY')}</Typography>
                </div>
            </Box>
            <Box className={'box-white p-m-0-m h-auto-m'}>
                <div>
                    <Typography className={'font-black-2 font-16 p-m-0-m'}>{strings.myCollection.numberOfNFT}</Typography>
                    <Typography className={'font-20 p-m-0-m'}>
                        {
                            !noNft && renderMiniNFTWidget(nfts)
                        }
                        {
                            noNft && '_'
                        }
                    </Typography>
                </div>
            </Box>
        </div>
        <div className="membership-tiers p-m-0-m">
            <Typography className={'font-20 title w-90'}>{strings.myCollection.membershipTiers}</Typography>
            <Box className={'box-black-2 box-p-0 w-90 h-auto-m w-100-m'}>
                <div>
                    <Grid container>
                        <Grid item xs={3} className={'item-info-form'}>
                            <div className={'item-name br-b-1-grey-3'}>
                                <Typography className={'font-grey-1 font-16'}>{item?.owner}</Typography>
                                <Typography className={'font-grey-1 font-20'}>{item?.title} ({item?.year})</Typography>
                            </div>
                            <div className={'item-description'}>
                                <Typography className={'font-grey-1 font-16'}>{strings.myCollection.description}</Typography>
                                <Typography className={'font-grey font-16'}>{item?.description}</Typography>
                            </div>
                            <div className={'item-info'}>
                                <Box className={'box-green no-bottom-radius'}><div>
                                    <Typography className={'font-black-2 font-16'}>{strings.myCollection.totalTokensOwned} <QuestionMark title={"Total Tokens Owned"} description={"The number of unwrapped $BKLN tokens owned. $BKLN tokens wrapped in your membership NFTs are not included in this value."}/></Typography>
                                    <Typography className={'font-20'}>
                                        <span className={'mr-5px'}>{NumberToString(item.totalTokens)}</span>
                                        <span>
                                            <img src="/images/grey-point.svg" className={'image-15x15 mr-5px'}/>
                                            BLKN
                                        </span>
                                    </Typography>
                                </div></Box>
                                <Box className={'box-white no-radius'}><div>
                                    <Typography className={'font-black-2 font-16'}>
                                        {strings.myCollection.currentArtworkValue} <QuestionMark title={"Current artwork value"} description={"Effectively, $BKLN tokens market cap in USD. Total supply of $BKLN tokens multiplied by the current BKLN/USDC exchange rate in Co-Museum's primary liquidity pool."}/>
                                        <Button className={'white-black-button bordered p-0 float-right'} onClick={() => setUsdActive(v => !v)}>
                                            <img src="/images/switch.svg" className={'image-10x10'}/>
                                            {usdActive? 'USD': 'ETH'}
                                        </Button>
                                    </Typography>
                                    <Typography className={'font-20'}>
                                        {usdActive && <span>{item.currency} {NumberToString(collectionStats?.market_cap * ethRate)}</span>}
                                        {!usdActive && <span>{NumberToString(collectionStats?.market_cap)}</span>}
                                    </Typography>
                                </div></Box>
                            </div>
                        </Grid>
                        <Grid item xs={6} className={`br-x-1 image-item w-100-m-b ${activeItem? 'd-none':''}`}>
                            <OwlCarousel className='owl-theme white-nav' loop={true} items={1} nav={false}>
                                <div className='item'>
                                    <img src="/images/preview-image.png" className={'image-container'}/>
                                </div>
                                <div className='item'>
                                    <img src="/images/preview-image.png" className={'image-container'}/>
                                </div>
                                <div className='item'>
                                    <img src="/images/preview-image.png" className={'image-container'}/>
                                </div>
                                <div className='item'>
                                    <img src="/images/preview-image.png" className={'image-container'}/>
                                </div>
                            </OwlCarousel>
                            <div className={'image-options pb-14px flex-row-between'}>
                                <IconButton onClick={() => showImage({images: ['/images/preview-image.png']})}><img src={'/images/zoom-in.svg'} className={'image-24x24'}/></IconButton>
                                <Button className={'grey-button m-xxs'} onClick={() => openArtworkPage()}>{strings.ourOfferings.findOutMore}</Button>
                                <Button className={'black-white-button bordered m-xxs'} onClick={onShare}><img src="/images/share-light.svg" className={'image-14x14'} /> {strings.ourOfferings.share}</Button>
                            </div>
                        </Grid>
                        <Grid item xs={3} className={`w-100-m-b ${activeItem? 'd-none':''}`}>
                            <div className={'item-name br-b-1-grey-3'}>
                                <Typography className={'font-grey-1 font-20'}>
                                    {noNft && strings.myCollection.membership}
                                    {!noNft && strings.myCollection.myNFTs}
                                </Typography>
                            </div>
                            <div className={'my-nfts '+ (noNft && 'no-nfts')}>
                                {!noNft && renderNFTs()}
                                {noNft && <>
                                    <IconButton className={'become-a-member'} onClick={() => openArtworkPage(ArtworkPageState.MEMBERSHIP)}>
                                        <img src="/images/locked.svg" className={'image-45x45'}/>
                                        <div className={'mt-2 font-white font-16'}>
                                            Use tokens to unlock with additional membership perks and benefits.
                                        </div>
                                        <Button className={'white-black-button mt-2'}>Become a member</Button>
                                    </IconButton>
                                    {imageItems()}
                                </>}
                            </div>

                        </Grid>
                        <Grow in={activeItem}>
                            <Grid item xs={9} className={`br-l-1 ${activeItem? '':'d-none'}`}>
                                <div className={'opened-item'}>
                                    <div className="title">
                                        <div className="item-title">
                                            <img src="/images/grey-point.svg" className={'image-20x20'}/>
                                            <span className={'font-16 font-white'}>{getNFTTitle(activeItem?.tokenId)}</span>
                                            <QuestionMark type={QuestionMarkType.WHITE} btnClass={'p-0 mx-5px'}/>
                                        </div>
                                        <div className="right">
                                            <Button className={'black-white-button bordered share-btn hide-m xs'} onClick={onShare}>
                                                <span className={'font-16 font-white'}>{strings.ourOfferings.share}</span>
                                                <img src="/images/share-light.svg" className={'image-18x18'} />
                                            </Button>
                                            <IconButton onClick={() => setActiveItem(null)}
                                                        aria-label="close" className={'close-btn'}>
                                                <Close />
                                            </IconButton>
                                        </div>
                                    </div>
                                    <div className={'show-m'}>
                                        <Button className={'black-white-button bordered share-btn'} onClick={onShare}>
                                            <span className={'font-16'}>{strings.ourOfferings.share}</span>
                                            <img src="/images/share-light.svg" className={'image-18x18'} />
                                        </Button>
                                    </div>
                                    <Divider className={'divider'}/>
                                    <Grid container justifyContent={'center'} className={'avatar-container'}>
                                        <Grid item xs={'auto'}>
                                            <Avatar
                                                className={'avatar image-156x156-m'}
                                                src={getNFTImage(activeItem?.tokenId)}
                                                sx={{ width: 410, height: 410 }}
                                                variant="square"
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container alignItems={'end'} justifyContent={'space-between'}>
                                        <Grid item xs={'auto'}>
                                            <div className="membership-feature">
                                                <p className={'font-white font-13 membership-title'}>
                                                    Membership Features
                                                </p>
                                                <div className={'font-13 font-grey membership-content'}>
                                                    {
                                                        getNFTType(activeItem?.tokenId)?.Code === Tiers.Foundation.Code &&
                                                        <>
                                                            <p>Individual viewing rights + 1 guest</p>
                                                            <p>Access to Friend and Patron IRL events</p>
                                                            <p>Access to Patron collectibles and merch</p>
                                                        </>
                                                    }

                                                    {
                                                        getNFTType(activeItem?.tokenId)?.Code === Tiers.Friend.Code &&
                                                        <>
                                                            <p>Individual viewing rights</p>
                                                            <p>Access to Friend IRL events</p>
                                                            <p>Access to Friend collectibles and merch</p>
                                                        </>
                                                    }

                                                    {
                                                        getNFTType(activeItem?.tokenId)?.Code === Tiers.Genesis.Code &&
                                                        <>
                                                            <p>Individual viewing rights + 3 guests</p>
                                                            <p>Access to all events + exclusive VIP events</p>
                                                            <p>Access to Alpha collectibles and merch</p>
                                                        </>
                                                    }

                                                    <br/>
                                                    <Button className={'black-white-button bordered xs'} href={'/how-it-works#membership-tiers'}>
                                                        <span className={'font-13 font-white'}>{strings.common.learnMore}</span>
                                                    </Button>
                                                </div>
                                            </div>
                                        </Grid>
                                        <Grid item xs={'auto'} className='opened-actions'>
                                            <div className={'d-inline'}>
                                            <span className={'font-16 font-white'}>
                                                40000
                                            </span>
                                                <img src="/images/grey-point.svg" className={'image-15x15 mx-5px'}/>
                                                <span className={'font-16 font-white'}>
                                                BKLN ≈ $53,433.13
                                            </span>
                                            </div>
                                            <Button className={'black-white-button-disabled bordered action-btn xs'}>
                                                <span className={'font-16 font-white'} onClick={openRelease}>{strings.common.release}</span>
                                            </Button>
                                            <Button className={'white-black-button bordered action-btn xs'}>
                                                <span className={'font-16'}>{strings.myCollection.viewOnOpenSea}</span>
                                            </Button>

                                        </Grid>
                                    </Grid>

                                </div>
                            </Grid>
                        </Grow>

                    </Grid>
                </div>
            </Box>
        </div>
    </>)
}

export default MyCollectionConnectedWallet;