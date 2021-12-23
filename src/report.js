const fs = require("fs");
const console = require("console");
const { layersOrder, rarity } = require("./config.js");

const reportMetaData = _metadataFile => {
  fs.readFile(_metadataFile, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }

    let jsonParsed = JSON.parse(data);

    let resultMap = new Map();
    layersOrder.forEach( (layer, _index) => {
      resultMap.set(layer.name, Array(rarity.length).fill(0)) 
    })
    
    jsonParsed.forEach( (item, _itemIndex) => {
      item.attributes.forEach( (attr, _attrIndex) => {        
        for(let i = 0; i < rarity.length; i++)
        {
          if (attr.rarity == rarity[i].val)
          {
            let arr = resultMap.get(attr.layer);
            arr[i] +=1;
            resultMap.set(attr.layer, arr);
            break;
          }
        }
      });
    });

    resultMap.forEach( (value, key) => {
      console.log(`-------${key.toUpperCase()}-------`);
      for(let i = 0; i < rarity.length; i++) {
        console.log(`${rarity[i].val}: ${value[i]}`);
      }
      console.log('');
    });

  });
};

module.exports = { reportMetaData };