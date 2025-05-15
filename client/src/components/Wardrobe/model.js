// Wardrobe/model.js
// Data and business logic for the Wardrobe feature

import { clothingItems } from '../OutfitBuilder/OutfitData';
import getStyleSuggestionsAI from './old/aiStyleSuggestions';

export const tops = clothingItems.tops.map(item => item.image);
export const bottoms = clothingItems.bottoms.map(item => item.image);

export const getTopObj = (idx) => clothingItems.tops[idx];
export const getBottomObj = (idx) => clothingItems.bottoms[idx];

export const outfitSuggestions = [
  {
    label: 'Streetwear',
    topIdx: 0,
    bottomIdx: 1,
    desc: 'Bold tee + relaxed jeans'
  },
  {
    label: 'Preppy',
    topIdx: 1,
    bottomIdx: 0,
    desc: 'Collared shirt + pleated pants'
  },
  {
    label: 'Minimalist',
    topIdx: 2,
    bottomIdx: 2,
    desc: 'Simple top + black trousers'
  }
];

export { getStyleSuggestionsAI, clothingItems };
