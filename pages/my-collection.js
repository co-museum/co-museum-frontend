import {Button,} from "@mui/material";
import {useEffect, useState} from "react";
import {MyCollectionPageState, MyCollectionPageStates} from "../utils/constants/my-collection-page-state";
import MyCollectionConnectedWallet from "../utils/components/pages/my-collection/MyCollectionConnectedWallet";
import MyCollectionPreConnectedWallet from "../utils/components/pages/my-collection/MyCollectionPreConnectedWallet";
import MyCollectionZeroState from "../utils/components/pages/my-collection/MyCollectionZeroState";
import {useSelector} from "react-redux";
import {getClientProof} from "../services/base/SettingsService";
import {getTierWithCode} from "../utils/constants/Tiers";
import {getNFTs} from "../services/crowdsale/AllowanceCrowdsale";

const MyCollection = () => {

    const [pageState, setPageState] = useState(MyCollectionPageState.PRE_CONNECTED_WALLET);
    const wallet = useSelector((state) => state.wallet)
    const [clientSettings, setClientSettings] = useState(null)
    const [nfts, setNfts] = useState([])

    useEffect(() => {
        if(wallet.address) {
            getClientProof(wallet.address).then(response => {
                setClientSettings(response)
            })

            getNFTs(wallet.address).then(response => {
                setNfts(response.ownedNfts ? response.ownedNfts : [])

            })
        }

    }, [wallet])

    const data = {
        username: '@CrypticCowboy31337',
        valueUSD: 230609.54,
        valueETH: 119.3078,
        currency: '$',
        tier: 'Genesis Member',
        date: new Date('2022-10-31'),
        numberOfNFT: 4
    }
    const item = {
        owner: 'Banksy',
        title: 'Laugh now',
        year: 2003,
        description: 'Now synonymous with the name Banksy, the dejected, stencilled monkey of Laugh Now (2003) has become a key motif in the artist’s oeuvre.',
        totalTokens: 24052,
        currentArtworkValueUSD: 10129284.13,
        currency: '$',
        currentArtworkValueETH: 9374.5392,
        tokenPrice: 4.53,
    }

    const items = [
        {title: 'Genesis Member', item: 'Laugh now', id: 5890, img: '/images/tier-3.png'},
        {title: 'Foundation Member', item: 'Laugh now', id: 8483, img: '/images/tier-2.png'},
        {title: 'Member', item: 'Laugh now', id: 1234, img: '/images/tier-4.jpeg'},
        {title: 'Random Member', item: 'Laugh now', id: 5135, img: '/images/tier-1.png'},
    ]

    const notConnected = (wallet) => {
        return !wallet || !wallet.address;
    }

    const hasAllocation = (clientSettings) => {
        if(!clientSettings || !clientSettings.allocation) {
            return false
        }

        const tier = getTierWithCode(parseInt(clientSettings.tiercode))
        if(!tier) {
            return false
        }

        const numberOfAllocations = clientSettings.allocation / tier.Rate

        return numberOfAllocations >= 1
    }

    return <div className={'container my-collection-page'}>
        {
            (notConnected(wallet)) && <MyCollectionPreConnectedWallet/>
        }
        {
            nfts.length === 0 && !hasAllocation(clientSettings) && <MyCollectionZeroState/>
        }
        {
            nfts.length === 0 &&
            <MyCollectionConnectedWallet items={items} item={item} data={data} noNft clientSettings={clientSettings}/>
        }
        {
            nfts.length !== 0 &&
            <MyCollectionConnectedWallet items={items} item={item} data={data} nfts={nfts} clientSettings={clientSettings}/>
        }
    </div>;
}

export default MyCollection;