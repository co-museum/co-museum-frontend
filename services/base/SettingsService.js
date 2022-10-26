
export async function getSaleSettings() {
    const result = await fetch(`${process.env.NEXT_PUBLIC_API}/api/client/sale`);
    return await result.json()
}

export async function getClientProof(address) {
    const result = await fetch(`${process.env.NEXT_PUBLIC_API}/api/client/proof/${address}` );
    return await result.json()
}