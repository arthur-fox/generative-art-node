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
    { key: "_cheek1", val: "cheek200", chance: 5.14 },      // 8.35 - 3.21 = 5.14% = 400 / 7777
    { key: "_cheek2", val: "cheek50", chance: 3.21 },        // 3.21 - 0 = 3.21% = 250 / 7777

    //Hair
    { key: "_hair300", val: "hair300", chance: 99.5 },        // 99.5 - 47.04 = 52.43% = 3900 / 7777
    { key: "_hair200", val: "hair200", chance: 47.07 },       // 47.07 - 18.77 = 28.3% = 2200 / 7777
    { key: "_hair100", val: "hair100", chance: 18.77 },       // 18.77 - 11.07 = 7.72% = 600 / 7777
    { key: "_hair50", val: "hair50", chance: 11.07 },         // 11.07 - 0.77 = 10.3% = 800 / 7777
    { key: "_hair_5", val: "hair10", chance: 0.77 },          // 0.77 - 0 = 0.77% = 60 / 7777

    //Eyes
    { key: "_eyes700", val: "eyes700", chance: 100 },         // 100 - 54 = 54% = 4200 / 7777
    { key: "_eyes300", val: "eyes300", chance: 44.36 },       // 44.36 - 17.36 = 27% = 2100 / 7777
    { key: "_eyes200", val: "eyes200", chance: 17.36 },       // 17.36 - 7.07 = 10.29% = 800 / 7777
    { key: "_eyes100", val: "eyes100", chance: 7.07 },        // 7.07 - 1.93 = 5.14% = 400 / 7777
    { key: "_eyes50", val: "eyes50", chance: 1.93 },          // 1.93 - 0 = 1.93% = 150 / 7777

    //Mouth
    { key: "_mouth_1", val: "mouth1000", chance: 100 },       // 100 - 61.73 = 38.3 = 3000 / 7777
    { key: "_mouth700", val: "mouth700", chance: 61.73 },     // 61.73 - 25.73 = 36% = 2800 / 7777
    { key: "_mouth300", val: "mouth300", chance: 25.73 },     // 25.73 - 10.3 = 15.43% = 1200 / 7777
    { key: "_mouth200", val: "mouth200", chance: 10.3 },      // 10.3 - 2.58 = 7.72% = 600 / 7777
    { key: "_mouth100", val: "mouth100", chance: 2.58 },      // 2.58 - 1.29 = 1.29% = 100 / 7777
    { key: "_mouth50", val: "mouth50", chance: 1.29 },        // 1.29 - 0 = 1.29% = 100 / 7777

    //Mask
    { key: "_mask_1", val: "mask100", chance: 7.33 },         // 7.33 - 2.19 = 5.14% = 400 / 7777
    { key: "_mask50", val: "mask50", chance: 2.19 },          // 2.19 - 0.26 = 1.93% = 150 / 7777
    { key: "_mask10", val: "mask10", chance: 0.26 },          // 0.26 - 0 = 0.26% = 20 / 7777

    //Body
    { key: "_body300", val: "body300", chance: 99.3 },      // 99.3 - 72.3 = 27% = 2100 / 7777
    { key: "_body200", val: "body200", chance: 72.3 },      // 72.3 - 15.7 = 56.6% = 4400/ 7777
    { key: "_body50", val: "body50", chance: 15.7 },        // 15.7 - 1.54 = 14.16% = 1100 / 7777
    { key: "_body10", val: "body10", chance: 1.54 },        // 1.54 - 0 = 1.54% = 120 / 7777

    //Earring
    { key: "_earring200", val: "earring200", chance: 14.6 },// 14.6 - 1.7 = 12.9% = 1000 / 7777
    { key: "_earring50", val: "earring50", chance: 1.7 },   // 1.7 - 0.4 = 1.3% = 100 / 7777
    { key: "_earring10", val: "earring10", chance: 0.4 },   // 0.4 - 0 = 0.4% = 30 / 7777
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