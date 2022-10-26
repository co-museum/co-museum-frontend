export async function getOpenSeaCollectionStats(slug = 'bored-ape-bros') {
    const result = await fetch(`https://api.opensea.io/api/v1/collection/${slug}/stats`);
    return await result.json()
}