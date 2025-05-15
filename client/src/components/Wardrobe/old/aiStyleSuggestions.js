export default function getStyleSuggestionsAI(clothingItems) {
  const styles = [
    {
      label: 'Streetwear',
      keywords: ['graphic', 'bold', 'relaxed', 'oversized', 'tee', 'jeans', 'cargo'],
      desc: 'Bold graphics, relaxed fits, and street-ready combos.'
    },
    {
      label: 'Preppy',
      keywords: ['collar', 'polo', 'button', 'pleated', 'khaki', 'chino', 'shirt'],
      desc: 'Crisp shirts, pleated pants, and classic prep.'
    },
    {
      label: 'Minimalist',
      keywords: ['black', 'white', 'simple', 'plain', 'solid', 'neutral'],
      desc: 'Clean lines, neutral colors, and simplicity.'
    },
    {
      label: 'Retro',
      keywords: ['vintage', 'pattern', 'stripe', 'corduroy', 'denim', 'washed'],
      desc: 'Throwback patterns, corduroy, and vintage denim.'
    },
    {
      label: 'Sporty',
      keywords: ['track', 'sweat', 'athletic', 'jersey', 'jogger', 'active'],
      desc: 'Athletic details and active silhouettes.'
    }
  ];
  const suggestions = [];
  styles.forEach(style => {
    let topIdx = -1, bottomIdx = -1;
    for (let i = 0; i < clothingItems.tops.length; i++) {
      const name = clothingItems.tops[i].name.toLowerCase();
      if (style.keywords.some(k => name.includes(k))) { topIdx = i; break; }
    }
    for (let i = 0; i < clothingItems.bottoms.length; i++) {
      const name = clothingItems.bottoms[i].name.toLowerCase();
      if (style.keywords.some(k => name.includes(k))) { bottomIdx = i; break; }
    }
    if (topIdx === -1) topIdx = 0;
    if (bottomIdx === -1) bottomIdx = 0;
    suggestions.push({
      label: style.label,
      topIdx,
      bottomIdx,
      desc: style.desc
    });
  });
  return suggestions;
} 