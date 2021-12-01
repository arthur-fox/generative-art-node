const layersOrder = [
    { name: 'backgrounds', number: 32, chance: 100 },  // 32 in total
    { name: 'back bling', number: 2, chance: 10 },     // 2 in total - 1/10 have this property
    { name: 'body', number: 10, chance: 100 },         // 10 in total 
    { name: 'neckware', number: 20, chance: 5 },       // 1 in total - 1/20 have this property
    { name: 'mouths', number: 32, chance: 100 },       // 32 in total
    { name: 'right hand', number: 9, chance: 100 },    // 9 in total
    { name: 'left hand', number: 10, chance: 100 },    // 10 in total
    { name: 'headwear', number: 13, chance: 33 },      // 13 in total - 1/3 have this property
    { name: 'eyes', number: 27, chance: 100 },         // 27 in total
    { name: 'mask', number: 1, chance: 10 },           // 1 in total - 1/10 have this property
    { name: 'effect', number: 1, chance: 10 },         // 1 in total - 1/10 have this property
];
  
const format = {
    width: 1069,
    height: 1069
};

const rarity = [
    { key: "", val: "original", chance: 100 },      // 100%
    { key: "_r", val: "rare", chance: 30 },         // 30%
    { key: "_sr", val: "super rare", chance: 15 },  // 15%
    { key: "_l", val: "legendary", chance: 5 },     // 5%
    { key: "_m", val: "mythic", chance: 1 },        // 1%
];

const defaultEdition = 5;
const ownerAddress = "HNHJtoBPgbxu4v9Mc9KyJDXgXz5f6dDJMgzASbZ7jKdn";

module.exports = { layersOrder, format, rarity, defaultEdition, ownerAddress };