const fs = require("fs");
const { createCanvas, loadImage } = require("canvas");
const console = require("console");
const { layersOrder, rarity, format, metadataDetails, filterByRules } = require("./config.js");
const { filterByKronikzRules, filterBySpritesRules } = require("./helpers.js");

const canvas = createCanvas(format.width, format.height);
const ctx = canvas.getContext("2d");

if (!process.env.PWD) {
  process.env.PWD = process.cwd();
}

const buildDir = `${process.env.PWD}/build`;
const layersDir = `${process.env.PWD}/layers`;
const helperDir = `${process.env.PWD}/helper`;
const metDataFile = '_metadata.json';

let metadata = [];
let currentMetadata = [];
let attributes = [];
let hash = [];
let decodedHash = [];
const Exists = new Map();


const addRarity = _str => {
  let itemRarity;

  rarity.forEach((r) => {
    if (_str.includes(r.key)) {
      itemRarity = r.val;
    }
  });

  return itemRarity;
};

const cleanName = _str => {
  let name = _str.slice(0, -4);
  rarity.forEach((r) => {
    name = name.replace(r.key, "");
  });
  return name;
};

const getElements = path => {
  return fs
    .readdirSync(path)
    .filter((item) => !/(^|\/)\.[^\/\.]/g.test(item))
    .map((i, index) => {
      return {
        id: index + 1,
        name: cleanName(i),
        fileName: i,
        rarity: addRarity(i),
      };
    });
};

const layersSetup = layersOrder => {
  const layers = layersOrder.map((layerObj, index) => ({
    id: index,
    name: layerObj.name,
    location: `${layersDir}/${layerObj.name}/`,
    elements: getElements(`${layersDir}/${layerObj.name}/`),
    position: { x: 0, y: 0 },
    size: { width: format.width, height: format.height },
    number: layerObj.number,
    chance: layerObj.chance
  }));

  return layers;
};

const buildSetup = () => {
  if (fs.existsSync(buildDir)) {
    fs.rmdirSync(buildDir, { recursive: true });
  }
  fs.mkdirSync(buildDir);
  fs.mkdirSync(`${buildDir}/image/`);
  fs.mkdirSync(`${buildDir}/metadata/`);
};

const saveLayer = (_canvas, _edition) => {
  fs.writeFileSync(`${buildDir}/image/${_edition}.png`, _canvas.toBuffer("image/png"));
};

const saveMetadata = (_edition) => {
  fs.writeFileSync(`${buildDir}/metadata/${_edition}.json`, JSON.stringify(currentMetadata, null, 2));
};

const setMetadata = _edition => {

  if (metadataDetails.chain == "Ethereum") setEthereumMetadata(_edition);
  else if (metadataDetails.chain == "Solana") setSolanaMetadata(_edition);

  metadata.push(currentMetadata);
};

const setEthereumMetadata = _edition => {
  currentMetadata = {
    name: metadataDetails.name + " #" + (_edition+1),
    image: _edition + ".png",
    attributes: attributes
  }
};

const setSolanaMetadata = _edition => {
  currentMetadata = {
    name: metadataDetails.collectionFamily + " #" + (_edition+1),
    symbol: metadataDetails.symbol,
    seller_fee_basis_points: metadataDetails.sellerFeeBasisPoints,
    external_url: metadataDetails.url,
    description: metadataDetails.description,
    image: _edition + ".png",
    collection: {
      name: metadataDetails.collectionName,
      family: metadataDetails.collectionFamily,
    },
    attributes: attributes,
    // hash: hash.join(""),
    // decodedHash: decodedHash,
    // edition: _edition,
    // date: dateTime,
    properties: {
      files: [{
        uri: _edition + ".png",
        type: "image/png",
      }],
      creators: [{
        address: metadataDetails.ownerAddress,
        share: 100,
      }],
    },    
  };
};

const addAttributes = (_element, _layer) => {
  let tempAttr = {
    trait_type: _layer.name,
    value: _element.name,
    id: _element.id,
    rarity: _element.rarity
    // layer: _layer.name,
    // name: _element.name,    
  };
  attributes.push(tempAttr);
  hash.push(_layer.id);
  hash.push(_element.id);
  decodedHash.push({ [_layer.id]: _element.id });
};
 
const addAttributeCount = (_element, _layer) => {
  let tempAttr = {
    trait_type: "attribute_count",
    value: attributes.length,    
  };
  attributes.unshift(tempAttr);
};

const processLayerForRarity = (_layer) => {

  // Find set of rarities available in this layer
  let rarityAvailable = new Set();
  _layer.elements.forEach( (image) => {
    rarityAvailable.add(image.rarity);
  });

  // Generate rarity set for this layer
  let raritySet = new Set();
  rarity.forEach( (_rarity) => {
    if (rarityAvailable.has(_rarity.val)) raritySet.add(_rarity);
  });

  // Select the rarity of trait based on rarity bands
  const rand = Math.random() * 100;
  let chosenRarity = "", counter = 0;
  raritySet.forEach( (_rarity) => {    
    chosenRarity = (counter <= rand && rand <= counter+_rarity.chance) ? _rarity.val : chosenRarity;
    counter += _rarity.chance;
  });

  // Create an array with just the chosen rarity
  let finalLayer = {};
  Object.assign(finalLayer, _layer);
  finalLayer.elements = _layer.elements.filter(function(ele){ 
    return ele.rarity == chosenRarity;
  });  
  finalLayer.number = finalLayer.elements.length;

  return finalLayer;
}

const selectImgs = (_layers) => {
  
  let selectedImgs = [];

  _layers.forEach( (_layer) => {

    let processedLayer = processLayerForRarity(_layer);

    const isSelected = (Math.random() * 100) <= processedLayer.chance;
    const number = Math.floor(Math.random() * processedLayer.number);
    let element = (isSelected && processedLayer.elements[number]) ? processedLayer.elements[number] : null;
    element ? selectedImgs.push(element.id-1) : selectedImgs.push(null); // ID counts from base 1, rather than base 0    
  });

  return selectedImgs;
}

const applyFilterRules = (selectedImgs, edition) => {

  if (filterByRules.kronikz)
  {
    selectedImgs = filterByKronikzRules(selectedImgs);
  }
  else if (filterByRules.sprites)
  {
    selectedImgs = filterBySpritesRules(selectedImgs, edition);
  }
  
  return selectedImgs;
}

const getSelectedImgs = (_layers, _metadataIndex) => {

  let selectedImgs = [];
  
  data = fs.readFileSync(`build/metadata/${_metadataIndex}.json`, 'utf8');

  let jsonParsed = JSON.parse(data);

  _layers.forEach( (layer, _index) => {
    selectedImgs.push(null);    
    jsonParsed.attributes.forEach( (attr, _attrIndex) => {
      if (layer.name == attr.trait_type)
      {
        selectedImgs[selectedImgs.length-1] = attr.id-1;
      }
    });
  });  
  
  return selectedImgs;
}

const attributeFromLayer = async (_layer, _selectedImg) => {
  
  let element = _layer.elements[_selectedImg] ? _layer.elements[_selectedImg] : null;

  if (element) {
    addAttributes(element, _layer);
  }
};

const drawLayer = async (_layer, _edition, _selectedImg) => {
  
  let element = _layer.elements[_selectedImg] ? _layer.elements[_selectedImg] : null;

  if (element) {    
    const image = await loadImage(`${_layer.location}${element.fileName}`);

    ctx.drawImage(
      image,
      _layer.position.x,
      _layer.position.y,
      _layer.size.width,
      _layer.size.height
    );
    saveLayer(canvas, _edition);
  }
};

const createHardcoded = file => {

  if (!file) return;

  data = fs.readFileSync(`${helperDir}/${file}`, 'utf8');
  if (!data)
  {
    console.log("ERROR with Hardcoded File!");
    return;
  }
  
  const layers = layersSetup(layersOrder);

  let jsonParsed = JSON.parse(data);
  jsonParsed.forEach( (item, _itemIndex) => {

    layers.forEach(async (layer, index) => {
      item.attributes.forEach( (attr, _attrIndex) => {        
        if (layer.name == attr.trait_type)
        {          
          const selectedImg = attr.id-1;      
          attributeFromLayer(layer, selectedImg);          
        }
      });
    });

    let i = Number(item.Number);

    let key = hash.toString();
    Exists.set(key, i);
    addAttributeCount(i);
    setMetadata(i);
    saveMetadata(i);
    console.log("Creating hardcoded " + item.Title);
  });

};

const createMetadatas = async edition => {
  const layers = layersSetup(layersOrder);

  let numDupes = 0;
  for (let i = 0; i < edition; i++) {    

    if (fs.existsSync(`${buildDir}/metadata/${i}.json`)) continue;

    let selectedImgs = selectImgs(layers);
    selectedImgs = applyFilterRules(selectedImgs, i);

    await layers.forEach(async (layer, index) => {
      const selectedImg = selectedImgs[index];
      await attributeFromLayer(layer, selectedImg);   
    });

    let key = hash.toString();
    if (Exists.has(key)) {
      console.log(
        `Duplicate creation for edition ${i}. Same as edition ${Exists.get(
          key
        )}`
      );
      numDupes++;
      if (numDupes > edition) break; //prevents infinite loop if no more unique items can be created
      i--;
    } else {
      Exists.set(key, i);
      addAttributeCount(i);
      setMetadata(i);
      saveMetadata(i);
      console.log("Creating edition " + i);
    }

    resetIterationVars();
  }
}

const resetIterationVars = () => {
  attributes = [];
  hash = [];
  decodedHash = [];
}

const createImages = async edition => {
  const layers = layersSetup(layersOrder);

  for (let i = 0; i < edition; i++) {
    console.log("Drawing edition " + i);

    let selectedImgs = getSelectedImgs(layers, i);
    
    await layers.forEach(async (layer, index) => {
      const selectedImg = selectedImgs[index];
      await drawLayer(layer, i, selectedImg);   
    });
  }
}

const createMetadataForReport = () => {
  fs.stat(`${buildDir}/${metDataFile}`, (err) => {    
    if(err == null || err.code === 'ENOENT') {
      fs.writeFileSync(`${buildDir}/${metDataFile}`, JSON.stringify(metadata, null, 2));
    } else {
        console.log('Oh no, error: ', err.code);
    }
  });
};

module.exports = { buildSetup, createHardcoded, createMetadatas, createImages, createMetadataForReport };