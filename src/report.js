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

      // if (_itemIndex >= 1120) return;
      let background = 0;

      let arr = resultMap.get("Attributes");
      arr[item.attributes[0].value] += 1;
      resultMap.set("Attributes", arr);      

      item.attributes.forEach( (attr, _attrIndex) => {
        
        if (attr.trait_type == "background")
        {
          background += 1;
        }
        
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

      if (background > 1) // if duplicate background
      {
        console.log("ERROR in: " + _itemIndex)
      }
    });


    console.log(``);
    resultMap.forEach( (value, key) => {
      console.log(`-------${key.toUpperCase()}-------`);
      if (key == "Attributes")
      {
        for(let i = 0; i < layersOrder.length; i++) {
          if (value[i]>0) console.log(`${i+1}: ${value[i]}`);
        }
      }
      else
      {
        for(let i = 0; i < rarity.length; i++) {
          if (value[i]>0) console.log(`${rarity[i].val}: ${value[i]}`);
        }
      }      
      console.log('');
    });
  });
};

module.exports = { reportMetaData };