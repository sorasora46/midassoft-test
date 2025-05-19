function minEnergy(
    start: number,
    shops: number[], // n
    stations: number[], // m
    target: number
): number {
    const seen = new Set();
    var currentPos = start;
    var totalEnergy = 0;
    for (let i = 0; i < shops.length; i++) {
        const shopToGo = shops[i];
        if (seen.has(shopToGo)) {
            continue;
        }
        
        // calculate bus energy
        const busStation = findNearestBusToX(shopToGo, stations);
        const walkToBusE = findWalkingEnergyToX(currentPos, busStation);
        const busToShopE = findWalkingEnergyToX(busStation, shopToGo)
        const takeBusTotalE = walkToBusE + busToShopE;
        
        // calculate walk
        const takeWalkE = findWalkingEnergyToX(currentPos, shopToGo);
        
        // decide to walk or take a bus
        // bus don't cost anything, always take a bus if possible
        totalEnergy += Math.min(takeBusTotalE, takeWalkE);
        currentPos = shopToGo;
        seen.add(shopToGo);
    }
    return totalEnergy;
}

function findNearestBusToX(x: number, stations: number[]): number {
    var min = Number.MAX_SAFE_INTEGER;
    for (let i = 0; i < stations.length; i++) {
        min = Math.min(min, Math.abs(x - stations[i]));
    }
    return min
}

function findWalkingEnergyToX(currentPos: number, x: number): number {
    return Math.abs(x - currentPos);
} 

console.log(minEnergy(2, [4, 9], [3, 6, 8], 7));
