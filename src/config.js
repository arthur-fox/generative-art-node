const layersOrder = [
    { name: 'backgrounds', number: 5, chance: 100 },  // 5 in total
    { name: 'classes', number: 5, chance: 100 },      // 5 in total
    { name: 'hairs', number: 52, chance: 100 },       // 52 in total
    { name: 'ears', number: 5, chance: 100 },         // 5 in total
    { name: 'eyes', number: 25, chance: 100 },        // 25 in total    
    { name: 'mouth', number: 18, chance: 100 },       // 18 in total
    { name: 'body', number: 57, chance: 95 },         // 57 in total
    { name: 'cheek blemish', number: 5, chance: 25 }, // 5 in total
    { name: 'earring', number: 8, chance: 30 },       // 8 in total        
]; // NOTE: currently "number" is actually unused

const rarity = [
    { key: "", val: "common", chance: 100 },        // 100 - 31 = 69%
    { key: "_r", val: "rare", chance: 31 },         // 31 - 14 = 17%
    { key: "_e", val: "epic", chance: 14 },         // 14 - 4  = 10%
    { key: "_l", val: "legendary", chance: 4 },     // 4 - 0.5 = 3.5%
    { key: "_m", val: "mythic", chance: 0.5 },      // 0.5 - 0 = 0.5%
    { key: "_u", val: "unique", chance: -1 },        // unique
];

const format = {
  width: 1024,
  height: 1024
};

// const format = {
//   width: 256,
//   height: 256
// };

const metadataDetails = {
  ethereum: "true",
  name: "Sprite Club",
  description: "Sprite Club NFT",
};

// const metadataDetails = {
//   solana: "true",
//   collectionFamily: "Krypto Kronikz",
//   collectionName: "Krypto Kronikz",  
//   symbol: "KK",
//   ownerAddress: "2AjESJhqgfTacCXeJWtxd2kriGkGmbynyD5iRsU56BLR",
//   sellerFeeBasisPoints: 690,
//   url: "https://kryptokronikz.com/",
//   description: "4420 uniquely evolved kronikz have arrived in the Jungles of Solacia! Grown by sweat, blood and algorithm, each Kronikz has its own unique personality.",
// };

const defaultEdition = 2;

const filterByRules = {
  kronikz: 0,
  sprites: 1
};

module.exports = { layersOrder, rarity, format, metadataDetails, defaultEdition, filterByRules };