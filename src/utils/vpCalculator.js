export function calculateBestVPPacks(targetVP, regionPacks) {
  if (targetVP <= 0) return { combination: [], totalVP: 0, totalCost: 0 };

  const maxPackVP = Math.max(...regionPacks.map(p => p.vp));
  const maxPossibleVP = targetVP + maxPackVP;
  
  // Epsilon is a tiny penalty per transaction (1% of the cheapest pack).
  // This smoothly solves instances where Riot's rounding (e.g. 4.99 vs 5.00) 
  // causes 5 small packs to be 1 cent cheaper than 2 large packs, while
  // ensuring we recommend the most practically efficient route.
  const minPackCost = Math.min(...regionPacks.map(p => p.cost));
  const epsilon = minPackCost * 0.01;
  
  const dpCost = new Array(maxPossibleVP + 1).fill(Infinity);
  const dpPacks = new Array(maxPossibleVP + 1).fill(Infinity);
  const choice = new Array(maxPossibleVP + 1).fill(null);
  
  dpCost[0] = 0;
  dpPacks[0] = 0;
  
  for (let i = 0; i <= maxPossibleVP; i++) {
    if (dpCost[i] === Infinity) continue;
    
    for (const pack of regionPacks) {
      const nextVP = i + pack.vp;
      if (nextVP <= maxPossibleVP) {
        const newCost = dpCost[i] + pack.cost;
        const newPacks = dpPacks[i] + 1;
        
        const currentScore = dpCost[nextVP] === Infinity ? Infinity : dpCost[nextVP] + dpPacks[nextVP] * epsilon;
        const newScore = newCost + newPacks * epsilon;
        
        if (newScore < currentScore - 1e-9) {
          dpCost[nextVP] = newCost;
          dpPacks[nextVP] = newPacks;
          choice[nextVP] = pack;
        }
      }
    }
  }
  
  let bestVP = -1;
  let bestScore = Infinity;
  let finalCost = Infinity;
  
  for (let i = targetVP; i <= maxPossibleVP; i++) {
    if (dpCost[i] === Infinity) continue;
    
    const score = dpCost[i] + dpPacks[i] * epsilon;
    
    if (score < bestScore - 1e-9) {
      bestScore = score;
      bestVP = i;
      finalCost = dpCost[i];
    } else if (Math.abs(score - bestScore) < 1e-9) {
      bestScore = score;
      bestVP = i;
      finalCost = dpCost[i];
    }
  }
  
  const combination = [];
  let currentVP = bestVP;
  while (currentVP > 0) {
    const pack = choice[currentVP];
    if (!pack) break;
    combination.push(pack);
    currentVP -= pack.vp;
  }
  
  const packCounts = {};
  combination.forEach(pack => {
    packCounts[pack.vp] = (packCounts[pack.vp] || 0) + 1;
  });
  
  const formattedCombination = Object.entries(packCounts).map(([vp, count]) => {
    const pack = regionPacks.find(p => p.vp === parseInt(vp));
    return {
      vp: parseInt(vp),
      cost: pack.cost,
      count: count
    };
  }).sort((a, b) => b.vp - a.vp);
  
  return {
    combination: formattedCombination,
    totalVP: bestVP,
    totalCost: finalCost
  };
}
