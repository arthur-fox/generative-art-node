const layersOrder = [
    { name: 'background', number: 5, chance: 100 },     // 5 in total
    { name: 'class', number: 5, chance: 100 },          // 5 in total
    { name: 'face blemish', number: 7, chance: 100 },  // 7 in total
    { name: 'headwear', number: 53, chance: 100 },          // 53 in total
    { name: 'ears', number: 5, chance: 100 },           // 5 in total
    { name: 'eyes', number: 25, chance: 100 },          // 25 in total    
    { name: 'mouth', number: 17, chance: 100 },         // 17 in total
    { name: 'mask', number: 17, chance: 100 },          // 17 in total
    { name: 'body', number: 62, chance: 100 },          // 62 in total
    { name: 'earring', number: 10, chance: 100 },       // 10 in total
]; // NOTE: currently "number" is actually unused

const rarity = [
    //Background
    { key: "_background1", val: "background1", chance: 100 },
    
    //Class
    { key: "_class1", val: "class1", chance: 100 },

    //Cheek Blemish
    { key: "_cheek1", val: "cheek1", chance: 7.72 },      // 7.72% = 600 / 7777
    { key: "_cheek2", val: "cheek2", chance: 2.57 },      // 2.57% = 200 / 7777
    { key: "_cheek3", val: "cheek3", chance: 0.26 },      // 0.26% = 20 / 7777

    //Headwear
    { key: "_hair1", val: "hair1", chance: 38.58 },       // 38.58% = 3000 / 7777
    { key: "_hair2", val: "hair2", chance: 28.29 },       // 28.29% = 2200 / 7777
    { key: "_hair3", val: "hair3", chance: 19.29 },       // 19.29% = 1500 / 7777
    { key: "_hair4", val: "hair4", chance: 11.57 },       // 11.57% = 900 / 7777
    { key: "_hair5", val: "hair5", chance: 1.16 },        // 0.77% = 90 / 7777

    //Eyes
    { key: "_eyes1", val: "eyes1", chance: 36 },          // 54% = 4200 / 7777
    { key: "_eyes2", val: "eyes2", chance: 30.86 },       // 27% = 2100 / 7777
    { key: "_eyes3", val: "eyes3", chance: 20.57 },       // 10.29% = 800 / 7777
    { key: "_eyes4", val: "eyes4", chance: 14.14 },       // 5.14% = 400 / 7777
    { key: "_eyes5", val: "eyes5", chance: 2.57 },        // 1.93% = 150 / 7777

    //Mouth
    { key: "_mouth2", val: "mouth1", chance: 54.01 },     // 54.01 = 4200 / 7777
    { key: "_mouth3", val: "mouth2", chance: 27 },        // 27% = 2100 / 7777
    { key: "_mouth4", val: "mouth3", chance: 15.43 },     // 15.43% = 1200 / 7777
    { key: "_mouth5", val: "mouth4", chance: 3.86 },      // 3.86% = 300 / 7777
    { key: "_mouth6", val: "mouth5", chance: 1.93 },      // 1.93% = 150 / 7777

    //Mask
    { key: "_mask1", val: "mask1", chance: 6.43 },        // 6.43% = 500 / 7777
    { key: "_mask2", val: "mask2", chance: 4.5 },         // 4.5% = 350 / 7777
    { key: "_mask3", val: "mask3", chance: 1.03 },        // 1.03% = 80 / 7777

    //Body
    { key: "_body1", val: "body1", chance: 27 },          // 27% = 2100 / 7777
    { key: "_body2", val: "body2", chance: 41.15 },       // 41.15% = 3200/ 7777
    { key: "_body3", val: "body3", chance: 14.14 },       // 14.14% = 1100 / 7777
    { key: "_body4", val: "body4", chance: 14.14 },       // 14.14% = 1100 / 7777
    { key: "_body5", val: "body5", chance: 1.8 },         // 1.8% = 140 / 7777

    //Earring
    { key: "_earring1", val: "earring1", chance: 7.72 },  // 7.72% = 600 / 7777
    { key: "_earring2", val: "earring2", chance: 3.86 },  // 3.86% = 300 / 7777
    { key: "_earring3", val: "earring3", chance: 0.26 },  // 0.26% = 20 / 7777
    // { key: "_10", val: "unique", chance: -1 },         // unique
];

// const format = {
//   width: 1024,
//   height: 1024
// };

const format = {
  width: 256,
  height: 256
};

const metadataDetails = {
  chain: "Ethereum",
  name: "Sprite Club",
  description: "Sprite Club NFT",
};

const defaultEdition = 2;

const filterByRules = {
  kronikz: false,
  sprites: true
};

module.exports = { layersOrder, rarity, format, metadataDetails, defaultEdition, filterByRules };