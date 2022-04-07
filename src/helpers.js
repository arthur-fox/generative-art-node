const console = require("console");
const fs = require("fs");

// Kronikz --------------------------------

const filterByKronikzRules = (_selectedImgs) => {

  const backgroundIndex = 0;
  const backBlingIndex = 1;
  const bodyIndex = 2;
  const petIndex = 3;
  const neckwareIndex = 4;
  const mouthIndex = 5;
  const rightHandIndex = 6;
  const leftHandIndex = 7;
  const hatIndex = 8;
  const eyelidsIndex = 9;
  const eyesIndex = 9;
  const maskIndex = 11;
  const effectIndex = 12;
  
  // (1) If you have a mask then you will not have eyes or a mouth
  if (_selectedImgs[maskIndex] != null)
  {
    _selectedImgs[mouthIndex] = null;
    _selectedImgs[eyesIndex] = null;
    _selectedImgs[eyelidsIndex] = null;
  }

  // (2) If you have evil eyes, then no eyelids
  const eyes_evilIndex = 0;
  if (_selectedImgs[eyesIndex] === eyes_evilIndex)
  {
    _selectedImgs[eyelidsIndex] = null;
  }

  // (3) If you have a boxing gloves, then you will have it on both hands
  // const hand_boxingGloveIndex = 1;
  // if (_selectedImgs[rightHandIndex] == hand_boxingGloveIndex || 
  //     _selectedImgs[leftHandIndex] == hand_boxingGloveIndex)
  // {
  //   _selectedImgs[rightHandIndex] = hand_boxingGloveIndex;
  //   _selectedImgs[leftHandIndex] = hand_boxingGloveIndex;
  // }

  // (4) If you have a robot mask, then you will have a robot body and vice-versa
  const body_robotIndex = 15;
  const mask_robotIndex = 7;
  if (_selectedImgs[bodyIndex] == body_robotIndex || 
    _selectedImgs[maskIndex] == mask_robotIndex)
  {
    _selectedImgs[bodyIndex] = body_robotIndex;
    _selectedImgs[maskIndex] = mask_robotIndex;
    
    _selectedImgs[neckwareIndex] = null;
    _selectedImgs[mouthIndex] = null;
    _selectedImgs[eyesIndex] = null;
    _selectedImgs[eyelidsIndex] = null;
  }

  // (5) If has a beard, then remove necklace
  // const mouth_beardIndex_1 = 0;
  // const mouth_beardIndex_2 = 1;
  // if (_selectedImgs[mouthIndex] == mouth_beardIndex_1 || 
  //   _selectedImgs[mouthIndex] == mouth_beardIndex_2)
  // {
  //   _selectedImgs[neckwareIndex] = null;
  // }

  // (6) Underwater effect only appears in water background
  // const effect_underwaterIndex = 7;
  // const background_underwaterIndex = 30;
  // if (_selectedImgs[effectIndex] == effect_underwaterIndex)
  // {
  //   _selectedImgs[effectIndex] = null;
  // }  
  // if (_selectedImgs[backgroundIndex] == background_underwaterIndex)
  // {
  //   if (Math.random() <= 0.3)
  //   {
  //     _selectedImgs[effectIndex] = effect_underwaterIndex;
  //   }
  // }

  return _selectedImgs;
}

// Sprites --------------------------------

const filterBySpritesRules = (_selectedImgs, _edition, totalGenerated) => {

  const backgroundIndex = 0;
  const classIndex = 1;
  const blemishIndex = 2;
  const mouthIndex = 3;
  const eyesIndex = 4;
  const hairIndex = 5;
  const maskIndex = 6;
  const bodyIndex = 7;
  const earsIndex = 8;
  const earringIndex = 9;
  const ringIndex = 10;

  // GROUPS --------------------------------
  // Ghoulies
  // _selectedImgs[blemishIndex] = _selectedImgs[hairIndex] = _selectedImgs[eyesIndex] = _selectedImgs[mouthIndex] = _selectedImgs[maskIndex] = null;

  // Gloopy
  // _selectedImgs[blemishIndex] = _selectedImgs[hairIndex] = _selectedImgs[earringIndex] = _selectedImgs[maskIndex] = null;

  // Planets
  // _selectedImgs[blemishIndex] = _selectedImgs[hairIndex] = _selectedImgs[mouthIndex] = _selectedImgs[maskIndex] = null;
  // _selectedImgs[classIndex] = Math.trunc( _edition / (totalGenerated/5));
  // if (_selectedImgs[classIndex] === 1) _selectedImgs[ringIndex] = 0;
  // if (_selectedImgs[classIndex] === 2) _selectedImgs[ringIndex] = 1;
  // if (_selectedImgs[classIndex] === 3) _selectedImgs[ringIndex] = 2;

  // Potions
  // _selectedImgs[hairIndex] = _selectedImgs[maskIndex] = _selectedImgs[earringIndex] = null;

  // Mushroom
  // _selectedImgs[hairIndex] = _selectedImgs[maskIndex] = null;
  // --------------------------------


  // (0) Class Index is based on number
  _selectedImgs[classIndex] = 4; //Math.trunc( _edition / (totalGenerated/5));
  
  // (1) Ears must match body  
  _selectedImgs[earsIndex] = _selectedImgs[classIndex];

  // (2) If you have a cloud body, you must have a matching cloud hair
  const cloudyHairs = [7, 9, 34];
  const cloudyBodies = [4, 12, 44];
  if (cloudyBodies.includes(_selectedImgs[bodyIndex]) && cloudyHairs.includes(_selectedImgs[hairIndex]))
  {
    if (_selectedImgs[hairIndex] == 7) _selectedImgs[bodyIndex] = 4;
    if (_selectedImgs[hairIndex] == 9) _selectedImgs[bodyIndex] = 12;
    if (_selectedImgs[hairIndex] == 34) _selectedImgs[bodyIndex] = 44;
  }

  // (3) If you have a mask then you will not certain traits
  if (_selectedImgs[maskIndex] != null)
  {
    _selectedImgs[blemishIndex] = null;

    const masksThatRemoveHair = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 18, 20, 21];
    if (masksThatRemoveHair.includes(_selectedImgs[maskIndex]))
    {
      _selectedImgs[hairIndex] = null;
    }

    const masksThatRemoveMouth = [0, 2, 3, 7, 9, 10, 12, 14, 15, 17, 18, 19, 20, 21];
    if (masksThatRemoveMouth.includes(_selectedImgs[maskIndex]))
    {
      _selectedImgs[mouthIndex] = null;
    }

    const masksThatRemoveEyes = [1, 2, 3, 4, 6, 7, 8, 9, 10, 12, 13, 14, 16, 17, 18, 19, 20, 21];
    if (masksThatRemoveEyes.includes(_selectedImgs[maskIndex]))
    {
      _selectedImgs[eyesIndex] = null;
    }
  }
  
  return _selectedImgs;
}

const createDictionary = (data) => {

  const splitByLines = data.split(/\n/)
  const cleanSplitByLines = splitByLines.map(line => line.substring( 0, line.indexOf( "\r" ) ));
  const splitByCommas = cleanSplitByLines.map(arr => arr.split(','))

  output = {}
  keys = splitByCommas[0].splice(1, splitByCommas[0].length)
  keys.forEach(key => {
    output[key] = {}
  });

  for (let i=1; i<splitByCommas.length; i++) {
    row = splitByCommas[i];
    rowKey = row[0];

    for (let j=1; j<row.length; j++) {
      output[keys[j-1]][rowKey] = row[j];
    }
  }

  return output;
}

const shouldBeExcludedBySPrites = (_selectedImgs, _layers) => {

  const backgroundIndex = 0;
  const classIndex = 1;
  const blemishIndex = 2;
  const mouthIndex = 3;
  const eyesIndex = 4;
  const hairIndex = 5;
  const maskIndex = 6;
  const bodyIndex = 7;
  const earsIndex = 8;
  const earringIndex = 9;
  const ringIndex = 10;

  if (!process.env.PWD) {
    process.env.PWD = process.cwd();
  }
  const helperDir = `${process.env.PWD}/helper`;

  dataMasksMouth = fs.readFileSync(`${helperDir}/sprites_masks_mouths.csv`, 'utf8');
  if (!dataMasksMouth) {console.log("ERROR with CSV File!"); return;}
  dataMasksBody = fs.readFileSync(`${helperDir}/sprites_masks_body.csv`, 'utf8');
  if (!dataMasksBody) {console.log("ERROR with CSV File!"); return;}
  dataMasksHairs = fs.readFileSync(`${helperDir}/sprites_masks_hairs.csv`, 'utf8');
  if (!dataMasksHairs) {console.log("ERROR with CSV File!"); return;}

  const dictMasksMouth = createDictionary(dataMasksMouth);
  const dictMasksBody = createDictionary(dataMasksBody);
  const dictMasksHairs = createDictionary(dataMasksHairs);

  if (_selectedImgs[maskIndex] && _selectedImgs[mouthIndex]) 
  {
    const maskName = _layers[maskIndex]['elements'][_selectedImgs[maskIndex]]['name'];
    const mouthName = _layers[mouthIndex]['elements'][_selectedImgs[mouthIndex]]['name'];

    const shouldExclude = dictMasksMouth[maskName][mouthName] === 'n'
    if (shouldExclude)
    {
      console.log('Clash Found! Masks + Mouth:  ' 
        + _layers[maskIndex]['elements'][_selectedImgs[maskIndex]]['name'] + ' + '
        + _layers[mouthIndex]['elements'][_selectedImgs[mouthIndex]]['name']);
      
      return shouldExclude;
    }
  }

  if (_selectedImgs[maskIndex] && _selectedImgs[bodyIndex]) 
  {
    const maskName = _layers[maskIndex]['elements'][_selectedImgs[maskIndex]]['name'];
    const bodyName = _layers[bodyIndex]['elements'][_selectedImgs[bodyIndex]]['name'];

    const shouldExclude = dictMasksBody[maskName][bodyName] === 'n'
    if (shouldExclude)
    {
      console.log('Clash Found! Masks + Body: ' 
        + _layers[maskIndex]['elements'][_selectedImgs[maskIndex]]['name'] + ' + '
        + _layers[bodyIndex]['elements'][_selectedImgs[bodyIndex]]['name']);
      
      return shouldExclude;
    }
  }

  if (_selectedImgs[maskIndex] && _selectedImgs[hairIndex]) 
  {
    const maskName = _layers[maskIndex]['elements'][_selectedImgs[maskIndex]]['name'];
    const hairName = _layers[hairIndex]['elements'][_selectedImgs[hairIndex]]['name'];

    const shouldExclude = dictMasksHairs[maskName][hairName] === 'n'
    if (shouldExclude)
    {
      console.log('Clash Found! Masks + Hair: '
        + _layers[maskIndex]['elements'][_selectedImgs[maskIndex]]['name'] + ' + '
        + _layers[hairIndex]['elements'][_selectedImgs[hairIndex]]['name']); 

      return shouldExclude;  
    }    
  }

  return false;

}

module.exports = { filterByKronikzRules, filterBySpritesRules, shouldBeExcludedBySPrites };