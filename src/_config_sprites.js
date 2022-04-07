const layersOrder = [
    { name: 'Background', number: 100, chance: 100 },   
    { name: 'Class', number: 100, chance: 100 },        
    { name: 'Blemish', number: 100, chance: 100 }, 
    { name: 'Mouth', number: 100, chance: 100 },        
    { name: 'Eyes', number: 100, chance: 100 },             
    { name: 'Headwear', number: 100, chance: 100 },     
    { name: 'Mask', number: 100, chance: 100 },         
    { name: 'Body', number: 100, chance: 100 },         
    { name: 'Ear', number: 100, chance: 100 },         
    { name: 'Earring', number: 100, chance: 100 },
    // { name: 'Ring', number: 100, chance: 100 },
]; // NOTE: currently "number" is actually unused

const rarity = [
    //Background
    { key: "_background1", val: "background1", chance: 100 },
    
    //Class
    { key: "_class1", val: "class1", chance: 100 },

    //Cheek Blemish
    { key: "_cheek1", val: "cheek1", chance: 7.72 },      // 7.72% = 600 / 7777
    { key: "_cheek2", val: "cheek2", chance: 1.93 },      // 1.93% = 150 / 7777
    { key: "_cheek3", val: "cheek3", chance: 0.26 },      // 0.26% = 20 / 7777

    //Headwear
    { key: "_hair1", val: "hair1", chance: 38.58 },       // 38.58% = 3000 / 7777
    { key: "_hair2", val: "hair2", chance: 28.29 },       // 28.29% = 2200 / 7777
    { key: "_hair3", val: "hair3", chance: 19.29 },       // 19.29% = 1500 / 7777
    { key: "_hair4", val: "hair4", chance: 11.57 },       // 11.57% = 900 / 7777
    { key: "_hair5", val: "hair5", chance: 1.16 },        // 1.16% = 90 / 7777

    //Eyes
    { key: "_eyes1", val: "eyes1", chance: 31.86 },       // 31.86% = 2400 / 7777
    { key: "_eyes2", val: "eyes2", chance: 30.86 },       // 30.86% = 2400 / 7777
    { key: "_eyes3", val: "eyes3", chance: 20.57 },       // 20.57% = 1600 / 7777
    { key: "_eyes4", val: "eyes4", chance: 14.14 },       // 14.14% = 1100 / 7777
    { key: "_eyes5", val: "eyes5", chance: 2.57 },        // 2.57% = 200 / 7777

    //Mouth
    { key: "_mouth1", val: "mouth1", chance: 38.29 },     // 38.29% = 2900 / 7777
    { key: "_mouth2", val: "mouth2", chance: 24.43 },     // 24.43% = 1900 / 7777
    { key: "_mouth3", val: "mouth3", chance: 20.57 },     // 20.57% = 1600 / 7777
    { key: "_mouth4", val: "mouth4", chance: 12.86 },     // 12.86% = 1000 / 7777
    { key: "_mouth5", val: "mouth5", chance: 3.86 },      // 3.86% = 300 / 7777

    //Mask
    { key: "_mask1", val: "mask1", chance: 6.43 },        // 6.43% = 500 / 7777
    { key: "_mask2", val: "mask2", chance: 4.5 },         // 4.5% = 350 / 7777
    { key: "_mask3", val: "mask3", chance: 2.06 },        // 2.06% = 160 / 7777

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

const format = {
  width: 820,
  height: 820
};

// const format = {
//   width: 256,
//   height: 256
// };

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