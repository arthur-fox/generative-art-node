const layersOrder = [
    { name: 'backgrounds', number: 9 },
    { name: 'face', number: 1 },
    { name: 'eyes', number: 4 },        
    { name: 'mouths', number: 4 },
    { name: 'hands', number: 2 },        // 2
    { name: 'accessory', number: 5 },    // 1 in 5
];
  
const format = {
    width: 1069,
    height: 1069
};

const rarity = [
    { key: "", val: "original" },
    { key: "_r", val: "rare" },
    { key: "_sr", val: "super rare" },
];

const defaultEdition = 30;

module.exports = { layersOrder, format, rarity, defaultEdition };