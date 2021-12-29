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
    resultMap.set("Attributes", Array(layersOrder.length).fill(0))
    
    jsonParsed.forEach( (item, _itemIndex) => {

      if (_itemIndex >= 4420) return;

      let arr = resultMap.get("Attributes");
      arr[item.attributes[0].value] += 1;
      resultMap.set("Attributes", arr);      

      item.attributes.forEach( (attr, _attrIndex) => {        
        for(let i = 0; i < rarity.length; i++)
        {
          if (attr.rarity == rarity[i].val)
          {
            let arr = resultMap.get(attr.trait_type);
            arr[i] +=1;
            resultMap.set(attr.trait_type, arr);
            break;
          }
        }
      });
    });

    resultMap.forEach( (value, key) => {
      console.log(`-------${key.toUpperCase()}-------`);
      if (key == "Attributes")
      {
        for(let i = 0; i < layersOrder.length; i++) {
          console.log(`${i+1}: ${value[i]}`);
        }
      }
      else
      {
        for(let i = 0; i < rarity.length; i++) {
          console.log(`${rarity[i].val}: ${value[i]}`);
        }
      }      
      console.log('');
    });
  });
};

module.exports = { reportMetaData };