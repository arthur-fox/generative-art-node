const console = require("console");

const filterByKronikzRules = (_selectedImgs) => {

  const backgroundIndex = 0;
  const bodyIndex = 2;
  const neckwareIndex = 4;
  const mouthIndex = 5;
  const rightHandIndex = 6;
  const leftHandIndex = 7;
  const eyesIndex = 9;
  const stonedEyesIndex = 10;
  const maskIndex = 11;
  const effectIndex = 12;
  
  // (1) If you have a mask then you will not have eyes or a mouth
  if (_selectedImgs[maskIndex] != null)
  {
    _selectedImgs[mouthIndex] = null;
    _selectedImgs[eyesIndex] = null;
    _selectedImgs[stonedEyesIndex] = null;
  }

  // (2) If you have stoned eyes, then you will not have normal eyes, and the stoned eyes are the same as the body
  if (_selectedImgs[stonedEyesIndex] != null)
  {
    _selectedImgs[eyesIndex] = null;
    _selectedImgs[stonedEyesIndex] = _selectedImgs[bodyIndex];
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
  const body_robotIndex = 10;
  const mask_robotIndex = 5;
  if (_selectedImgs[bodyIndex] == body_robotIndex || 
    _selectedImgs[maskIndex] == mask_robotIndex)
  {
    _selectedImgs[bodyIndex] = body_robotIndex;
    _selectedImgs[maskIndex] = mask_robotIndex;
    _selectedImgs[neckwareIndex] = null;

    _selectedImgs[mouthIndex] = null;
    _selectedImgs[eyesIndex] = null;
    _selectedImgs[stonedEyesIndex] = null;
  }

  // (5) If has a beard, then remove necklace
  const mouth_beardIndex_1 = 0;
  const mouth_beardIndex_2 = 1;
  if (_selectedImgs[mouthIndex] == mouth_beardIndex_1 || 
    _selectedImgs[mouthIndex] == mouth_beardIndex_2)
  {
    _selectedImgs[neckwareIndex] = null;
  }

  // (6) Underwater effect only appears in water background
  const effect_underwaterIndex = 7;
  const background_underwaterIndex = 30;
  if (_selectedImgs[effectIndex] == effect_underwaterIndex)
  {
    _selectedImgs[effectIndex] = null;
  }  
  if (_selectedImgs[backgroundIndex] == background_underwaterIndex)
  {
    if (Math.random() <= 0.3)
    {
      _selectedImgs[effectIndex] = effect_underwaterIndex;
    }
  }

  return _selectedImgs;
}


const filterBySpritesRules = (_selectedImgs, _edition) => {

  const backgroundIndex = 0;
  const classIndex = 1;
  const cheekBlemishIndex = 2;
  const hairIndex = 3;
  const earsIndex = 4;
  const eyesIndex = 5;
  const mouthIndex = 6;
  const maskIndex = 7;
  const bodyIndex = 8;
  const earringIndex = 9;

  // (0) Class Index is based on number
  _selectedImgs[classIndex] = Math.trunc( _edition / 2000);
  
  // (1) Ears must match body  
  _selectedImgs[earsIndex] = _selectedImgs[classIndex];

  // (2) If you have a mask then you will not certain traits
  if (_selectedImgs[maskIndex] != null)
  {
    _selectedImgs[cheekBlemishIndex] = null;

    const masksThatRemoveHair = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 19];
    if (masksThatRemoveHair.includes(_selectedImgs[maskIndex]))
    {
      _selectedImgs[hairIndex] = null;
    }

    const masksThatRemoveMouth = [0, 5, 6, 7, 8, 12, 14, 15, 16, 17, 18, 19];
    if (masksThatRemoveMouth.includes(_selectedImgs[maskIndex]))
    {
      _selectedImgs[mouthIndex] = null;
    }

    const masksThatRemoveEyes = [1, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 15, 16, 17, 18, 19];
    if (masksThatRemoveEyes.includes(_selectedImgs[maskIndex]))
    {
      _selectedImgs[eyesIndex] = null;
    }
  }
  
  return _selectedImgs;
}

module.exports = { filterByKronikzRules, filterBySpritesRules };