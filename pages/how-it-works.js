import {Divider, Grid, Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
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
                if(rect.top >= 0 && rect.top < 150) {
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
        {link: '/how-it-works#the-terminology', title: strings.howToWorks.theTerminology},
        {link: '/how-it-works#what-makes-us-different', title: strings.howToWorks.whatMakesUsDifferent},
        {link: '/how-it-works#membership-tiers', title: strings.howToWorks.membershipTiers},
    ]

    const items = [
        {price: 400, image: "/images/tier-1.png", title: 'Member', features: ['Access to freeport +1 guest', 'Access to IRL events', 'Access to collectibles + merch']},
        {price: 4000, image: "/images/tier-2.png", title: 'Foundation Member', features: ['1 to 1 token allocation for next drop', 'Access to our exhibit on preview day']},
        {price: 40000, image: "/images/tier-3.png", title: 'Genesis Member', features: ['Access to Genesis Membership group', 'Access to galleries and artists', '1 to 1 token allocation for next 3 drops']}
    ]


    const groups = [
        {name: 'ERC20', value: 'Standard for fungible tokens: i.e. property that makes each token be exactly the same (in type and value) of another token'},
        {name: 'ERC721', value: 'Standard for representing ownership of non-fungible tokens, where each token is unique'},
        {name: 'ERC1155', value: 'Standard interface for contracts that manage multiple token types (combination of fungible + non-fungible) that is gas efficient'},
        {name: 'Liquidity Bootstrapping Protocol (LBP)', value: 'Standard interface for contracts that manage multiple token types (combination of fungible + non-fungible) that is gas efficient'},
        {name: 'Flash Buyout', value: 'Mechanism to buyout original NFT at a predetermined buyout multiplier, whereby every token holder can burn their tokens in exchange for their share of the buyout proceeds.'},
        {name: 'Spectre', value: 'Permissionless and modular NFT protocol dedicated to ‘spectralizing’ NFTs: i.e. turning ERC721s into ERC20s.'},
    ]

    return <><div className={'container p-0 m-0'} key={'how-it-works'} id='how-it-works'>
        <Grid container>
            <Grid item xs={12} md={6} className={'bg-green d-flex center-flex d-column'}>
                <div>
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
                    <p key={'link-'+index} className={'font-16 page-states '+ (link.link === hashUrl? 'active': '')}>
                        <Link onClick={() => setHashUrl(link.link)} href={link.link}><span className={'pr-24px'}>0{index+1}</span> <span>{link.title}</span> <span className={'float-right'}>{characters.to}</span></Link>
                    </p>)}
            </div>

            <div className="how-it-works-content">
                <div  id={'introduction'}>
                    <div className={'font-20 introduction-title'}><span className={'font-12 pr-24px'}>01</span> Introduction</div>
                    <div className={'font-16 font-grey text'}>We want to democratise access to a $ 1.7 trillion asset class, both as a social good and an investment opportunity. Collecting art is prohibitively expensive, with access and price both functioning as high barriers to entry. The art market is the largest unregulated market and dominated by information asymmetry. Paintings are illiquid, physical assets that are inefficiently bought, sold, traded, and stored. Artists / artist estates do not participate in the upside of secondary market sales. Art is a social good but the majority masterpieces are stored away from the public eye.</div>
                    <div className="image"/>
                </div>
                <Divider className={'section-divider'}/>
                <div id={'the-process'}>
                    <div className="image"/>
                    <div className={'text'}>
                        <span className={'font-20'}><span className={'font-12 pr-24px'}>02</span> The Process</span>
                        <div className={'font-16 font-grey'}>
                            <p className={'d-flex'}><div className={'font-12 pr-24px'}>I</div> <div>We select and acquire works by blue-chip artists that we believe are commercially and critically significant.</div></p>
                            <p className={'d-flex'}><div className={'font-12 pr-24px'}>II</div> <div>We convert the painting’s title deed into an NFT (ERC721). Then, we mint ERC20 tokens backed by the NFT to create a fully liquid and permissionless art market.</div></p>
                            <p className={'d-flex'}><div className={'font-12 pr-24px'}>III</div> <div>Transaction fees are a proxy for royalties, to be disbursed to artists and/or artist estates.</div></p>
                            <p className={'d-flex'}><div className={'font-12 pr-24px'}>IV</div> <div>Token holders will enjoy membership in Co-Museum, which includes viewing rights at Le Freeport and exhibitions around the world.</div></p>
                            <p className={'d-flex'}><div className={'font-12 pr-24px'}>V</div> <div>We incentivise collective ownership with the optionality for private acquisition via a flash buyout mechanism.</div></p>
                        </div>
                    </div>
                </div>
                <Divider className={'section-divider'}/>
                <div id={'the-terminology'}>
                    <div className={'text'}>
                        <span className={'font-20'}><span className={'font-12 pr-24px'}>03</span> The Terminology</span>
                        <div className={'font-16 font-grey'}>
                            <div>
                                Proin pharetra porttitor est vitae aliquam. Donec massa eros, malesuada ut quam at, accumsan commodo dui. Aenean vel fermentum felis. Nulla eros sem, suscipit ac blandit sed, fringilla quis tortor. Fusce pharetra a nisl eu ultrices. Nam lacinia condimentum ex et ultrices. Suspendisse purus ipsum, iaculis euismod leo at, cursus lacinia turpis. Nam vehicula ac tellus eu cursus.
                            </div>
                        </div>
                    </div>
                    <div className={'ml-152px'}>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell className={'font-16 font-black'}>Teams</TableCell>
                                        <TableCell className={'font-16 font-black'}>Definition</TableCell>
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

                    </div>

                </div>
                <Divider className={'section-divider'}/>
                <div id={'what-makes-us-different'}>
                    <div className={'text'}>
                        <span className={'font-20'}><span className={'font-12 pr-24px'}>04</span> What Makes Us Different</span>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <div className="font-16 font-grey mt-1">
                                    Liquid NFTs function like well-diversified granular portfolios, whereby every wallet becomes a museum of sorts. Every user — art enthusiast, collector, and institutional investor seeking diversification — can gain investment exposure to the high-end art market using a token-based derivatives instrument. Each painting will have a digitally-native community with utility and governance rights. We are building a radically new platform to collect and manage your art collection: artwork and artist info; buy/sell/swap functions; community sentiment; Discord integration.
                                </div>

                            </Grid>
                            <Grid item xs={12} md={6}>
                                <div className="font-16 font-grey mt-1">
                                    In nec elementum elit. Vestibulum in leo volutpat, lacinia mi et, mollis massa. Aenean ut tortor eu purus auctor mollis ut ac felis. Mauris sit amet mauris et lectus feugiat bibendum. Quisque lacinia quam vitae nisi malesuada hendrerit. In neque mauris, pharetra ut lorem vitae, tristique laoreet metus. Etiam justo tellus, pellentesque sit amet ante ut, faucibus volutpat neque. Proin ullamcorper dolor a velit blandit varius. Etiam consectetur tristique enim in consequat. Nullam non lacus iaculis, auctor massa sed, venenatis arcu. Pellentesque risus neque, porttitor at dignissim feugiat, venenatis vel diam. Sed eleifend libero et diam volutpat, quis iaculis augue porttitor. Sed et elit varius, interdum.
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </div>
                <Divider className={'section-divider'}/>
                <div id={'membership-tiers'}>
                    <span className="font-20"><span className={'font-12 pr-24px'}>05</span> Membership Tiers</span>
                    <div className="membership-items" key={'membership-items'}>
                        {items.map((item, index) => <div className="membership-item-container">
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
                                        <div className={'font-12 font-grey membership-content'}>
                                            {item.features.map(feature => <p>{feature}</p>)}
                                        </div>
                                    </div>
                                </div>
                                <div className={'font-16 font-grey item-description'}>
                                    {item.text}
                                </div>
                            </div>
                        )}
                    </div>

                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <div className="font-16 font-grey mt-1">
                                Liquid NFTs function like well-diversified granular portfolios, whereby every wallet becomes a museum of sorts. Every user — art enthusiast, collector, and institutional investor seeking diversification — can gain investment exposure to the high-end art market using a token-based derivatives instrument. Each painting will have a digitally-native community with utility and governance rights. We are building a radically new platform to collect and manage your art collection: artwork and artist info; buy/sell/swap functions; community sentiment; Discord integration.
                            </div>

                        </Grid>
                        <Grid item xs={12} md={6}>
                            <div className="font-16 font-grey mt-1">
                                In nec elementum elit. Vestibulum in leo volutpat, lacinia mi et, mollis massa. Aenean ut tortor eu purus auctor mollis ut ac felis. Mauris sit amet mauris et lectus feugiat bibendum. Quisque lacinia quam vitae nisi malesuada hendrerit. In neque mauris, pharetra ut lorem vitae, tristique laoreet metus. Etiam justo tellus, pellentesque sit amet ante ut, faucibus volutpat neque. Proin ullamcorper dolor a velit blandit varius. Etiam consectetur tristique enim in consequat. Nullam non lacus iaculis, auctor massa sed, venenatis arcu. Pellentesque risus neque, porttitor at dignissim feugiat, venenatis vel diam. Sed eleifend libero et diam volutpat, quis iaculis augue porttitor. Sed et elit varius, interdum.
                            </div>
                        </Grid>
                    </Grid>

                    <div className="image"/>
                </div>
            </div>
        </div>
    </div>
    <div className={'box-silver d-flex center-flex mt-2 quote-container'}>
        <div className={'font-20 quote'}>
            “Co-Museum is a new paradigm in art collecting: liquid, dynamic, and community-driven. We are unlocking a multi-trillion dollar asset class to bring ownership of masterpieces back into the hands of the public. For the first time, you can walk into a museum and look at a painting that is truly yours. A radically public cultural institution.”
        </div>
    </div>
    </>;
}

export default HowItWorks;