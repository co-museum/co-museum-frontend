import {Button,} from "@mui/material";
import {useState} from "react";
import {MyCollectionPageState, MyCollectionPageStates} from "../utils/constants/my-collection-page-state";
import MyCollectionConnectedWallet from "../utils/components/pages/my-collection/MyCollectionConnectedWallet";
import MyCollectionPreConnectedWallet from "../utils/components/pages/my-collection/MyCollectionPreConnectedWallet";
import MyCollectionZeroState from "../utils/components/pages/my-collection/MyCollectionZeroState";

const MyCollection = () => {

    const [pageState, setPageState] = useState(MyCollectionPageState.PRE_CONNECTED_WALLET);

    const data = {
        username: '@CrypticCowboy31337',
        valueUSD: 230609.54,
        valueETH: 119.3078,
        currency: '$',
        tier: 'Genesis Member',
        date: new Date('2021-11-21'),
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

    return <div className={'container my-collection-page'}>
        {
            MyCollectionPageStates.map(state => <Button key={'state-'+state} onClick={() => setPageState(MyCollectionPageState[state])}>{state}</Button>)
        }
        {
            pageState === MyCollectionPageState.PRE_CONNECTED_WALLET && <MyCollectionPreConnectedWallet/>
        }
        {
            pageState === MyCollectionPageState.ZERO_STATE && <MyCollectionZeroState/>
        }
        {
            pageState === MyCollectionPageState.NO_NFT && <MyCollectionConnectedWallet items={items} item={item} data={data} noNft/>
        }
        {
            pageState === MyCollectionPageState.CONNECTED_WALLET && <MyCollectionConnectedWallet items={items} item={item} data={data}/>
        }
    </div>;
}

export default MyCollection;