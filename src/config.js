const layersOrder = [
    { name: 'background', number: 5, chance: 100 },   // 5 in total
    { name: 'class', number: 5, chance: 100 },        // 5 in total
    { name: 'cheek blemish', number: 7, chance: 100 },// 7 in total
    { name: 'hair', number: 53, chance: 100 },        // 53 in total
    { name: 'ears', number: 5, chance: 100 },         // 5 in total
    { name: 'eyes', number: 25, chance: 100 },        // 25 in total    
    { name: 'mouth', number: 17, chance: 100 },       // 17 in total
    { name: 'mask', number: 17, chance: 100 },        // 17 in total
    { name: 'body', number: 62, chance: 100 },        // 62 in total
    { name: 'earring', number: 10, chance: 100 },     // 10 in total
]; // NOTE: currently "number" is actually unused

const rarity = [
    //Background
    { key: "_background1500", val: "background1500", chance: 100 },
    
    //Class
    { key: "_class1500", val: "class1500", chance: 100 },

    //Cheek Blemish
    { key: "_cheek1", val: "cheek200", chance: 5.14 },      // 5.14% = 400 / 7777
    { key: "_cheek2", val: "cheek50", chance: 3.21 },       // 3.21% = 250 / 7777

    //Hair
    { key: "_hair300", val: "hair300", chance: 52.43 },     // 52.43% = 3900 / 7777
    { key: "_hair200", val: "hair200", chance: 28.3 },      // 28.3% = 2200 / 7777
    { key: "_hair100", val: "hair100", chance: 7.72 },      // 7.72% = 600 / 7777
    { key: "_hair50", val: "hair50", chance: 10.3 },        // 10.3% = 800 / 7777
    { key: "_hair_5", val: "hair10", chance: 0.77 },        // 0.77% = 60 / 7777

    //Eyes
    { key: "_eyes700", val: "eyes700", chance: 55.7 },      // 54% = 4200 / 7777
    { key: "_eyes300", val: "eyes300", chance: 27 },        // 27% = 2100 / 7777
    { key: "_eyes200", val: "eyes200", chance: 10.3 },      // 10.29% = 800 / 7777
    { key: "_eyes100", val: "eyes100", chance: 5.1 },       // 5.14% = 400 / 7777
    { key: "_eyes50", val: "eyes50", chance: 1.9 },         // 1.93% = 150 / 7777

    //Mouth
    { key: "_mouth_1", val: "mouth1000", chance: 38.3 },    // 38.3 = 3000 / 7777
    { key: "_mouth700", val: "mouth700", chance: 36 },      // 36% = 2800 / 7777
    { key: "_mouth300", val: "mouth300", chance: 15.4 },    // 15.43% = 1200 / 7777
    { key: "_mouth200", val: "mouth200", chance: 7.7 },     // 7.72% = 600 / 7777
    { key: "_mouth100", val: "mouth100", chance: 1.3 },     // 1.29% = 100 / 7777
    { key: "_mouth50", val: "mouth50", chance: 1.3 },       // 1.29% = 100 / 7777

    //Mask
    { key: "_mask_1", val: "mask100", chance: 5.14 },       // 5.14% = 400 / 7777
    { key: "_mask50", val: "mask50", chance: 1.93 },        // 1.93% = 150 / 7777
    { key: "_mask10", val: "mask10", chance: 0.26 },        // 0.26% = 20 / 7777

    //Body
    { key: "_body300", val: "body300", chance: 27 },        // 27% = 2100 / 7777
    { key: "_body200", val: "body200", chance: 56.6 },      // 56.6% = 4400/ 7777
    { key: "_body50", val: "body50", chance: 14.16 },       // 14.16% = 1100 / 7777
    { key: "_body10", val: "body10", chance: 1.54 },        // 1.54% = 120 / 7777

    //Earring
    { key: "_earring200", val: "earring200", chance: 12.9 },// 12.9% = 1000 / 7777
    { key: "_earring50", val: "earring50", chance: 1.3 },   // 1.3% = 100 / 7777
    { key: "_earring10", val: "earring10", chance: 0.4 },   // 0.4% = 30 / 7777
    // { key: "_10", val: "unique", chance: -1 },           // unique
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
  kronikz: 0,
  sprites: 1
};

module.exports = { layersOrder, rarity, format, metadataDetails, defaultEdition, filterByRules };