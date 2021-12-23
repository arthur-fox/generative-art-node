const fs = require("fs");
const { createCanvas, loadImage } = require("canvas");
const console = require("console");
const { layersOrder, rarity, format, ownerAddress } = require("./config.js");

const canvas = createCanvas(format.width, format.height);
const ctx = canvas.getContext("2d");

if (!process.env.PWD) {
  process.env.PWD = process.cwd();
}

const buildDir = `${process.env.PWD}/build`;
const metDataFile = '_metadata.json';
const layersDir = `${process.env.PWD}/layers`;

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

const addMetadata = _edition => {
  let dateTime = Date.now();  
  currentMetadata = {    
    name: "Krypto Kronikz #" + (_edition+1),
    symbol: "KK",
    description: "4420 uniquely evolved kronikz have arrived in the Jungles of Solacia! Grown by sweat, blood and algorithm, each Kronikz has its own unique personality.",
    external_url: "https://kryptokronikz.com/",
    image: _edition + ".png",
    attributes: attributes,
    // hash: hash.join(""),
    // decodedHash: decodedHash,
    // edition: _edition,
    date: dateTime,  
    properties: {
      files: [{
        uri: _edition + ".png",
        type: "image/png",
      }],
      creators: [{
        address: ownerAddress,
        share: 100,
      }],
    },
    collection: {
      name: "Krypto Kronikz",
      family: "Krypto Kronikz"
   }
  };
  metadata.push(currentMetadata);
  attributes = [];
  hash = [];
  decodedHash = [];
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

const processLayerForRarity = (_layer) => {

  // Find set of rarities available
  let rarityAvailable = new Set();
  _layer.elements.forEach( (image) => {
    rarityAvailable.add(image.rarity);
  });

  // Setting rarity of trait first
  const rand = Math.random() * 100;
  let chosenRarity = "";
  rarity.forEach( (_rarity) => {
    chosenRarity = (rarityAvailable.has(_rarity.val) && rand <= _rarity.chance) ? _rarity.val : chosenRarity;
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

  selectedImgs = filterByKronikzRules(selectedImgs);
  
  return selectedImgs;
}

const filterByKronikzRules = (selectedImgs) => {

  const bodyIndex = 2;
  const neckwareIndex = 4;
  const mouthIndex = 5;
  const rightHandIndex = 6;
  const leftHandIndex = 7;
  const eyesIndex = 9;
  const stonedEyesIndex = 10;
  const maskIndex = 11;
  
  // (1) If you have a mask then you will not have eyes or a mouth
  if (selectedImgs[maskIndex] != null)
  {
    selectedImgs[mouthIndex] = null;
    selectedImgs[eyesIndex] = null;
    selectedImgs[stonedEyesIndex] = null;
  }

  // (2) If you have stoned eyes, then you will not have normal eyes, and the stoned eyes are the same as the body
  if (selectedImgs[stonedEyesIndex] != null)
  {
   selectedImgs[eyesIndex] = null;
   selectedImgs[stonedEyesIndex] = selectedImgs[bodyIndex];
  }

  // (3) If you have a boxing gloves, then you will have it on both hands
  // const hand_boxingGloveIndex = 1;
  // if (selectedImgs[rightHandIndex] == hand_boxingGloveIndex || 
  //     selectedImgs[leftHandIndex] == hand_boxingGloveIndex)
  // {
  //   selectedImgs[rightHandIndex] = hand_boxingGloveIndex;
  //   selectedImgs[leftHandIndex] = hand_boxingGloveIndex;
  // }

  // (4) If you have a robot mask, then you will have a robot body and vice-versa
  const body_robotIndex = 9;
  const mask_robotIndex = 4;
  if (selectedImgs[bodyIndex] == body_robotIndex || 
      selectedImgs[maskIndex] == mask_robotIndex)
  {
    selectedImgs[bodyIndex] = body_robotIndex;
    selectedImgs[maskIndex] = mask_robotIndex;
    selectedImgs[neckwareIndex] = null;

    selectedImgs[mouthIndex] = null;
    selectedImgs[eyesIndex] = null;
    selectedImgs[stonedEyesIndex] = null;
  }

  // TODO - check this works!
  // (5) If has a beard, then remove necklace
  const mouth_beardIndex_1 = 0;
  const mouth_beardIndex_2 = 1;
  if (selectedImgs[mouthIndex] == mouth_beardIndex_1 || 
    selectedImgs[mouthIndex] == mouth_beardIndex_2)
  {
    selectedImgs[neckwareIndex] = null;
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

const attributeFromLayer = async (_layer, _edition, _selectedImg) => {
  
  let element = _layer.elements[_selectedImg] ? _layer.elements[_selectedImg] : null;

  if (element) {
    addAttributes(element, _layer);
  }
};

const drawLayer = async (_layer, _edition, _selectedImg) => {
  
  let element = _layer.elements[_selectedImg] ? _layer.elements[_selectedImg] : null;

  if (element) {
    // addAttributes(element, _layer);
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

const createFiles = async edition => {
  const layers = layersSetup(layersOrder);

  // Create Metadatas
  let numDupes = 0;
  for (let i = 0; i < edition; i++) {

    let selectedImgs = selectImgs(layers);

    await layers.forEach(async (layer, index) => {
      const selectedImg = selectedImgs[index];
      await attributeFromLayer(layer, i, selectedImg);   
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
      addMetadata(i);
      saveMetadata(i);
      console.log("Creating edition " + i);
    }
  }

  // Create Images
  for (let i = 0; i < edition; i++) {
    console.log("Drawing edition " + i);

    let selectedImgs = getSelectedImgs(layers, i);
    
    await layers.forEach(async (layer, index) => {
      const selectedImg = selectedImgs[index];
      await drawLayer(layer, i, selectedImg);   
    });
  }
};

const createMetaData = () => {
  fs.stat(`${buildDir}/${metDataFile}`, (err) => {    
    if(err == null || err.code === 'ENOENT') {
      fs.writeFileSync(`${buildDir}/${metDataFile}`, JSON.stringify(metadata, null, 2));
    } else {
        console.log('Oh no, error: ', err.code);
    }
  });
};

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

module.exports = { buildSetup, createFiles, createMetaData, reportMetaData };