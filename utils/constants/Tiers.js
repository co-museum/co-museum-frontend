const Tiers = {
    Genesis: {
        Name: 'Genesis',
        Code: 0,
        Rate: 45000,
        Total: 18
    },
    Foundation: {
        Name: 'Foundation',
        Code: 1,
        Rate: 4500,
        Total: 220
    },
    Friend: {
        Name: 'Friend',
        Code: 2,
        Rate: 450,
        Total: 5500
    }
}

export const getTierWithCode = (code) => {
    switch (code) {
        case 0: return Tiers.Genesis;
        case 1: return Tiers.Foundation;
        case 2: return Tiers.Friend;
    }
}

export default Tiers;