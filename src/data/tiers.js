export const tierCosts = {
  // Select Edition (Blue)
  '12683d76-48d7-84a3-4e09-6985794f0445': { 
    name: 'Select', 
    cost: 875, 
    gunCost: 875, 
    meleeCost: 1750, 
    color: '#5a9fe6',
    badgeClass: 'tier-select'
  },
  // Deluxe Edition (Green)
  '0cebb8be-46d7-c12a-d306-e9907bfc5a25': { 
    name: 'Deluxe', 
    cost: 1275, 
    gunCost: 1275, 
    meleeCost: 2550, 
    color: '#2ecc71',
    badgeClass: 'tier-deluxe'
  },
  // Premium Edition (Pink)
  '60bca009-4182-7998-dee7-b8a2558dc369': { 
    name: 'Premium', 
    cost: 1775, 
    gunCost: 1775, 
    meleeCost: 3550, 
    color: '#d946ef',
    badgeClass: 'tier-premium'
  },
  // Exclusive Edition (Orange)
  'e046854e-406c-37f4-6607-19a9ba8426fc': { 
    name: 'Exclusive', 
    cost: 2175, 
    gunCost: 2175, 
    meleeCost: 4350, 
    color: '#f97316',
    badgeClass: 'tier-exclusive'
  },
  // Ultra Edition (Yellow)
  '411e4a55-4e59-7757-41f0-86a53f101bb5': { 
    name: 'Ultra', 
    cost: 2475, 
    gunCost: 2475, 
    meleeCost: 4950, 
    color: '#eab308',
    badgeClass: 'tier-ultra'
  }
};

// Explicit price overrides for skinlines with unique store pricing
export const specificSkinOverrides = {
  // Kuronami
  'kuronami no yaiba': 5350,
  'kuronami vandal': 2375,
  'kuronami sheriff': 2375,
  'kuronami marshal': 2375,
  'kuronami spectre': 2375,

  // Spectrum (Zedd)
  'spectrum classic': 2675,
  'spectrum bulldog': 2675,
  'spectrum guardian': 2675,
  'spectrum phantom': 2675,
  'waveform': 5350,

  // Radiant Entertainment System (RES)
  'radiant entertainment system phantom': 2975,
  'radiant entertainment system ghost': 2975,
  'radiant entertainment system operator': 2975,
  'radiant entertainment system power fist': 5950,
  'power fist': 5950,

  // Champions & Esports Event Cosmetics
  'champions 2021 vandal': 2675,
  'champions 2021 karambit': 5350,
  'champions 2022 phantom': 2675,
  'champions 2022 butterfly knife': 5350,
  'champions 2023 vandal': 2675,
  'champions 2023 kunai': 5350,
  'champions 2024 phantom': 2675,
  'champions 2024 blade': 5350,
  'vct lock//in misericórdia': 5440,
  'misericórdia': 5440,
  'ignite fan': 4710,

  // Special Melees
  'nocturnum scythe': 5350,
  "evori's spellcaster": 4950,
  "evori's spellcasters": 4950,

  // Arcane Collections
  'arcane sheriff': 2375,
  'arcane vandal': 2375,
  'arcane gauntlet': 4350
};

export const getSkinCost = (skinName, contentTierUuid, isMelee = false) => {
  const lowerName = (skinName || '').toLowerCase();
  
  // Check specific override first
  for (const [key, price] of Object.entries(specificSkinOverrides)) {
    if (lowerName.includes(key)) {
      return price;
    }
  }

  const tier = tierCosts[contentTierUuid];
  if (!tier) return isMelee ? 3550 : 1775;

  return isMelee ? tier.meleeCost : tier.gunCost;
};
