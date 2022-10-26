export async function getRate() {
    const result = await fetch(`https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=BTC,USD,EUR`);
    return await result.json()
}