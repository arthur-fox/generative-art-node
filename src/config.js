const layersOrder = [
    { name: 'Background', number: 100, chance: 100 },   
    { name: 'Base', number: 100, chance: 100 },        
    { name: 'Head', number: 100, chance: 100 },             
    { name: 'Eyes', number: 100, chance: 100 }, 
    { name: 'Mouth', number: 100, chance: 100 },
    { name: 'Facial Hair', number: 100, chance: 100 },        
    { name: 'Shirt', number: 100, chance: 100 },         
    { name: 'Pasta', number: 100, chance: 100 },     
    { name: 'Utensils', number: 100, chance: 100 },
]; // NOTE: currently "number" is actually unused

const rarity = [
    //Background
    { key: "_background1", val: "background1", chance: 90 },
    { key: "_background2", val: "background2", chance: 10 },
    
    //Base
    { key: "_base1", val: "base1", chance: 100 },

    //Eyes
    { key: "_eyes1", val: "eyes1", chance: 20 },
    { key: "_eyes2", val: "eyes2", chance: 30 },
    { key: "_eyes3", val: "eyes3", chance: 45 },
    { key: "_eyes4", val: "eyes4", chance: 15 },

    //Mouth
    { key: "_mouth1", val: "mouth1", chance: 35 },
    { key: "_mouth2", val: "mouth2", chance: 45 },
    { key: "_mouth3", val: "mouth3", chance: 20 },

    //Facial Hair
    { key: "_hair1", val: "hair1", chance: 30 },
    { key: "_hair2", val: "hair2", chance: 60 },
    { key: "_hair3", val: "hair3", chance: 10 },

    //Head
    { key: "_head1", val: "head1", chance: 20 },
    { key: "_head2", val: "head2", chance: 45 },
    { key: "_head3", val: "head3", chance: 29 },
    { key: "_head4", val: "head4", chance: 6 },

    //Pasta
    { key: "_pasta1", val: "pasta1", chance: 50 },
    { key: "_pasta2", val: "pasta2", chance: 45 },
    { key: "_pasta3", val: "pasta3", chance: 5 },

    //Shirt
    { key: "_shirt1", val: "shirt1", chance: 62 },
    { key: "_shirt2", val: "shirt2", chance: 30 },
    { key: "_shirt3", val: "shirt3", chance: 8 },

    //Utensils
    { key: "_utensils1", val: "utensils1", chance: 45 },
    { key: "_utensils2", val: "utensils2", chance: 35 },
    { key: "_utensils3", val: "utensils3", chance: 18 },
    { key: "_utensils4", val: "utensils4", chance: 2 },
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
  chain: "Avalanche",
  name: "Cacio e Pepe",
  description: "Cacio e Pepe by MC",
};

const attributeCountIncluded = false;

const defaultEdition = 2;

const filterByRules = {
  kronikz: false,
  sprites: false,
  pepes: true
};

module.exports = { layersOrder, rarity, format, metadataDetails, defaultEdition, attributeCountIncluded, filterByRules };