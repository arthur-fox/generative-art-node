const layersOrder = [
    { name: 'background', number: 100, chance: 100 },  
    { name: 'back bling', number: 100, chance: 100 },  
    { name: 'body', number: 100, chance: 100 },        
    { name: 'pet', number: 100, chance: 100 },         
    { name: 'neckwear', number: 100, chance: 100 },    
    { name: 'mouth', number: 100, chance: 100 },       
    { name: 'right hand', number: 100, chance: 100 },  
    { name: 'left hand', number: 100, chance: 100 },   
    { name: 'hat', number: 100, chance: 100 },         
    { name: 'eyelids', number: 100, chance: 100 }, 
    { name: 'eyes', number: 100, chance: 100 },        
    { name: 'mask', number: 100, chance: 100 },
    { name: 'effect', number: 100, chance: 100 },      
]; // NOTE: currently "number" is actually unused

const rarity = [

  { key: "", val: "common", chance: 100 },        // 69%

  // { key: "_c", val: "common", chance: 69 },        // 69%
  // { key: "_r", val: "rare", chance: 17 },          // 17%
  // { key: "_e", val: "epic", chance: 10 },          // 10%
  // { key: "_l", val: "legendary", chance: 3.5 },    // 3.5%
  // { key: "_m", val: "mythic", chance: 0.5 },       // 0.5%
];

// const format = {
//   width: 2048,
//   height: 2048
// };

const format = {
  width: 256,
  height: 256
};

const metadataDetails = {
  chain: "Solana",
  collectionFamily: "Krypto Kronikz",
  collectionName: "Kronikz Kweenz",  
  symbol: "KKF",
  ownerAddress: "2AjESJhqgfTacCXeJWtxd2kriGkGmbynyD5iRsU56BLR",
  sellerFeeBasisPoints: 690,
  url: "https://kryptokronikz.co.uk/",
  description: "2500 uniquely evolved Kweenz have arrived in the Jungles of Solacia! Grown by sweat, blood and algorithm, each Kween has its own unique personality.",
};

const defaultEdition = 2;

const filterByRules = {
  kronikz: true,
  sprites: false
};

module.exports = { layersOrder, rarity, format, metadataDetails, defaultEdition, filterByRules };