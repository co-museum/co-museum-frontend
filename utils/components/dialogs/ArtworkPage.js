import {
    Button,
    Chip,
    Divider,
    Grid,
    LinearProgress,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tabs
} from "@mui/material";
import {useContext, useEffect, useState} from "react";
import {ArtworkPageState} from "../../constants/ArtworkPageState";
import strings from "../../localization";
import {characters} from "../../constants/characters";
import {MembershipState, MembershipStates} from "../../constants/membership-state";
import DialogContext from "../../context/DialogContext";
import ShareDialog from "./ShareDialog";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import dynamic from "next/dynamic";
import {useSelector} from "react-redux";

const OwlCarousel = dynamic(import("react-owl-carousel"), {ssr: false});

const ArtworkPage = ({item, pageState = ArtworkPageState.ABOUT}) => {

    const [activeTab, setActiveTab] = useState(pageState);
    const [pageStateMembership, setPageStateMembership] = useState(MembershipState.PRE_SALE);
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState(false);
    const [loadingValue, setLoadingValue] = useState(0);
    const {initDialog, close} = useContext(DialogContext);
    const wallet = useSelector((state) => state.wallet)

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

    const goToPreview = (value = false) => {
        setLoading(value);
        setPreview(value);
    }

    const onShare = () => {
        initDialog({
            title: strings.ourOfferings.share,
            contentClass: 'social-networks',
            content: <ShareDialog link={'https://google.rs/random-link/random-link/random-link'}/>
        })
    }

    const [redeemItemId, setRedeemItemId] = useState(0);
    const items = [
        {
            id: 1,
            price: 450,
            title: 'Member',
            image: '/images/tier-1.png',
            features: ['Access to freeport +1 guest', 'Access to IRL events', 'Access to collectibles + merch']
        },
        {
            id: 2,
            price: 4500,
            image: '/images/tier-2.png',
            title: 'Foundation Member',
            features: ['1 to 1 token allocation for next drop', 'Access to our exhibit on preview day']
        },
        {
            id: 3,
            price: 45000,
            image: '/images/tier-3.png',
            title: 'Genesis Member',
            features: ['Access to Genesis Membership group', 'Access to galleries and artists', '1 to 1 token allocation for next 3 drops']
        }
    ]

    const rows = [
        {name: strings.artwork.tokenType, value: 'ERC-20'},
        {name: strings.artwork.totalTokenSupply, value: '500000000 BKLN'},
        {name: strings.artwork.privateSaleAllocation, value: '4332285 BKLN'},
        {name: strings.artwork.privateSaleTokenPrice, value: '1usdc / BKLN'},
        {name: strings.artwork.privateSaleAmountRaised, value: '3100000 USD'},
        {name: strings.artwork.binanceLaunchpadSaleAllocation, value: '25000000 LIKA'},
        {name: strings.artwork.binanceLaunchpadSalePrice, value: '0.16 USD / LOKA'},
        {name: strings.artwork.binanceLaunchpadAmountToBeRaised, value: '4000000 USD'},
        {name: strings.artwork.initialBinance, value: '50708974 LOKA'},
    ]

    const groups = [
        {name: 'Team', value: '10'},
        {name: 'Investors', value: '10'},
        {name: 'Private sale / Partnerships', value: '10'},
        {name: 'Community', value: '70'},
    ]
    return <>
        <Divider className={'divider-menu'}/>
        <Grid container justifyContent={'center'} className={'artwork-page-navigation'}>
            <Grid item xs={'auto'}>
                <Tabs value={activeTab}
                      TabIndicatorProps={{
                          style: {
                              display: "none",
                          },
                      }}
                      className={'artwork-page-states'}
                      onChange={(e, tab) => setActiveTab(tab)}
                >
                    <Tab label={`${strings.artwork.about} ${characters.to}`}/>
                    <Tab label={`${strings.artwork.membership} ${characters.to}`}/>
                    <Tab label={`${strings.artwork.tokenomics} ${characters.to}`}/>
                </Tabs>
            </Grid>
        </Grid>
        <Divider className={'divider'}/>
        {/*{activeTab === ArtworkPageState.MEMBERSHIP && <>*/}
        {/*    */}
        {/*</>}*/}
        {
            activeTab === ArtworkPageState.ABOUT &&
            <div className='artwork-about-wrapper'>
                <div className={'artwork-about'}>
                    <OwlCarousel className='owl-theme white-nav' loop={true} items={1} nav={false}>
                        <div className='item'>
                            <img src="/images/preview-image.png" className={'image-container'}
                                 style={{width: '400px'}}/>
                        </div>
                        <div className='item'>
                            <img src="/images/preview-image.png" className={'image-container'}
                                 style={{width: '400px'}}/>
                        </div>
                        <div className='item'>
                            <img src="/images/preview-image.png" className={'image-container'}
                                 style={{width: '400px'}}/>
                        </div>
                        <div className='item'>
                            <img src="/images/preview-image.png" className={'image-container'}
                                 style={{width: '400px'}}/>
                        </div>
                    </OwlCarousel>
                </div>
                <div className='artwork-about-content'>
                    <Grid container spacing={2}>
                        <Grid item>
                            <p className='img-w-50 light-font-italic'>Lorem ipsum dolor sit amet caption (20XX), image
                                courtesy of Consectetur Adipiscing</p>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6} className='text-content double-padding'>
                            <h1>"Laugh Now, but one<br/>day we'll be in charge"</h1>
                        </Grid>
                        <Grid className='text-content' item xs={12} md={6}>
                            <h2>Laugh Now</h2>
                            <p className="font-16 font-grey mt-1">
                                Provocative, mysterious, and a maverick of contemporary art, Banksy has emerged as one
                                of the industry’s most enigmatic figures. He shifts effortlessly from cheekily dark
                                humour to grave activism, and his graffiti and printed works draw equally from pop
                                culture imagery as well as heated sociopolitical issues.
                            </p>
                        </Grid>
                    </Grid>
                    <Grid item md={12}>
                        <img className='img-w-100' src={'/images/Banksy_Landscape.jpeg'}/>
                        <p className='img-w-50 light-font-italic'>Lorem ipsum dolor sit amet caption (20XX), image
                            courtesy of Consectetur Adipiscing</p>
                    </Grid>
                    <Grid container spacing={2} justifyContent={'center'}>
                        <Grid className='text-content' item xs={12} md={8}>
                            <p className="font-16 font-grey mt-1">
                                The iconic message of Banksy’s ape—“Laugh now, but one day we’ll be in charge”—has
                                spoken to millions since it was first debuted in 2002, and it has become one of the
                                artist’s most recognisable and sought-after motifs. The astronomical prices and massive
                                popularity that the image commands comes down to the electrifying prospect of its
                                message. With a single statement, Banksy sums up the revolutionary promise and
                                anti-establishment ethos of current technological transformations. Is there any other
                                image to better capture this present moment of cultural, economic, and political change?
                            </p>
                            <p className="font-16 font-grey mt-1">
                                Co-Museum presents a completely unique Laugh Now: this version is accompanied by three
                                test stencils of Banksy’s Barcode Leopard print on the reverse side of the work. As a
                                rare dual-sided print, it is a singular example of Banksy’s poignant social lampooning,
                                as well as an exclusive look into the anonymous artist’s artistic process.
                            </p>
                            <p className="font-16 font-grey mt-1">
                                Banksy’s works have always walked the line between public and private ownership. Now,
                                Co-Museum offers the chance to actually own part of this unique version of Laugh Now,
                                returning one of Banksy’s most sought-after privately-owned works to the public
                                sphere—to the apes.
                            </p>
                        </Grid>
                    </Grid>
                    <div className='divider'></div>
                    <Grid container spacing={2}>
                        <Grid className='text-content' item xs={12} md={6}>
                            <img className='img-w-50' src={'/images/Banksy_book.jpeg'}/>
                            <p className='img-w-50 light-font-italic'>Lorem ipsum dolor sit amet caption (20XX), image
                                courtesy of Consectetur Adipiscing</p>
                        </Grid>
                        <Grid className='text-content' item xs={12} md={6}>
                            <h2>Banksy</h2>
                            <p className="font-16 font-grey mt-1">
                                Little is definitively known about Banksy, although it is generally thought that he was
                                born in 1974 in Bristol, England. He first delved into graffiti as a teenager in
                                Bristol’s underground scene, but only began creating pieces as Banksy in earnest during
                                the mid-1990s. Cleverly dissident and politically charged, the artist’s work remains
                                undeniably in-touch with his grassroots origins.
                            </p>
                            <p className="font-16 font-grey mt-1">
                                Banksy’s distinct preference for stencils emerged, according to the artist himself, out
                                of necessity: in his 2005 book Wall and Piece, he describes hiding from police as an
                                eighteen-year old vandal and experiencing an ‘epiphany’ while gazing up at the
                                stencilled underbelly of a dump truck. Stencils offer a maximisation of complexity while
                                minimising time spent producing the image—a quality which accounts for their popularity
                                in punk and underground scenes, political causes, and propaganda around the world.
                            </p>
                        </Grid>
                    </Grid>
                    <div className='divider'></div>
                    <Grid container spacing={2}>
                        <Grid className='text-content' item xs={12} md={6}>
                            <h2>Going Ape</h2>
                            <p className="font-16 font-grey mt-1">
                                As the figure of the ape has become a de facto emblem of the cryptosphere, Banksy’s work
                                has acquired a new significance. “Apeing” has become a standard phrase, and the primates
                                of Bored Apes Yacht Club (BAYC) served as the catalysts which brought NFTs and
                                crypto-culture into public awareness at large. Even Artnet’s Spring 2022 Intelligence
                                Report headline employs ‘apes’ as shorthand for those working and innovating at the
                                intersection of crypto and art.
                            </p>
                            <p className="font-16 font-grey mt-1">
                                The original image in Laugh Now was created in 2002 as a commissioned mural of ten
                                chimpanzees for the Ocean Rooms Nightclub in Brighton. Along with rats and leopards,
                                apes are one of Banksy’s favoured motifs, employed as symbols for human absurdity,
                                folly, and hypocrisy.
                            </p>
                            <p className="font-16 font-grey mt-1">
                                Often, the artist uses primates as a caricature for the human, depicted in positions of
                                power or grimly oppressed in equal measure. Banksy taps into complex and often
                                contradictory associations within the collective unconscious surrounding our closest
                                genetic relatives as they bridge the human/animal divide.
                            </p>
                            <p className="font-16 font-grey mt-1">
                                The imagery of Banksy’s Laugh Now slots neatly into a developing iconography of NFTs and
                                is poised to emerge as this era’s signature icon.
                            </p>
                        </Grid>
                        <Grid className='text-content' item xs={12} md={6}>
                            <img className='img-w-50' src={'/images/BoredApe.jpg'}/>
                            <p className='img-w-50 light-font-italic'>Lorem ipsum dolor sit amet caption (20XX), image
                                courtesy of Consectetur Adipiscing</p>
                        </Grid>
                    </Grid>
                    <div className='divider'></div>
                    <Grid container spacing={2}>
                        <Grid className='text-content' item xs={12} md={6}>
                            <img className='img-w-50' src={'/images/preview-image.png'}/>
                            <p className='img-w-50 light-font-italic'>Lorem ipsum dolor sit amet caption (20XX), image
                                courtesy of Consectetur Adipiscing</p>
                        </Grid>
                        <Grid className='text-content' item xs={12} md={6}>
                            <h2>Barcode</h2>
                            <p className="font-16 font-grey mt-1">
                                This edition of Laugh Now offered by Co-Museum also plays host to another one of the
                                artist’s most iconic motifs, the leopard of his Barcode series. Repeated three times on
                                the reverse side of the print, these test stencils offer a novel glimpse at Banksy’s
                                creative process. The test paintings comprise two larger leopards from the same stencil,
                                in addition to the well-known motif of a leopard emerging from the mangled confines of a
                                barcode cage.
                            </p>
                            <p className="font-16 font-grey mt-1">
                                As a symbol, the barcode is a potent one for the all-encompassing nature of contemporary
                                consumer culture and commodification, while the leopard can be viewed as a model for
                                breaking free of established and seemingly-inescapable systems. These test images reveal
                                to us Banksy’s exacting and elaborate planning behind the misleadingly clear-cut
                                appearance of the finished stencil.
                            </p>
                        </Grid>
                    </Grid>
                    <div className='divider'></div>
                    <Grid container spacing={2} alignItems={'flex-start'}>
                        <Grid className='text-content padding-right-small' item xs={12} md={6}>
                            <h2>By: Anonymous (Still Not Doxxed)</h2>
                            <p className="font-16 font-grey mt-1">
                                Anonymity—or pseudonymity—and online existence often go hand-in-hand, with one of the
                                most famous examples being the still-anonymous figure of Bitcoin’s inventor, Satoshi
                                Nakamoto. Both in the art world and outside of it, anonymous operation results in the
                                valuation of work on its merit, which Banksy’s career trajectory has wholly embodied.
                            </p>
                        </Grid>
                        <Grid className='text-content padding-left-small' item xs={12} md={6}>
                            <p className="font-16 font-grey mt-1">
                                Anonymity is a favoured tool among street artists, serving as a shield against potential
                                legal repercussions as well as a method of concentrating attention on the message of
                                one’s art. A decade before Banksy, the American street artist Jean-Michel Basquiat
                                operated under the pseudonym SAMO© before his ascent to fame in order to inscribe his
                                ironic, often surreal aphorisms onto the walls and subway cars of New York City. A
                                merging of street art conventions and commercial vernacular as a mechanism of critique,
                                Basquiat’s work under the SAMO© tag served as a precursor for the flavour of critical
                                vandalism that Banksy would go on to practice in Bristol and around the world.
                            </p>
                        </Grid>
                    </Grid>
                    <div className='divider'></div>
                    <Grid container spacing={2} justifyContent={'center'}>
                        <Grid className='text-content' item xs={12} md={8}>
                            <h2>“Wen Moon?”</h2>
                            <p className="font-16 font-grey mt-1">
                                For Banksy, however, operating anonymously has not meant remaining unrecognised. In
                                keeping with his reputation as playfully subversive, the street artist’s handful of
                                authorised solo exhibitions have seldom resembled a typical showcase. His Los Angeles
                                Barely Legal exhibit in 2006 featured several of his most famous works, including Laugh
                                Now, as well as a live, fully-grown Asian elephant painted to match the wallpaper. Three
                                years later, he produced Banksy vs. Bristol Museum (2009), for which he transformed the
                                Bristol Museum’s entrance hall into a display of his own sculptures and inserted his own
                                paintings among the galleries of Old Masters.
                            </p>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} justifyContent={'center'}>
                        <Grid item xs={12} md={3}>
                            <div className='custom-image-artwork'></div>
                            {/*<img className='img-w-100' src={'/images/BanksyShredded.jpeg'}/>*/}
                            <p className='img-w-100 light-font-italic'>Lorem ipsum dolor sit amet caption (20XX), image
                                courtesy of Consectetur Adipiscing</p>
                        </Grid>
                        <Grid item xs={12} md={9}>
                            <img className='img-w-100' src={'/images/DevolvedParliament.jpeg'}/>
                            <p className='img-w-100 light-font-italic'>Lorem ipsum dolor sit amet caption (20XX), image
                                courtesy of Consectetur Adipiscing</p>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} justifyContent={'center'}>
                        <Grid className='text-content' item xs={12} md={8}>
                            <p className="font-16 font-grey mt-1">
                                Both exhibitions consequently bolstered Banksy’s notoriety and opened the doors for the
                                sky-high prices that his works now attain. For example, another one of the artist’s most
                                famous ape works, Devolved Parliament (2009), sold for ~US$12million in 2019— exceeding
                                its maximum estimated price by almost five times. His reworking of a 19th century oil
                                painting, Subject to Availability, is estimated by Christie’s to fetch between US$ 4 and
                                6.9 million at their June 2021 20th Century sale.
                            </p>
                            <p className="font-16 font-grey mt-1">
                                Premium prices and extensive publicity surrounding the sales of his works serve as a
                                testament to Banksy’s consistent appeal. With the spirit of Basquiat and the legacy of
                                Warhol and Duchamp, Banksy stands to represent the first half of the 21st century in art
                                history better than almost any other artist.
                            </p>
                        </Grid>
                    </Grid>
                    <div className='divider'></div>
                    <Grid container spacing={2} justifyContent={'center'}>
                        <Grid className='text-content' item xs={12} md={8}>
                            <h2>One Day</h2>
                            <p className="font-16 font-grey mt-1">
                                Banksy’s enduring acclaim and considerable value points to a sea change in the art
                                world. Throughout his career, Banksy’s success has served to dissolve the barriers
                                between fine art and ‘vandalism’, collapsing old ideas of what constitutes art and the
                                conventions built around that doctrine.
                            </p>
                            <p className="font-16 font-grey mt-1">
                                Banksy stands out amongst a long line of artists participating in upending the
                                established order of the art world, and has played a major role in setting the stage for
                                innovations such as NFTs and cryptoart to become as impactful as they have.
                            </p>
                            <p className="font-16 font-grey mt-1">
                                Twenty years after its genesis, Laugh Now takes on an almost prophetic quality—the apes
                                are in charge now.
                            </p>
                        </Grid>
                    </Grid>
                    <div className='divider'></div>
                    <Grid container spacing={2} className='text-content-gray'>
                        <Grid item xs={12} md={6} className='artist-text'>
                            <h3>About the Artist</h3>
                            <p className="font-16 font-grey mt-1">
                                Banksy is a pseudonymous England-based street artist, political activist and film
                                director whose real name and identity remain unconfirmed and the subject of speculation.
                            </p>
                            <p className="font-16 font-grey mt-1">
                                For all enquiries, complaints, threats and hate mail visit <a
                                href='https://pestcontroloffice.com' target='_blank'>pestcontroloffice.com ↗</a>.
                                Banksy is not on Facebook, Twitter or represented by any other gallery or institution.
                            </p>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <img className='img-w-100' src={'/images/artist.png'}/>
                            <p className='img-w-100 light-font-italic'>Lorem ipsum dolor sit amet caption (20XX), image
                                courtesy of Consectetur Adipiscing</p>
                        </Grid>
                    </Grid>
                </div>
            </div>
        }

        {
            activeTab === ArtworkPageState.MEMBERSHIP &&
            <div
                className={`artwork-membership-content ${loading ? 'loading-page' : ''}  ${preview && !loading ? 'preview-page' : ''}`}>
                <div className='membership-banner'>
                    <OwlCarousel className='owl-theme' dots={false} autoplayTimeout={2000} autoplaySpeed={2000}
                                 autoWidth={true} autoplay={true} loop={true}>
                        <div className='item'>
                            <h4>Genesis Member<span className='dot'/>Since 31 Oct 2022<span className='dot'/></h4>
                        </div>
                        <div className='item'>
                            <h4>Genesis Member<span className='dot'/>Since 31 Oct 2022<span className='dot'/></h4>
                        </div>
                        <div className='item'>
                            <h4>Genesis Member<span className='dot'/>Since 31 Oct 2022<span className='dot'/></h4>
                        </div>
                        <div className='item'>
                            <h4>Genesis Member<span className='dot'/>Since 31 Oct 2022<span className='dot'/></h4>
                        </div>
                        <div className='item'>
                            <h4>Genesis Member<span className='dot'/>Since 31 Oct 2022<span className='dot'/></h4>
                        </div>
                        <div className='item'>
                            <h4>Genesis Member<span className='dot'/>Since 31 Oct 2022<span className='dot'/></h4>
                        </div>
                        <div className='item'>
                            <h4>Genesis Member<span className='dot'/>Since 31 Oct 2022<span className='dot'/></h4>
                        </div>
                        <div className='item'>
                            <h4>Genesis Member<span className='dot'/>Since 31 Oct 2022<span className='dot'/></h4>
                        </div>
                        <div className='item'>
                            <h4>Genesis Member<span className='dot'/>Since 31 Oct 2022<span className='dot'/></h4>
                        </div>
                    </OwlCarousel>
                </div>
                {
                    MembershipStates.map(state => <Button key={'state-' + state}
                                                          onClick={() => setPageStateMembership(MembershipState[state])}>{state}</Button>)
                }
                <div className="loading">
                    <p className="font-16 font-black text-center">Processing Transaction</p>
                    <LinearProgress variant="determinate" value={loadingValue}/>
                    <a href={'https://etherscan.io/address/' + web3?.address} target='_blank' style={{textDecoration: 'none'}}>
                        <Button className={'font-12 font-black font-capitalize'}><img src="/images/view-grey.svg" className={'image-12x12 mr-5px'}/>{strings.common.viewOnExplorer}</Button>
                    </a>
                </div>
                <div className="preview">
                    <p className="text-center font-28">Laugh Now <span
                        className="font-grey-2 font-28">#4316</span> redeemed.</p>
                    <Grid container justifyContent={'center'} spacing={2}>
                        <Grid item xs={8} className='d-flex content-center'>
                            <img src="/images/tier-3.png" className="item"/>
                        </Grid>
                        <Grid item xs={6}>
                            <div className="d-flex content-center pb-64px">
                                <Button className={'white-black-button xs bordered mr-1'} onClick={onShare}><img
                                    src="/images/share.svg" className={'image-14x14'}/>{strings.ourOfferings.share}
                                </Button>
                                <Button className={'black-white-button xs mr-1'}
                                        href='/my-collection'>{strings.myCollection.viewInMyCollection}</Button>
                                <Button className={'white-black-button xs bordered'}
                                        onClick={() => goToPreview(false)}>Close</Button>
                            </div>
                        </Grid>
                    </Grid>
                </div>

                <div className={'artwork-membership'}>

                    <span className={'font-24 font-black title'}>Membership Tiers</span>
                    <div className={'float-right'}>
                        <Chip label={<div className={'d-flex'}>
                            <span className={'font-16'}>20054</span>
                            <img src="/images/grey-point.svg" className={'image-16x16 mx-5px'}/>
                            <span className={'font-16'}>BKLN</span>
                        </div>}/>
                    </div>

                    <div className={'membership-items'}>
                        {items.map(item => <div className="membership-item-container"
                                                onMouseLeave={() => setRedeemItemId(0)}>
                                <div className="membership-item">
                                    <div>
                                        <span>-</span>
                                        <div className={'float-right'}>
                                            <div className={'d-flex items-center'}>
                                                <span className={'font-16'}>{item.price}</span>
                                                <img src="/images/grey-point.svg" className={'image-16x16 mx-5px'}/>
                                                <span className={'font-16'}>BKLN</span>
                                            </div>
                                        </div>
                                    </div>
                                    <Divider className={'item-divider'}/>
                                    {
                                        <div className={redeemItemId !== item.id ? 'card-visible' : 'card-hidden'}>
                                            <p className={'item-title'}>{item.title}</p>
                                            <img src={item.image} className={'image-container'}/>
                                            <div className="membership-feature">
                                                <p className={'font-black font-13'}>
                                                    Membership Features
                                                </p>
                                                <ul className={'font-13 font-grey membership-content'}>
                                                    {item.features.map(feature => <li>{feature}</li>)}
                                                </ul>
                                            </div>
                                        </div>}
                                    {
                                        <>
                                            <p className={redeemItemId === item.id ? 'card-visible font-20' : 'card-hidden font-20'} >You are about to lock {item.price} $BKLN tokens to redeem a
                                                membership NFT. You will be able to withdraw your membership and release your
                                                BKLN tokens at any point in time.</p>
                                        </>}

                                </div>
                                {
                                    pageStateMembership !== MembershipState.PRE_SALE && redeemItemId !== item.id &&
                                    <div>
                                        {
                                            item.id % 2 === 0 &&
                                            <Button className={'black-white-button w-100 redeem-btn'}
                                                    onClick={() => setRedeemItemId(item.id)}>Redeem</Button>
                                        }
                                        {
                                            item.id % 2 === 1 &&
                                            <Button className={'black-white-button-disabled w-100 redeem-btn redeem-btn'}
                                                    onClick={() => setRedeemItemId(item.id)}>Sold out</Button>
                                        }
                                    </div>
                                }
                                {
                                    redeemItemId === item.id &&
                                    <>
                                        <div className={redeemItemId === item.id ? 'card-visible my-16px' : 'card-hidden my-16px'}>
                                                <Button
                                                    className={'white-black-button w-90 redeem-btn bordered xs transparent mx-16px'}>
                                                    Learn more
                                                </Button>

                                            <Divider className="my-16px"/>
                                            <Grid container spacing={2} justifyContent='space-around'>
                                                <Grid item xs={6}>
                                                    <Button className={'black-white-button redeem-btn w-100 xs'}
                                                            onClick={() => goToPreview(true)}>
                                                        Redeem
                                                        <span className="font-12 font-grey">&nbsp; = {item.price} $BLKN</span>
                                                    </Button>

                                                </Grid>
                                                <Grid item xs={3}>
                                                    <Button
                                                        className={'white-black-button redeem-btn bordered w-100 xs transparent'}
                                                        onClick={() => setRedeemItemId(0)}>
                                                        Close
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </div>
                                    </>
                                }
                            </div>
                        )}
                    </div>
                </div>
            </div>
        }

        {
            activeTab === ArtworkPageState.TOKENOMICS && <div className={'artwork-tokenomics'}>
                <div>
                    <Grid container spacing={4}>
                        <Grid item xs={6}>
                            <p className={'font-24 font-black'}>{strings.artwork.tokenSalesData}</p>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell
                                                className={'font-16 font-black'}>{strings.artwork.tokenName}</TableCell>
                                            <TableCell className={'font-16 font-black'}>BKLN</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows.map(row => <TableRow>
                                                <TableCell component="th" scope="row" className={'font-13 font-grey'}>
                                                    {row.name}
                                                </TableCell>
                                                <TableCell component="th" scope="row" className={'font-13 font-grey'}>
                                                    {row.value}
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                        <Grid item xs={6}>
                            <p className={'font-24 font-black'}>{strings.artwork.tokenAllocation}</p>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell className={'font-16 font-black'}>{strings.artwork.group}</TableCell>
                                            <TableCell
                                                className={'font-16 font-black'}>{strings.artwork.percentage}</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {groups.map(row => <TableRow>
                                                <TableCell component="th" scope="row" className={'font-13 font-grey'}>
                                                    {row.name}
                                                </TableCell>
                                                <TableCell component="th" scope="row" className={'font-13 font-grey'}>
                                                    {row.value}{strings.artwork.percentageSupply}
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <img src='/images/doner.png' style={{width: '100%'}}/>
                        </Grid>
                    </Grid>
                </div>

            </div>
        }

    </>;
}


export default ArtworkPage;