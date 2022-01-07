const layersOrder = [
    { name: 'background', number: 39, chance: 100 },  // 39 in total
    { name: 'back bling', number: 4, chance: 100 },    // 4 in total
    { name: 'body', number: 14, chance: 100 },         // 14 in total
    { name: 'pet', number: 9, chance: 100 },           // 9 in total
    { name: 'neckwear', number: 3, chance: 100 },      // 3 in total
    { name: 'mouth', number: 29, chance: 100 },        // 29 in total
    { name: 'right hand', number: 21, chance: 100 },   // 21 in total
    { name: 'left hand', number: 21, chance: 100 },    // 21 in total
    { name: 'hat', number: 16, chance: 100 },          // 16 in total
    { name: 'eyes', number: 29, chance: 100 },         // 29 in total
    { name: 'stoned eyes', number: 14, chance: 100 },  // 14 in total
    { name: 'mask', number: 5, chance: 70 },           // 5 in total
    { name: 'effect', number: 8, chance: 100 },        // 8 in total
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
  width: 2048,
  height: 2048
};

// const format = {
//   width: 256,
//   height: 256
// };

const metadataDetails = {
  collectionFamily: "Krypto Kronikz",
  collectionName: "Krypto Kronikz",  
  symbol: "KK",
  ownerAddress: "2AjESJhqgfTacCXeJWtxd2kriGkGmbynyD5iRsU56BLR",
  sellerFeeBasisPoints: 690,
  url: "https://kryptokronikz.com/",
  description: "4420 uniquely evolved kronikz have arrived in the Jungles of Solacia! Grown by sweat, blood and algorithm, each Kronikz has its own unique personality.",
};

const defaultEdition = 2;

module.exports = { layersOrder, rarity, format, metadataDetails, defaultEdition };