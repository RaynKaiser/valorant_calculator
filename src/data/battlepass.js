// Registry of non-purchasable skins in Valorant:
// 1. Battlepass collections (all episodes)
// 2. Free Agent Contract / Agent Gear rewards
// 3. Expired limited-time exclusive skins that will NEVER return to the store / Night Market

export const battlepassCollections = [
  // Episode 1
  'Kingdom', 'Couture', '.EXE', 'Hivemind', 'POLYfox', 'Red Alert', 'Ruin', 'Serenity', 'Surge',
  // Episode 2
  'Infinity', 'Aerosol', 'Outpost', 'Prism III', 'Cavalier', 'Polyfrog', 'Polychem', 'Songsteel', 'Depths', 'Lightwave',
  // Episode 3
  'K/TAC', 'Jigsaw', 'Monarch', 'Nitro', 'Varnish', 'Artisan', 'Aero', 'Genesis', 'Goldwing',
  // Episode 4
  'Velocity', 'Schema', 'Hydrodip', 'Striker', "Lycan's Bane", 'Divine Swine', '.SYS', 'Coalition: Cobra', 'Hue Shift',
  // Episode 5
  'Task Force 809', 'Spitfire', 'Shimmer', 'Piedra del Sol', 'Premiere Collision', 'Immortalized', 'Starlit Epiphany', 'Iridian Thorn', 'Rune Stone',
  // Episode 6
  '9 Lives', 'Gridcrash', 'Venturi', 'Signature', 'Tilde', 'Topotek', 'Bound', 'Digihex', 'Moondash',
  // Episode 7
  'Composite', 'Blush', 'Panorama', 'Panoramic', 'Transition', 'RDVR', 'RetroLA', 'Sandswept', 'Silhouette', 'Libretto', 'Freehand',
  // Episode 8
  'Guardrail', 'Fiber Optic', 'Tactiplay', 'Retrowave', 'Shellspire', 'Aquatica', 'Cloudweaver', 'Comet', 'Tacti-Series',
  // Episode 9
  'Bubble Pop', 'Bumble Brigade', 'Convergence', 'Overlay', 'Frequency', 'Yoonseul', 'Torque', 'Bulletbox', 'Nanobreak',
  // Episode 10 & Recent
  'Hieroscape', 'Moon Scout', 'Interhelm', 'Popmonz', 'Doom Wing', 'Insidious', 'Keepsake', 'Keys to Elysium',
  'Heartbreaker', 'Heartseeker', 'Nanomight', 'SilkLeaf', 'Refractrix', 'Paceline', 'Crash Out', 'Storm Maw', 'Datalink',
  'ATLAS // CMD', 'Belaflaire', 'Byteshift', 'Combat Crafts', 'Dragon Gate', 'Haloform', 'Headbanger', 'Intertwine', 'Jellybeam', 'Kaleidoscope',
  'Monstro'
];

// Free Agent Contract / Agent Gear reward skins (cannot be purchased in the store)
export const agentContractSkins = [
  'Final Chamber', 'Pistinha', 'Finesse', 'Vendetta', 'Resolution', 'Live Wire',
  'Snakebite', 'Wunderkind', 'Karabasan', 'Wayfinder', 'Ragnarocker', 'Swooping Evil',
  'Eclipse', 'Hush', 'Soul Silencer', 'Game Over', 'Peacekeeper', 'Protektor',
  'Death Wish', 'FIRE/arm', 'Grounded', 'Steel Magnolia', 'Flutter', 'Solitude', 'Prowler'
];

// Expired limited-edition skins that are no longer purchasable and never return to the daily store rotation or Night Market
export const expiredLimitedSkins = [
  'Champions 2021',
  'Champions 2022',
  'Champions 2023',
  'Champions 2024',
  'Champions 2025',
  'VCT LOCK//IN',
  'Misericórdia',
  'Ignite Fan',
  'Arcane Sheriff',
  'Arcane Vandal',
  'Arcane Gauntlet',
  '5 Years // Beta Remastered'
];

/**
 * Checks if a skin is non-purchasable (Battlepass, Agent Gear, or Expired Limited)
 */
export const isBattlepassSkin = (skinName) => {
  if (!skinName) return false;
  if (skinName.includes('Standard') || skinName.includes('Random Favorite')) return true;
  
  const lower = skinName.toLowerCase();
  
  // Battlepass filter
  if (battlepassCollections.some(bp => lower.includes(bp.toLowerCase()))) return true;

  // Agent contract reward filter
  if (agentContractSkins.some(ag => lower.includes(ag.toLowerCase()))) return true;

  // Expired limited edition filter
  if (expiredLimitedSkins.some(lim => lower.includes(lim.toLowerCase()))) return true;

  return false;
};
