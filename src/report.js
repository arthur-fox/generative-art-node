const fs = require("fs");
const console = require("console");
const { layersOrder, rarity } = require("./config.js");

let resultMap = {};

const readParsedItem = (item) => {
  // let background = 0;

  let arr = resultMap.get("Attributes");
  arr[item.attributes[0].value] += 1;
  resultMap.set("Attributes", arr);      

  item.attributes.forEach( (attr, _attrIndex) => {
    
    // if (attr.trait_type == "background")
    // {
    //   background += 1;
    // }
    
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

  // if (background > 1) // if duplicate background
  // {
  //   console.log("ERROR in: " + _itemIndex)
  // }
}

const logReport = () => {
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
}

const reportMetaData = (_metadata) => {

  resultMap = new Map();
  layersOrder.forEach( (layer, _index) => {
    resultMap.set(layer.name, Array(rarity.length).fill(0))
  })
  resultMap.set("Attributes", Array(layersOrder.length).fill(0))

  // If Folder
  let stats = fs.statSync(_metadata);
  if (!stats.isFile()) {

    const dir = `${process.env.PWD}/${_metadata}`;
    fs.readdir(dir, (err, files) => {
      if (err) {
        return console.log(err);
      }

      files.forEach( (item, _itemIndex) => {
        let fileName = `${dir}${item}`;

        fs.readFile(fileName, 'utf8', function (err,data) {
          if (err) {
            console.log(fileName);
            return console.log(err);
          }
          
          let jsonParsedItem = JSON.parse(data);          
          readParsedItem(jsonParsedItem);
        })
      })

      setTimeout(logReport, 2000);
    });    
  }
  
  // If File
  fs.readFile(_metadata, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }

    let jsonParsed = JSON.parse(data);
    jsonParsed.forEach( (item, _itemIndex) => {
      readParsedItem(item);
    });

    logReport();
  });
};

module.exports = { reportMetaData };