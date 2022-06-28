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
import { MembershipState, MembershipStates } from "../../constants/membership-state";
import DialogContext from "../../context/DialogContext";
import ShareDialog from "./ShareDialog";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import dynamic from "next/dynamic";
const OwlCarousel = dynamic(import("react-owl-carousel"), {ssr: false});

const ArtworkPage = ({item, pageState = ArtworkPageState.ABOUT}) => {

    const [activeTab, setActiveTab] = useState(pageState);
    const [pageStateMembership, setPageStateMembership] = useState(MembershipState.PRE_SALE);
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState(false);
    const [loadingValue, setLoadingValue] = useState(0);
    const {initDialog, close} = useContext(DialogContext);

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
            price: 400,
            title: 'Member',
            image: '/images/tier-1.png',
            features: ['Access to freeport +1 guest', 'Access to IRL events', 'Access to collectibles + merch']
        },
        {
            id: 2,
            price: 4000,
            image: '/images/tier-2.png',
            title: 'Foundation Member',
            features: ['1 to 1 token allocation for next drop', 'Access to our exhibit on preview day']
        },
        {
            id: 3,
            price: 40000,
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
                    <OwlCarousel className='owl-theme' loop={true} items={1} nav={false}>
                        <div className='item'>
                            <img src="/images/preview-image.png" className={'image-container'} style={{width: '400px'}}/>
                        </div>
                        <div className='item'>
                            <img src="/images/preview-image.png" className={'image-container'} style={{width: '400px'}}/>
                        </div>
                        <div className='item'>
                            <img src="/images/preview-image.png" className={'image-container'} style={{width: '400px'}}/>
                        </div>
                        <div className='item'>
                            <img src="/images/preview-image.png" className={'image-container'} style={{width: '400px'}}/>
                        </div>
                    </OwlCarousel>
                </div>
                <div className='artwork-about-content'>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6} className='text-content double-padding'>
                            <h1>"Laugh Now, but one<br/>day we'll be in charge"</h1>
                            <p className="font-16 font-grey mt-1">
                                <b>Medium</b><br/>
                                Silikscreen on paper<br/>
                                58.4 x 54.6<br/>
                                Edition of 150
                            </p>

                        </Grid>
                        <Grid className='text-content' item xs={12} md={6}>
                            <h2>About the Artwork</h2>
                            <p className="font-16 font-grey mt-1">
                                Now synonymous with the name Banksy, the dejected, stencilled monkey of Laugh Now (2003)
                                has become a key motif in the artist’s oeuvre. First commissioned by the Ocean Rooms
                                nightclub on Morley Street in Brighton, it originally appeared as a six-metre long,
                                spray painted mural, with the figure of the monkey repeated ten times in a row to form a
                                backdrop to the Brighton bar.
                            </p>
                            <p className="font-16 font-grey mt-1">
                                In 2003 the piece was also released as 150 signed and 600 unsigned edition prints, along
                                with 69 artist's proofs. In 2008, Ocean Rooms sold the painting at Bonham’s for what was
                                then a record auction price of nearly half a million dollars. Today, Laugh Now is one of
                                Banksy’s most internationally recognised works.
                            </p>
                        </Grid>
                    </Grid>
                    <Grid item md={12}>
                        <div className='artwork-image-1'>

                        </div>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid className='text-content' item xs={12} md={6}>
                            <p className="font-16 font-grey mt-1">
                                Rendered in Banksy’s signature monochrome style, the forlorn monkey of Laugh Now wears
                                only a sandwich board, bearing the words “Laugh now, but one day we’ll be in charge”.
                                The heavy board, along with the monkey’s slumped shoulders and sunken eyes suggest that
                                he is oppressed or enslaved.
                            </p>
                            <p className="font-16 font-grey mt-1">
                                Along with the rat, the monkey is one of Banksy’s most frequently used animal
                                characters. Satirising the nature of humankind, Banksy uses these animals as didactic
                                figures in his critical social commentary. The catchphrase on the board is also typical
                                of those often used by the artist to convey powerful or poignant messages to his
                                audience. To learn more, see our guides to the Monkey and Rat in Banksy's work.
                            </p>
                        </Grid>
                        <Grid className='text-content' item xs={12} md={6}>
                            <div className='artwork-image-2'>

                            </div>
                        </Grid>
                    </Grid>
                    <div className='divider'></div>
                    <Grid container spacing={2}>
                        <Grid className='text-content' item xs={12} md={6}>
                            <div className='artwork-image-3'>

                            </div>
                        </Grid>
                        <Grid className='text-content' item xs={12} md={6}>
                            <h2>Why 'Laugh Now' is important</h2>
                            <p className="font-16 font-grey mt-1">
                                Since it was first seen in 2002, several versions of the stencilled monkey motif have
                                appeared in Banksy’s oeuvre. Notably, it was displayed on the occasion of the artist’s
                                first solo show Existentialism which took place in Los Angeles later that same year,
                                alongside other provocative aphorisms including “Keep it real” or “Lying to a cop is
                                never wrong”.
                            </p>
                            <p className="font-16 font-grey mt-1">
                                Following its record-breaking sale in 2008, a milestone auction for Urban Art, the
                                artwork was subsequently exhibited in Amsterdam in 2017 at the Moco Museum, located in a
                                breathtaking traditional mansion called Villa Alsberg, next to the famous Rijksmuseum
                                and Van Gogh Museum. Laugh Now was the centrepiece of the eponymous exhibition, although
                                more than fifty indoor and outdoor works by Banksy were displayed, including the iconic
                                Girl With Balloon and other recognised works such as Barcode, Pulp Fiction, and Kate
                                Moss.
                            </p>
                        </Grid>
                    </Grid>
                    <div className='divider'></div>
                    <Grid container spacing={2} className='text-content-gallery'>
                        <Grid className='artwork-gallery-item' item xs={12} md={4}>
                            <div className='artwork-image-4'></div>
                            <h3>Laugh Now But One Day We’ll Be In Charge, 2000</h3>
                            <p className="font-16 font-grey mt-1">
                                Acrylic and stencil spray-paint on canvas
                                61×61 cm (24×24 inches)
                                Sotheby’s Hong-Kong, 18 June 2021
                                USD 2,280,000
                            </p>
                        </Grid>
                        <Grid className='artwork-gallery-item' item xs={12} md={4}>
                            <div className='artwork-image-5'></div>
                            <h3>Laugh Now, 2002</h3>
                            <p className="font-16 font-grey mt-1">
                                Stencil spray paint on painted board, in 3 parts
                                107.5 x 604.5 cm (42 3/8 x 237 7/8 inches)</p>
                        </Grid>
                        <Grid className='artwork-gallery-item' item xs={12} md={4}>
                            <div className='artwork-image-6'></div>
                            <h3>Laugh Now But One Day We’ll Be In Charge, 2002</h3>
                            <p className="font-16 font-grey mt-1">
                                Spray-paint and emulsion on paperboard
                                76×102 cm (30 x 41 1/8 inches)
                                Christie’s London, 11 May 2021
                                GBP 1,460,000 / USD 2,070,000</p>
                        </Grid>
                    </Grid>
                    <div className='divider'></div>
                    <Grid item xs={12} md={12} className='button-container text-content-quote'>
                        <p className="font-16 font-grey mt-1">
                            “Laugh Now could also be seen as a criticism of the way that humans have been treating
                            animals, in particular our primate cousins, throughout the course of history to this day,
                            whether poaching or capturing them for entertainment or medical testing. The provocative
                            text on the board is both mocking and threatening, clearly suggesting that the character is
                            preparing for an uprising, as if Banksy is warning his viewers of an imminent revolution.”
                        </p>
                    </Grid>
                    <div className='divider'></div>
                    <Grid item xs={12} md={12} className='button-container text-content'>
                        <Button variant={"contained"} className={'black-white-button xs'}>Join the Waitlist / Acquire
                            the Artwork</Button>
                    </Grid>
                    <Grid container spacing={2} className='text-content-gray'>
                        <Grid item xs={12} md={6}>
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
                            <div className='artwork-image-7'>

                            </div>
                        </Grid>
                    </Grid>
                </div>
            </div>
        }

        {
            activeTab === ArtworkPageState.MEMBERSHIP && 
            <div className={`artwork-membership-content ${loading? 'loading-page': ''}  ${preview && !loading? 'preview-page': ''}`}>
                <div className='membership-banner'>
                    <OwlCarousel className='owl-theme' dots={false} autoplayTimeout={2000} autoplaySpeed={2000} autoWidth={true} autoplay={true} loop={true}>
                        <div className='item'>
                            <h4>Genesis Member<span className='dot'/>Since 21 Nov 2021<span className='dot'/></h4>
                        </div>
                        <div className='item'>
                            <h4>Genesis Member<span className='dot'/>Since 21 Nov 2021<span className='dot'/></h4>
                        </div>
                        <div className='item'>
                            <h4>Genesis Member<span className='dot'/>Since 21 Nov 2021<span className='dot'/></h4>
                        </div>
                        <div className='item'>
                            <h4>Genesis Member<span className='dot'/>Since 21 Nov 2021<span className='dot'/></h4>
                        </div>
                        <div className='item'>
                            <h4>Genesis Member<span className='dot'/>Since 21 Nov 2021<span className='dot'/></h4>
                        </div>
                        <div className='item'>
                            <h4>Genesis Member<span className='dot'/>Since 21 Nov 2021<span className='dot'/></h4>
                        </div>
                        <div className='item'>
                            <h4>Genesis Member<span className='dot'/>Since 21 Nov 2021<span className='dot'/></h4>
                        </div>
                        <div className='item'>
                            <h4>Genesis Member<span className='dot'/>Since 21 Nov 2021<span className='dot'/></h4>
                        </div>
                        <div className='item'>
                            <h4>Genesis Member<span className='dot'/>Since 21 Nov 2021<span className='dot'/></h4>
                        </div>
                    </OwlCarousel>
                </div>
                {
                    MembershipStates.map(state => <Button key={'state-'+state} onClick={() => setPageStateMembership(MembershipState[state])}>{state}</Button>)
                }
                <div className="loading">
                    <p className="font-16 font-black text-center">Processing Transaction</p>
                    <LinearProgress variant="determinate" value={loadingValue} />
                </div>
                <div className="preview">
                <p className="text-center font-28">Laugh Now <span className="font-grey-2 font-28">#4316</span> redeemed.</p>
                <Grid container justifyContent={'center'} spacing={2}>
                    <Grid item xs={8} className='d-flex content-center'>
                            <img src="/images/tier-3.png" className="item"/>
                        </Grid>
                    <Grid item xs={6}>
                        <div className="d-flex content-center pb-64px">
                            <Button className={'white-black-button xs bordered mr-1'} onClick={onShare}><img src="/images/share.svg" className={'image-14x14'}/>{strings.ourOfferings.share}</Button>
                            <Button className={'black-white-button xs mr-1'} href='/my-collection'>{strings.myCollection.viewInMyCollection}</Button>
                            <Button className={'white-black-button xs bordered'} onClick={() => goToPreview(false)}>Close</Button>
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
                    {items.map(item => <div className="membership-item-container" onMouseLeave={() => setRedeemItemId(0)}>
                            <div className="membership-item">
                                <div>
                                    <span>-</span>
                                    <div className={'float-right'}>
                                        <div className={'d-flex'}>
                                            <span className={'font-16'}>{item.price}</span>
                                            <img src="/images/grey-point.svg" className={'image-16x16 mx-5px'}/>
                                            <span className={'font-16'}>BKLN</span>
                                        </div>
                                    </div>
                                </div>
                                <Divider className={'item-divider'}/>
                                {
                                redeemItemId !== item.id && <>
                                    <p className={'item-title'}>{item.title}</p>
                                    <img src={item.image} className={'image-container'}/>
                                    <div className="membership-feature">
                                        <p className={'font-black font-13'}>
                                            Membership Features
                                        </p>
                                        <div className={'font-13 font-grey membership-content'}>
                                            {item.features.map(feature => <p>{feature}</p>)}
                                        </div>
                                    </div>                                
                                </>}
                                {
                                redeemItemId === item.id && <>
                                    <p className={'font-20'}>You are about to lock {item.price} $BKLN tokens to redeem a membership NFT. You will be able to withdraw your membership and release your BKLN tokens at any point in time.</p>
                                </>}

                            </div>
                            {
                                pageStateMembership !== MembershipState.PRE_SALE && redeemItemId !== item.id &&
                                <div>
                                    <Button className={'black-white-button w-100 redeem-btn'} onClick={() => setRedeemItemId(item.id)}>Redeem</Button>
                                </div>
                            }
                            {
                                redeemItemId === item.id && <>
                                    <div className="my-16px">
                                        <Button className={'white-black-button w-90 redeem-btn bordered xs transparent mx-16px'}>
                                            Learn more
                                        </Button>

                                        <Divider className="my-16px"/>
                                        <Grid container spacing={2} justifyContent='space-around'>
                                            <Grid item xs={6}>
                                                <Button className={'black-white-button redeem-btn w-100 xs'} onClick={() => goToPreview(true)}>
                                                    Redeem
                                                        <span className="font-12 font-grey">&nbsp; = {item.price} $BLKN</span>
                                                </Button>

                                            </Grid>
                                            <Grid item xs={3}>
                                                <Button className={'white-black-button redeem-btn bordered w-100 xs transparent'} onClick={() => setRedeemItemId(0)}>
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
                    <Grid xs={6}>
                        <p className={'font-24 font-black'}>Token Release Schedule</p>
                        <img src='/images/chart.png' style={{width: '100%'}}/>
                    </Grid>

                </div>

            </div>
        }

    </>;
}


export default ArtworkPage;