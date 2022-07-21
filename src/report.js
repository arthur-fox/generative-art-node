const fs = require("fs");
const console = require("console");
const { layersOrder, rarity } = require("./config.js");
const { layersSetup } = require("./main.js");

let resultMap = {};

const readParsedItem = (item) => {

  let arr = resultMap.get("Attributes");
  arr[item.attributes[0].value] += 1;
  resultMap.set("Attributes", arr);

  item.attributes.forEach( (attr, _attrIndex) => {
    let arr = resultMap.get(attr.trait_type);
    if (arr) // accounts for attribute_count
      arr.set(attr.value, arr.get(attr.value) + 1);
  });
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
      console.log(value);
    }

    console.log('');
  });
}

const reportMetaData = (_metadata) => {

  const layers = layersSetup(layersOrder); 

  // Setup results Map
  resultMap = new Map();
  layers.forEach( (layer, _index) => {

    const layerMap = new Map();
    resultMap.set(layer.name, layerMap)

    layer.elements.forEach( (element, _index) => {
      layerMap.set(element.name, 0)
    })
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