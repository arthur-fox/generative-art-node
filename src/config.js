const layersOrder = [
    { name: 'backgrounds', number: 40, chance: 100 },  // 40 in total
    { name: 'back bling', number: 4, chance: 100 },    // 4 in total
    { name: 'body', number: 13, chance: 100 },         // 13 in total
    { name: 'pet', number: 18, chance: 100 },          // 18 in total
    { name: 'neckware', number: 3, chance: 100 },      // 3 in total
    { name: 'mouth', number: 38, chance: 100 },        // 38 in total
    { name: 'right hand', number: 21, chance: 100 },   // 21 in total
    { name: 'left hand', number: 20, chance: 100 },    // 20 in total
    { name: 'hat', number: 15, chance: 100 },          // 15 in total
    { name: 'eyes', number: 28, chance: 100 },         // 28 in total
    { name: 'stoned eyes', number: 13, chance: 100 },  // 13 in total
    { name: 'mask', number: 5, chance: 70 },           // 5 in total
    { name: 'effect', number: 5, chance: 100 },        // 5 in total
];

const rarity = [
    { key: "", val: "common", chance: 100 },        // 100 -33 = 77%    
    { key: "_r", val: "rare", chance: 33 },         // 33 - 15 = 18%
    { key: "_e", val: "epic", chance: 15 },         // 15 - 5  = 10%
    { key: "_l", val: "legendary", chance: 5 },     // 5 - 4.5 = 4.5%
    { key: "_m", val: "mythic", chance: 0.5 },      // 0.5 - 0 = 0.5%
];

// { key: "_u", val: "uncommon", chance: 60 },     // 33 - 60 = 27%

const format = {
  width: 1069,
  height: 1069
};

const defaultEdition = 2;
const ownerAddress = "2AjESJhqgfTacCXeJWtxd2kriGkGmbynyD5iRsU56BLR";

module.exports = { layersOrder, format, rarity, defaultEdition, ownerAddress };