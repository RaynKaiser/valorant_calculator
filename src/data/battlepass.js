export const battlepassCollections = [
  'Kingdom', 'Hivemind', 'Red Alert', 'Polyfox', 'Ruin', 'Serenity', 'Surge',
  'Infinity', 'Aerosol', 'Outpost', 'Prism III', 'Cavalier', 'Polychem', 'Depths', 'Lightwave', 'Songsteel',
  'K/TAC', 'Monstro', 'Jigsaw', 'Artisan', 'Nitro', 'Varnish', 'Hydrodip', 'Velocity', 'Schema', 'Striker',
  'Lycan\'s Bane', 'Divine Swine', 'Hue Shift', 'Sys', 'Coalition: Cobra', 'Task Force 809', 'Spitfire', 'Shimmer',
  'Piedra del Sol', 'Premiere Collision', 'Immortalized', 'Starlit Epiphany', 'Iridian Thorn', 'Rune Stone', 'Signature',
  'Venturi', 'Gridcrash', 'Tilde', 'Moondash', 'Bound', 'Digihex', 'Composite', 'Daydreams', 'Freehand',
  'Silhouette', 'Transition', 'Panoramic', 'Sandswept', 'Guardrail', 'Fiber Optic', 'Aquatica', 'Retrowave',
  'Shellspire', 'Comet', 'Cloudweaver'
];

export const isBattlepassSkin = (skinName) => {
  return battlepassCollections.some(bp => skinName.includes(bp)) || skinName.includes('Standard') || skinName.includes('Random');
};
