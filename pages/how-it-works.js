import {
    Button,
    Divider,
    Grid,
    Link,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import strings from "../utils/localization";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {characters} from "../utils/constants/characters";


const HowItWorks = () => {

    const [hashUrl, setHashUrl] = useState('/how-it-works#introduction');
    const router = useRouter();

    useEffect(() => {
        const onHashChangeStart = (url) => {
            setHashUrl(url);
        }

        const onScroll = (e) => {
            const items = document.querySelectorAll('div.container div[id]');
            items.forEach(item => {
                const rect = item.getBoundingClientRect();
                if (rect.top >= 0 && rect.top < 150) {
                    const id = `#${item.id}`;
                    const location = window.location.toString().split('#')[0];
                    history.replaceState(null, null, location + id);
                    setHashUrl(`/how-it-works${id}`)
                }
            });
        }

        setHashUrl(window.location.hash || links[0].link);
        router.events.on("hashChangeStart", onHashChangeStart);
        document.addEventListener('scroll', onScroll);
        return () => {
            router.events.off("hashChangeStart", onHashChangeStart);
            document.removeEventListener('scroll', onScroll);
        };
    }, [router.events]);

    const links = [
        {link: '/how-it-works#introduction', title: strings.howToWorks.introduction},
        {link: '/how-it-works#the-process', title: strings.howToWorks.theProcess},
        {link: '/how-it-works#erc20', title: strings.howToWorks.erc20},
        {link: '/how-it-works#membership-tiers', title: strings.howToWorks.membershipTiers},
        {link: '/how-it-works#terminology', title: strings.howToWorks.theTerminology}
    ]

    const items = [
        {
            price: 450,
            image: "/images/tier-1.png",
            title: 'Member',
            features: ['Individual viewing rights', 'Access to Friend IRL events', 'Access to Friend collectibles and merch'],
            description: 'As a Friend, you’ll receive a dynamic NFT based on Laugh Now and admittance to our in-person events around the world. You’ll also be able to purchase select merchandise for Banksy owners and Friend of Co-Museum Banksy physical collectibles. When you visit your art in person at Le Freeport, you’ll be able to bring one guest to accompany you. This membership tier is priced at 450 BKLN.'
        },
        {
            price: 4500,
            image: "/images/tier-2.png",
            title: 'Foundation Member',
            features: ['Individual viewing rights + 1 guest', 'Access to Friend and Patron IRL events', 'Access to Patron collectibles and merch'],
            description: 'Foundation receive all of the benefits of a Friend of Co-Museum, with additional advantages. You’ll be able to invite two guests to accompany you to experience your art in person at Le Freeport, as well as bring them to Co-Museum events. Patrons receive VIP access to preview day, token allocations for our next drop, and invites to the Annual Breakfast and Dinner with the Co-Museum team. You’ll also have access to purchase our E-canvas so that you can enjoy your art collection within your home. This membership tier is priced at 4,500 BKLN.'
        },
        {
            price: 45000,
            image: "/images/tier-3.png",
            title: 'Genesis Member',
            features: ['Individual viewing rights + 3 guests', 'Access to all events + exclusive VIP events', 'Access to Alpha collectibles and merch'],
            description: 'Genesis membership can be acquired by purchasing 1% of $ART token supply (for our first drop, 45,000 $BKLN). At this tier, you’ll gain access to all of the perks available to Friends and Patrons as well as amenities such as an Annual Breakfast and Dinner with the Team, exclusive merch, and event access reserved solely for Alpha members. Alphas will also receive token allocations for our next three drops and access to art exhibitions around the world.'
        }
    ]


    return <>
        <div className={'container p-0 m-0'} key={'how-it-works'} id='how-it-works'>
            <Grid container>
                <Grid item xs={12} md={6} className={'bg-green d-flex center-flex d-column'}>
                    <div className={'page-title'}>
                        <div className={'font-32 font-black-2'}>How Co-Museum Works</div>
                        <div className={'font-16 font-black-2'}>The First Publicly-Owned Museum</div>
                    </div>
                </Grid>
                <Grid item xs={12} md={6}>
                    <img src={'/images/how-it-works-bg.png'} className={'image-container'} loading={'lazy'}/>
                </Grid>
            </Grid>
            <div className="how-it-works">
                <div className={'how-it-works-menu'}>
                    <span className={'font-16 font-black'}>{strings.howToWorks.content}</span>
                    <Divider className={'br-b-1-grey-3 p-0 m-0'}/>
                    {links.map((link, index) =>
                        <p key={'link-' + index}
                           className={'font-16 page-states ' + (link.link === hashUrl ? 'active' : '')}>
                            <Link onClick={() => setHashUrl(link.link)} href={link.link}><span
                                className={'pr-24px'}>0{index + 1}</span> <span>{link.title}</span> <span
                                className={'float-right'}>{characters.to}</span></Link>
                        </p>)}
                </div>

                <div className="how-it-works-content">
                    <div id={'introduction'}>
                        <div className={'font-20 introduction-title'}><span
                            className={'font-12 pr-24px'}>01</span> Introduction
                        </div>
                        <div className={'font-grey'}>
                            <p>Co-Museum is a radically new cultural institution
                                devoted to making public ownership the new paradigm of art collection.</p>
                            <p>We leverage blockchain technology to democratise access
                                to some of the world’s masterpieces, and create a fully liquid and permissionless art
                                market. Co-Museum is committed to cultivating a digitally-native collective of creative
                                individuals passionate about art, culture, and community.</p>
                            <p>We believe in the enduring importance of the physical
                                experience of art, and our key partnership with Le Freeport (Singapore) ensures that our
                                artworks can be seen in-person by co-owners in specialised viewing rooms, and remain
                                permanently protected. Our team is global with headquarters in Singapore.</p>
                        </div>
                    </div>
                    <Divider className={'section-divider'}/>
                    <div id={'the-process'}>
                        <div className={'text pr-48px'}>
                            <span className={'font-20'}><span className={'font-12 pr-24px'}>02</span> The Process</span>
                            <div className={'font-16 font-grey'}>
                                <p className={'d-flex'}>Our process ensures that your tokens and NFTs are backed by
                                    valuable, tangible fine art.</p>
                                <p className={'d-flex'}>First, Co-Museum identifies and acquires artwork in accordance
                                    with our mission and collection standards. The painting’s title deed is then
                                    converted and issued as an NFT (ERC-721). Using a customisation of a protocol called
                                    fractional.art, Co-Museum fractionalises the NFT into ERC-20 tokens ($ART) to create
                                    a fully liquid and permissionless art market.</p>
                                <p className={'d-flex'}>For our first painting, Laugh Now, each token ($BKLN) is priced
                                    at USD 1 at launch. $ART tokens are distributed through an allowlisting
                                    mechanism—which functions similarly to a private sale—until the total available
                                    supply is sold. Our mint date will be announced soon, but allowlisting opportunities
                                    are currently open.</p>
                                <p className={'d-flex'}>You can purchase $ART tokens directly, or purchase them locked
                                    into a membership NFT. At any time, your $ART tokens can be exchanged for Co-Museum
                                    membership NFTs, and your membership may be swapped for the underlying ERC-20 tokens
                                    too. Co-Museum offers three tiers of membership to collectors, which are elaborated
                                    in greater detail in the section titled ‘Membership Tiers’. Payment may be made with
                                    your digital wallet in USDC, USDT, or ETH.</p>
                                <p className={'d-flex'}>Once the total supply of $ART is sold, you will be able to buy,
                                    sell, and swap tokens using a liquidity pool on Uniswap, on Co-Museum’s app, or on
                                    secondary NFT marketplaces, such as Opensea. As the supply of $ART tokens is fixed,
                                    their value is determined by the price of the underlying artwork as well as market
                                    demand for the tokens at any given time. Rather than the painting’s value being
                                    determined by a single transaction at auction, our community of co-owners has the
                                    potential to drive the commercial value of art to new heights—together.</p>
                            </div>
                        </div>
                        <img style={{height: '100%'}} src={'/images/process.png'}/>
                    </div>
                    <Divider className={'section-divider'}/>
                    <div id={'erc20'}>
                        <div className={'font-20 introduction-title'}><span
                            className={'font-12 pr-24px'}>03</span> ERC-20 vs. NFT
                        </div>
                        <div className={'font-grey'}>
                            <p>To become a co-owner, you have the option to buy and trade painting-specific assets as
                                either ERC-20 tokens ($ART) or as tiered membership NFTs.</p>
                            <p>We’ve provided these options because we understand and value the wide range of
                                relationships to and motivations for art ownership. Whether you’re passionate about
                                harnessing fine art as an investment vehicle or excited by the idea of being a part of a
                                creative institution at the intersection of art and crypto, we’ve highlighted just a few
                                of each option’s benefits below. </p>
                        </div>
                        <div className={'sub-content'}>
                            <div className={'sub-content-item'}>
                                <div className={'font-16'}>ERC-20 vs. NFT</div>
                                <Divider className={'section-divider'}/>
                                <ul>
                                    <li>
                                        See real-time prices based on $ART exchange rate in our primary liquidity pool
                                        and directly gauge the value of the painting-specific token
                                    </li>
                                    <li>
                                        Buy and sell painting-specific tokens like any other cryptocurrency (BTC, ETH,
                                        etc.) on decentralised exchanges
                                    </li>
                                    <li>
                                        Gain exposure to the underlying asset (painting) and participate in a liquid,
                                        permissionless art market
                                    </li>
                                </ul>
                            </div>
                            <div className={'sub-content-item'}>
                                <div className={'font-16'}>ERC-20 vs. NFT</div>
                                <Divider className={'section-divider'}/>
                                <ul>
                                    <li>
                                        Obtain a unique, dynamic profile picture (PFP) signifying ownership of $ART
                                        tokens and membership in our community
                                    </li>
                                    <li>
                                        Buy and sell unique NFTs backed by physical paintings alongside other NFTs on
                                        Opensea and similar marketplaces
                                    </li>
                                    <li>
                                        Become a part of the Co-Museum community and gain access to digital as well as
                                        in-person viewing rights and collectibles
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <Divider className={'section-divider'}/>
                    <div id={'membership-tiers'}>
                        <span className="font-20"><span className={'font-12 pr-24px'}>04</span> Membership Tiers</span>
                        <div className={'font-grey'}>
                            <p>Ready to be a part of our global community that’s redefining what it means to collect
                                art? For our first launch, we’re offering three distinct memberships tiered according to
                                the number of $BKLN tokens held: Friend, Patron, and Alpha.</p>
                            <p>Each tier grants NFT holders access to our specialised viewing facilities at Le Freeport
                                so that you can physically visit and view the artwork your tokens represent. Our
                                membership network constitutes an ecosystem of like-minded creatives, art lovers, and
                                forward-thinking professionals that we can’t wait for you to be a part of. Provided is a
                                brief summary of just a few of the perks that accompany each tier, and look out for more
                                to be added in the future.
                            </p>
                        </div>
                        <div className="membership-items" key={'membership-items'}>
                            {items.map((item, index) =>
                                <div className="membership-item-wrapper">
                                    <div className="membership-item-container">
                                        <div className="membership-item">
                                            <div>
                                                <div className={'d-flex items-center'}>
                                                    <span className={'font-16'}>{item.price}</span>
                                                    <img src="/images/grey-point.svg" className={'image-16x16 mx-5px'}/>
                                                    <span className={'font-16'}>BKLN</span>
                                                </div>
                                            </div>
                                            <Divider className={'item-divider'}/>
                                            <p className={'item-title'}>{item.title}</p>
                                            <img src={item.image} className={'image-container'}/>
                                            <div className="membership-feature">
                                                <p className={'font-black font-12'}>
                                                    Membership Features
                                                </p>
                                                <ul className={'font-12 font-grey membership-content'}>
                                                    {item.features.map(feature => <li>{feature}</li>)}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={'font-16 font-grey item-description'}>
                                        <div className={'item-description-title'}>{item.title}</div>
                                        <div className={'font-grey'}>
                                            <p>
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <Divider className={'section-divider'}/>
                    <div id={'terminology'}>
                        <div className={'sub-content-container'}>
                            <div className={'sub-content-item'}>
                                <div className={'font-20 introduction-title'}><span
                                    className={'font-12 pr-24px'}>05</span> Terminology
                                </div>
                            </div>
                            <div className={'sub-content-item'}>
                                <div className={'row'}>
                                    <div className={'column-left'}>
                                        <p>Terms</p>
                                    </div>
                                    <div className={'column-right'}>
                                        <p>Definition</p>
                                    </div>
                                </div>
                                <Divider className={'section-divider'}/>
                                <div className={'row'}>
                                    <div className={'column-left'}>
                                        <p>ERC-20</p>
                                    </div>
                                    <div className={'column-right'}>
                                        <div className={'font-grey'}>
                                            <p>That makes each token exactly the same as any other (in type and value)</p>
                                        </div>
                                    </div>
                                </div>
                                <Divider className={'section-divider'}/>
                                <div className={'row'}>
                                    <div className={'column-left'}>
                                        <p>ERC-721 / NFT</p>
                                    </div>
                                    <div className={'column-right'}>
                                        <div className={'font-grey'}>
                                            <p>Representing non-fungible assets (not tokens, the tokens do the representing)</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <Divider className={'section-divider'}/>
                    <div className={'documentation-button-container'}>
                        <Button className={'black-white-button mt-1 documentation-button'} href='https://docs.co-museum.com/about-co-museum/readme' target={'_blank'}>
                            Read Our Full Documentation
                        </Button>
                    </div>

                </div>
            </div>
        </div>
        <div className={'box-silver d-flex center-flex mt-2 quote-container'}>
            <div className={'font-20 quote'}>
                “Co-Museum is a new paradigm in art collecting: liquid, dynamic, and community-driven. We are unlocking
                a multi-trillion dollar asset class to bring ownership of masterpieces back into the hands of the
                public. For the first time, you can walk into a museum and look at a painting that is truly yours. A
                radically public cultural institution.”
            </div>
        </div>
    </>;
}

export default HowItWorks;