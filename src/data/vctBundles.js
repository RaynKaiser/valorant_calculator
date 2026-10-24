// Currently Purchasable VCT Bundles (Active in the in-game Esports Store)
// All expired limited-time bundles (Champions 2021-2024, LOCK//IN) are removed.

export const vctSpecialBundles = [
  {
    id: 'vct-team-capsule-generic',
    name: 'VCT Team Capsule (Any Partnered Team)',
    shortName: 'Team Capsule',
    category: 'capsule',
    cost: 2340,
    icon: 'https://media.valorant-api.com/bundles/26333e26-4688-3e1e-3c7c-1ab6bf16ceec/displayicon.png',
    verticalIcon: 'https://media.valorant-api.com/bundles/26333e26-4688-3e1e-3c7c-1ab6bf16ceec/verticalpromoimage.png',
    items: ['Team Classic Skin', 'AR Player Card', 'Gun Buddy', 'Animated Team Spray'],
    tag: 'ACTIVE IN STORE • 2,340 VP'
  }
];

// Active Partnered VCT Teams with their verified official Riot logoIcon URLs (100% tested 200 OK)
export const vctTeamsList = [
  // AMERICAS
  {
    tag: 'SEN',
    name: 'Sentinels',
    region: 'Americas',
    color: '#CE0037',
    logoIcon: 'https://media.valorant-api.com/bundles/6f99303f-4237-9456-0ace-2ab09f0080cb/logoicon.png',
    displayIcon: 'https://media.valorant-api.com/bundles/6f99303f-4237-9456-0ace-2ab09f0080cb/displayicon.png',
    verticalIcon: 'https://media.valorant-api.com/bundles/6f99303f-4237-9456-0ace-2ab09f0080cb/verticalpromoimage.png',
    uuid: '6f99303f-4237-9456-0ace-2ab09f0080cb'
  },
  {
    tag: 'G2',
    name: 'G2 Esports',
    region: 'Americas',
    color: '#EE3D43',
    logoIcon: 'https://media.valorant-api.com/bundles/8d4f45bc-4cda-d92a-e456-71b641ff4070/logoicon.png',
    displayIcon: 'https://media.valorant-api.com/bundles/8d4f45bc-4cda-d92a-e456-71b641ff4070/displayicon.png',
    verticalIcon: 'https://media.valorant-api.com/bundles/8d4f45bc-4cda-d92a-e456-71b641ff4070/verticalpromoimage.png',
    uuid: '8d4f45bc-4cda-d92a-e456-71b641ff4070'
  },
  {
    tag: 'C9',
    name: 'Cloud9',
    region: 'Americas',
    color: '#009BDE',
    logoIcon: 'https://media.valorant-api.com/bundles/9a7767a2-4566-6a2e-7575-40bc4e25df37/logoicon.png',
    displayIcon: 'https://media.valorant-api.com/bundles/9a7767a2-4566-6a2e-7575-40bc4e25df37/displayicon.png',
    verticalIcon: 'https://media.valorant-api.com/bundles/9a7767a2-4566-6a2e-7575-40bc4e25df37/verticalpromoimage.png',
    uuid: '9a7767a2-4566-6a2e-7575-40bc4e25df37'
  },
  {
    tag: 'LEV',
    name: 'Leviatán',
    region: 'Americas',
    color: '#00D1FF',
    logoIcon: 'https://media.valorant-api.com/bundles/e59c0038-44e6-015b-d373-5491703098b9/logoicon.png',
    displayIcon: 'https://media.valorant-api.com/bundles/e59c0038-44e6-015b-d373-5491703098b9/displayicon.png',
    verticalIcon: 'https://media.valorant-api.com/bundles/e59c0038-44e6-015b-d373-5491703098b9/verticalpromoimage.png',
    uuid: 'e59c0038-44e6-015b-d373-5491703098b9'
  },
  {
    tag: '100T',
    name: '100 Thieves',
    region: 'Americas',
    color: '#E02020',
    logoIcon: 'https://media.valorant-api.com/bundles/e3279dbc-4999-4af3-ce43-11bf0fd7a3b8/logoicon.png',
    displayIcon: 'https://media.valorant-api.com/bundles/e3279dbc-4999-4af3-ce43-11bf0fd7a3b8/displayicon.png',
    verticalIcon: 'https://media.valorant-api.com/bundles/e3279dbc-4999-4af3-ce43-11bf0fd7a3b8/verticalpromoimage.png',
    uuid: 'e3279dbc-4999-4af3-ce43-11bf0fd7a3b8'
  },
  {
    tag: 'NRG',
    name: 'NRG',
    region: 'Americas',
    color: '#D0112B',
    logoIcon: 'https://media.valorant-api.com/bundles/74ee7116-48c1-d5a4-9f9c-a7ac9d27ec51/logoicon.png',
    displayIcon: 'https://media.valorant-api.com/bundles/74ee7116-48c1-d5a4-9f9c-a7ac9d27ec51/displayicon.png',
    verticalIcon: 'https://media.valorant-api.com/bundles/74ee7116-48c1-d5a4-9f9c-a7ac9d27ec51/verticalpromoimage.png',
    uuid: '74ee7116-48c1-d5a4-9f9c-a7ac9d27ec51'
  },
  {
    tag: 'LOUD',
    name: 'LOUD',
    region: 'Americas',
    color: '#00FF66',
    logoIcon: 'https://media.valorant-api.com/bundles/39b90f53-4ddc-1b3d-bbe1-a0938770bb58/logoicon.png',
    displayIcon: 'https://media.valorant-api.com/bundles/39b90f53-4ddc-1b3d-bbe1-a0938770bb58/displayicon.png',
    verticalIcon: 'https://media.valorant-api.com/bundles/39b90f53-4ddc-1b3d-bbe1-a0938770bb58/verticalpromoimage.png',
    uuid: '39b90f53-4ddc-1b3d-bbe1-a0938770bb58'
  },
  {
    tag: 'KRÜ',
    name: 'KRÜ Esports',
    region: 'Americas',
    color: '#FF007F',
    logoIcon: 'https://media.valorant-api.com/bundles/c3b86226-4710-67b9-5578-d6907aa35da2/logoicon.png',
    displayIcon: 'https://media.valorant-api.com/bundles/c3b86226-4710-67b9-5578-d6907aa35da2/displayicon.png',
    verticalIcon: 'https://media.valorant-api.com/bundles/c3b86226-4710-67b9-5578-d6907aa35da2/verticalpromoimage.png',
    uuid: 'c3b86226-4710-67b9-5578-d6907aa35da2'
  },
  {
    tag: 'EG',
    name: 'Evil Geniuses',
    region: 'Americas',
    color: '#002B49',
    logoIcon: 'https://media.valorant-api.com/bundles/586bd243-4bf0-eb27-d708-dc9df8b207af/logoicon.png',
    displayIcon: 'https://media.valorant-api.com/bundles/586bd243-4bf0-eb27-d708-dc9df8b207af/displayicon.png',
    verticalIcon: 'https://media.valorant-api.com/bundles/586bd243-4bf0-eb27-d708-dc9df8b207af/verticalpromoimage.png',
    uuid: '586bd243-4bf0-eb27-d708-dc9df8b207af'
  },
  {
    tag: 'MIBR',
    name: 'MIBR',
    region: 'Americas',
    color: '#1B2C4B',
    logoIcon: 'https://media.valorant-api.com/bundles/37f767ec-44f6-820b-fc29-4a905981eab0/logoicon.png',
    displayIcon: 'https://media.valorant-api.com/bundles/37f767ec-44f6-820b-fc29-4a905981eab0/displayicon.png',
    verticalIcon: 'https://media.valorant-api.com/bundles/37f767ec-44f6-820b-fc29-4a905981eab0/verticalpromoimage.png',
    uuid: '37f767ec-44f6-820b-fc29-4a905981eab0'
  },
  {
    tag: 'FUR',
    name: 'FURIA',
    region: 'Americas',
    color: '#FFFFFF',
    logoIcon: 'https://media.valorant-api.com/bundles/4194892b-429e-5654-933d-e4a1a254ea77/logoicon.png',
    displayIcon: 'https://media.valorant-api.com/bundles/4194892b-429e-5654-933d-e4a1a254ea77/displayicon.png',
    verticalIcon: 'https://media.valorant-api.com/bundles/4194892b-429e-5654-933d-e4a1a254ea77/verticalpromoimage.png',
    uuid: '4194892b-429e-5654-933d-e4a1a254ea77'
  },
  {
    tag: '2G',
    name: '2GAME Esports',
    region: 'Americas',
    color: '#E50027',
    logoIcon: 'https://media.valorant-api.com/bundles/dd62df9f-488e-f8b1-5fbf-6b87daf7f635/logoicon.png',
    displayIcon: 'https://media.valorant-api.com/bundles/dd62df9f-488e-f8b1-5fbf-6b87daf7f635/displayicon.png',
    verticalIcon: 'https://media.valorant-api.com/bundles/dd62df9f-488e-f8b1-5fbf-6b87daf7f635/verticalpromoimage.png',
    uuid: 'dd62df9f-488e-f8b1-5fbf-6b87daf7f635'
  },

  // PACIFIC
  {
    tag: 'PRX',
    name: 'Paper Rex',
    region: 'Pacific',
    color: '#2B1A6B',
    logoIcon: 'https://media.valorant-api.com/bundles/90eeb674-4f81-887a-0387-d580f402526f/logoicon.png',
    displayIcon: 'https://media.valorant-api.com/bundles/90eeb674-4f81-887a-0387-d580f402526f/displayicon.png',
    verticalIcon: 'https://media.valorant-api.com/bundles/90eeb674-4f81-887a-0387-d580f402526f/verticalpromoimage.png',
    uuid: '90eeb674-4f81-887a-0387-d580f402526f'
  },
  {
    tag: 'GEN',
    name: 'Gen.G',
    region: 'Pacific',
    color: '#AA8A00',
    logoIcon: 'https://media.valorant-api.com/bundles/199cac9d-4f02-beff-43e3-0c8f539124e0/logoicon.png',
    displayIcon: 'https://media.valorant-api.com/bundles/199cac9d-4f02-beff-43e3-0c8f539124e0/displayicon.png',
    verticalIcon: 'https://media.valorant-api.com/bundles/199cac9d-4f02-beff-43e3-0c8f539124e0/verticalpromoimage.png',
    uuid: '199cac9d-4f02-beff-43e3-0c8f539124e0'
  },
  {
    tag: 'DRX',
    name: 'DRX',
    region: 'Pacific',
    color: '#0A59F8',
    logoIcon: 'https://media.valorant-api.com/bundles/fa9ce754-4ca8-2628-8b3c-828a9a03f62e/logoicon.png',
    displayIcon: 'https://media.valorant-api.com/bundles/fa9ce754-4ca8-2628-8b3c-828a9a03f62e/displayicon.png',
    verticalIcon: 'https://media.valorant-api.com/bundles/fa9ce754-4ca8-2628-8b3c-828a9a03f62e/verticalpromoimage.png',
    uuid: 'fa9ce754-4ca8-2628-8b3c-828a9a03f62e'
  },
  {
    tag: 'T1',
    name: 'T1',
    region: 'Pacific',
    color: '#E2012D',
    logoIcon: 'https://media.valorant-api.com/bundles/8974b152-4480-230c-ee7b-a09bb35859ef/logoicon.png',
    displayIcon: 'https://media.valorant-api.com/bundles/8974b152-4480-230c-ee7b-a09bb35859ef/displayicon.png',
    verticalIcon: 'https://media.valorant-api.com/bundles/8974b152-4480-230c-ee7b-a09bb35859ef/verticalpromoimage.png',
    uuid: '8974b152-4480-230c-ee7b-a09bb35859ef'
  },
  {
    tag: 'ZETA',
    name: 'ZETA DIVISION',
    region: 'Pacific',
    color: '#FFFFFF',
    logoIcon: 'https://media.valorant-api.com/bundles/eb0906e2-459b-bd43-1843-81aa95640f49/logoicon.png',
    displayIcon: 'https://media.valorant-api.com/bundles/eb0906e2-459b-bd43-1843-81aa95640f49/displayicon.png',
    verticalIcon: 'https://media.valorant-api.com/bundles/eb0906e2-459b-bd43-1843-81aa95640f49/verticalpromoimage.png',
    uuid: 'eb0906e2-459b-bd43-1843-81aa95640f49'
  },
  {
    tag: 'TS',
    name: 'Team Secret',
    region: 'Pacific',
    color: '#FFFFFF',
    logoIcon: 'https://media.valorant-api.com/bundles/ffdf6e92-4565-8b67-e5a3-1dab820ce363/logoicon.png',
    displayIcon: 'https://media.valorant-api.com/bundles/ffdf6e92-4565-8b67-e5a3-1dab820ce363/displayicon.png',
    verticalIcon: 'https://media.valorant-api.com/bundles/ffdf6e92-4565-8b67-e5a3-1dab820ce363/verticalpromoimage.png',
    uuid: 'ffdf6e92-4565-8b67-e5a3-1dab820ce363'
  },
  {
    tag: 'RRQ',
    name: 'Rex Regum Qeon',
    region: 'Pacific',
    color: '#FFA500',
    logoIcon: 'https://media.valorant-api.com/bundles/36252577-4694-19b2-4e0d-329a64b73b46/logoicon.png',
    displayIcon: 'https://media.valorant-api.com/bundles/36252577-4694-19b2-4e0d-329a64b73b46/displayicon.png',
    verticalIcon: 'https://media.valorant-api.com/bundles/36252577-4694-19b2-4e0d-329a64b73b46/verticalpromoimage.png',
    uuid: '36252577-4694-19b2-4e0d-329a64b73b46'
  },
  {
    tag: 'DFM',
    name: 'DetonatioN FocusMe',
    region: 'Pacific',
    color: '#00A3E0',
    logoIcon: 'https://media.valorant-api.com/bundles/3257d9a3-47c1-5c3a-ee23-cabcece9bd75/logoicon.png',
    displayIcon: 'https://media.valorant-api.com/bundles/3257d9a3-47c1-5c3a-ee23-cabcece9bd75/displayicon.png',
    verticalIcon: 'https://media.valorant-api.com/bundles/3257d9a3-47c1-5c3a-ee23-cabcece9bd75/verticalpromoimage.png',
    uuid: '3257d9a3-47c1-5c3a-ee23-cabcece9bd75'
  },
  {
    tag: 'GE',
    name: 'Global Esports',
    region: 'Pacific',
    color: '#00529B',
    logoIcon: 'https://media.valorant-api.com/bundles/acfbb3bd-4652-5a2c-4dcf-b49b9159f95c/logoicon.png',
    displayIcon: 'https://media.valorant-api.com/bundles/acfbb3bd-4652-5a2c-4dcf-b49b9159f95c/displayicon.png',
    verticalIcon: 'https://media.valorant-api.com/bundles/acfbb3bd-4652-5a2c-4dcf-b49b9159f95c/verticalpromoimage.png',
    uuid: 'acfbb3bd-4652-5a2c-4dcf-b49b9159f95c'
  },
  {
    tag: 'BOOM',
    name: 'BOOM Esports',
    region: 'Pacific',
    color: '#FFFFFF',
    logoIcon: 'https://media.valorant-api.com/bundles/018125b7-488d-074a-14c5-ee86ac535776/logoicon.png',
    displayIcon: 'https://media.valorant-api.com/bundles/018125b7-488d-074a-14c5-ee86ac535776/displayicon.png',
    verticalIcon: 'https://media.valorant-api.com/bundles/018125b7-488d-074a-14c5-ee86ac535776/verticalpromoimage.png',
    uuid: '018125b7-488d-074a-14c5-ee86ac535776'
  },

  // EMEA
  {
    tag: 'FNC',
    name: 'Fnatic',
    region: 'EMEA',
    color: '#FF5900',
    logoIcon: 'https://media.valorant-api.com/bundles/39dfe85d-4a78-7bc3-b8ee-4981922603ad/logoicon.png',
    displayIcon: 'https://media.valorant-api.com/bundles/39dfe85d-4a78-7bc3-b8ee-4981922603ad/displayicon.png',
    verticalIcon: 'https://media.valorant-api.com/bundles/39dfe85d-4a78-7bc3-b8ee-4981922603ad/verticalpromoimage.png',
    uuid: '39dfe85d-4a78-7bc3-b8ee-4981922603ad'
  },
  {
    tag: 'TH',
    name: 'Team Heretics',
    region: 'EMEA',
    color: '#E5B338',
    logoIcon: 'https://media.valorant-api.com/bundles/033ce27c-45ff-e47d-7cc6-13b5ff5f99f8/logoicon.png',
    displayIcon: 'https://media.valorant-api.com/bundles/033ce27c-45ff-e47d-7cc6-13b5ff5f99f8/displayicon.png',
    verticalIcon: 'https://media.valorant-api.com/bundles/033ce27c-45ff-e47d-7cc6-13b5ff5f99f8/verticalpromoimage.png',
    uuid: '033ce27c-45ff-e47d-7cc6-13b5ff5f99f8'
  },
  {
    tag: 'KC',
    name: 'Karmine Corp',
    region: 'EMEA',
    color: '#1B60D1',
    logoIcon: 'https://media.valorant-api.com/bundles/5e9ecd93-4018-1b4a-bda5-849b19d48e10/logoicon.png',
    displayIcon: 'https://media.valorant-api.com/bundles/5e9ecd93-4018-1b4a-bda5-849b19d48e10/displayicon.png',
    verticalIcon: 'https://media.valorant-api.com/bundles/5e9ecd93-4018-1b4a-bda5-849b19d48e10/verticalpromoimage.png',
    uuid: '5e9ecd93-4018-1b4a-bda5-849b19d48e10'
  },
  {
    tag: 'TL',
    name: 'Team Liquid',
    region: 'EMEA',
    color: '#0F1D38',
    logoIcon: 'https://media.valorant-api.com/bundles/e40e8fa6-46be-63ca-143d-8b958666e753/logoicon.png',
    displayIcon: 'https://media.valorant-api.com/bundles/e40e8fa6-46be-63ca-143d-8b958666e753/displayicon.png',
    verticalIcon: 'https://media.valorant-api.com/bundles/e40e8fa6-46be-63ca-143d-8b958666e753/verticalpromoimage.png',
    uuid: 'e40e8fa6-46be-63ca-143d-8b958666e753'
  },
  {
    tag: 'NAVI',
    name: 'Natus Vincere',
    region: 'EMEA',
    color: '#FFF200',
    logoIcon: 'https://media.valorant-api.com/bundles/816bf0f2-41ca-51e1-ef62-0cad67b72dcd/logoicon.png',
    displayIcon: 'https://media.valorant-api.com/bundles/816bf0f2-41ca-51e1-ef62-0cad67b72dcd/displayicon.png',
    verticalIcon: 'https://media.valorant-api.com/bundles/816bf0f2-41ca-51e1-ef62-0cad67b72dcd/verticalpromoimage.png',
    uuid: '816bf0f2-41ca-51e1-ef62-0cad67b72dcd'
  },
  {
    tag: 'VIT',
    name: 'Team Vitality',
    region: 'EMEA',
    color: '#FFF000',
    logoIcon: 'https://media.valorant-api.com/bundles/23a259d5-4352-a494-dca4-0992c6535a64/logoicon.png',
    displayIcon: 'https://media.valorant-api.com/bundles/23a259d5-4352-a494-dca4-0992c6535a64/displayicon.png',
    verticalIcon: 'https://media.valorant-api.com/bundles/23a259d5-4352-a494-dca4-0992c6535a64/verticalpromoimage.png',
    uuid: '23a259d5-4352-a494-dca4-0992c6535a64'
  },
  {
    tag: 'FUT',
    name: 'FUT Esports',
    region: 'EMEA',
    color: '#E4002B',
    logoIcon: 'https://media.valorant-api.com/bundles/7ed6f99d-4354-23bd-fc39-05a555baf8e2/logoicon.png',
    displayIcon: 'https://media.valorant-api.com/bundles/7ed6f99d-4354-23bd-fc39-05a555baf8e2/displayicon.png',
    verticalIcon: 'https://media.valorant-api.com/bundles/7ed6f99d-4354-23bd-fc39-05a555baf8e2/verticalpromoimage.png',
    uuid: '7ed6f99d-4354-23bd-fc39-05a555baf8e2'
  },
  {
    tag: 'BBL',
    name: 'BBL Esports',
    region: 'EMEA',
    color: '#FF7F00',
    logoIcon: 'https://media.valorant-api.com/bundles/df9b2709-4313-bf13-f78b-8eb7b59f9a28/logoicon.png',
    displayIcon: 'https://media.valorant-api.com/bundles/df9b2709-4313-bf13-f78b-8eb7b59f9a28/displayicon.png',
    verticalIcon: 'https://media.valorant-api.com/bundles/df9b2709-4313-bf13-f78b-8eb7b59f9a28/verticalpromoimage.png',
    uuid: 'df9b2709-4313-bf13-f78b-8eb7b59f9a28'
  },
  {
    tag: 'GX',
    name: 'GIANTX',
    region: 'EMEA',
    color: '#00E5FF',
    logoIcon: 'https://media.valorant-api.com/bundles/ec66d54c-4173-aa25-bcb9-72aef63656d5/logoicon.png',
    displayIcon: 'https://media.valorant-api.com/bundles/ec66d54c-4173-aa25-bcb9-72aef63656d5/displayicon.png',
    verticalIcon: 'https://media.valorant-api.com/bundles/ec66d54c-4173-aa25-bcb9-72aef63656d5/verticalpromoimage.png',
    uuid: 'ec66d54c-4173-aa25-bcb9-72aef63656d5'
  },

  // CHINA
  {
    tag: 'EDG',
    name: 'EDward Gaming',
    region: 'China',
    color: '#E4002B',
    logoIcon: 'https://media.valorant-api.com/bundles/ed72e317-43ce-1dac-2176-1287b372c657/logoicon.png',
    displayIcon: 'https://media.valorant-api.com/bundles/ed72e317-43ce-1dac-2176-1287b372c657/displayicon.png',
    verticalIcon: 'https://media.valorant-api.com/bundles/ed72e317-43ce-1dac-2176-1287b372c657/verticalpromoimage.png',
    uuid: 'ed72e317-43ce-1dac-2176-1287b372c657'
  },
  {
    tag: 'BLG',
    name: 'Bilibili Gaming',
    region: 'China',
    color: '#00A1D6',
    logoIcon: 'https://media.valorant-api.com/bundles/da157e17-4a4f-3620-6122-2b8c7850c1b4/logoicon.png',
    displayIcon: 'https://media.valorant-api.com/bundles/da157e17-4a4f-3620-6122-2b8c7850c1b4/displayicon.png',
    verticalIcon: 'https://media.valorant-api.com/bundles/da157e17-4a4f-3620-6122-2b8c7850c1b4/verticalpromoimage.png',
    uuid: 'da157e17-4a4f-3620-6122-2b8c7850c1b4'
  },
  {
    tag: 'FPX',
    name: 'FunPlus Phoenix',
    region: 'China',
    color: '#E20613',
    logoIcon: 'https://media.valorant-api.com/bundles/ad5e5824-4f9d-3ed9-2362-df847a3b6da4/logoicon.png',
    displayIcon: 'https://media.valorant-api.com/bundles/ad5e5824-4f9d-3ed9-2362-df847a3b6da4/displayicon.png',
    verticalIcon: 'https://media.valorant-api.com/bundles/ad5e5824-4f9d-3ed9-2362-df847a3b6da4/verticalpromoimage.png',
    uuid: 'ad5e5824-4f9d-3ed9-2362-df847a3b6da4'
  },
  {
    tag: 'TE',
    name: 'Trace Esports',
    region: 'China',
    color: '#00D1B2',
    logoIcon: 'https://media.valorant-api.com/bundles/b4333535-4e41-225d-6693-8296bb6260e2/logoicon.png',
    displayIcon: 'https://media.valorant-api.com/bundles/b4333535-4e41-225d-6693-8296bb6260e2/displayicon.png',
    verticalIcon: 'https://media.valorant-api.com/bundles/b4333535-4e41-225d-6693-8296bb6260e2/verticalpromoimage.png',
    uuid: 'b4333535-4e41-225d-6693-8296bb6260e2'
  },
  {
    tag: 'JDG',
    name: 'JD Gaming',
    region: 'China',
    color: '#D4002A',
    logoIcon: 'https://media.valorant-api.com/bundles/9686e843-438f-4fcb-6006-5ebe9f57bd2b/logoicon.png',
    displayIcon: 'https://media.valorant-api.com/bundles/9686e843-438f-4fcb-6006-5ebe9f57bd2b/displayicon.png',
    verticalIcon: 'https://media.valorant-api.com/bundles/9686e843-438f-4fcb-6006-5ebe9f57bd2b/verticalpromoimage.png',
    uuid: '9686e843-438f-4fcb-6006-5ebe9f57bd2b'
  },
  {
    tag: 'WOL',
    name: 'Wolves Esports',
    region: 'China',
    color: '#FDB913',
    logoIcon: 'https://media.valorant-api.com/bundles/0dc9affa-4ede-c55c-c768-7395a2f94a1d/logoicon.png',
    displayIcon: 'https://media.valorant-api.com/bundles/0dc9affa-4ede-c55c-c768-7395a2f94a1d/displayicon.png',
    verticalIcon: 'https://media.valorant-api.com/bundles/0dc9affa-4ede-c55c-c768-7395a2f94a1d/verticalpromoimage.png',
    uuid: '0dc9affa-4ede-c55c-c768-7395a2f94a1d'
  },
  {
    tag: 'AG',
    name: 'All Gamers',
    region: 'China',
    color: '#C8102E',
    logoIcon: 'https://media.valorant-api.com/bundles/6c49147d-48f4-1cf7-a652-ef87fbe1eae4/logoicon.png',
    displayIcon: 'https://media.valorant-api.com/bundles/6c49147d-48f4-1cf7-a652-ef87fbe1eae4/displayicon.png',
    verticalIcon: 'https://media.valorant-api.com/bundles/6c49147d-48f4-1cf7-a652-ef87fbe1eae4/verticalpromoimage.png',
    uuid: '6c49147d-48f4-1cf7-a652-ef87fbe1eae4'
  },
  {
    tag: 'DRG',
    name: 'Dragon Ranger Gaming',
    region: 'China',
    color: '#008080',
    logoIcon: 'https://media.valorant-api.com/bundles/d0be9f56-47a5-5942-84a7-3cba734e9e44/logoicon.png',
    displayIcon: 'https://media.valorant-api.com/bundles/d0be9f56-47a5-5942-84a7-3cba734e9e44/displayicon.png',
    verticalIcon: 'https://media.valorant-api.com/bundles/d0be9f56-47a5-5942-84a7-3cba734e9e44/verticalpromoimage.png',
    uuid: 'd0be9f56-47a5-5942-84a7-3cba734e9e44'
  }
];

export const getTeamCapsuleBundle = (team) => ({
  name: `VCT x ${team.tag} Capsule (${team.name})`,
  cost: 2340,
  tierName: 'VCT Capsule',
  icon: team.displayIcon || `https://media.valorant-api.com/bundles/${team.uuid}/displayicon.png`,
  logoIcon: team.logoIcon,
  verticalIcon: team.verticalIcon,
  isVCT: true,
  team: team
});
