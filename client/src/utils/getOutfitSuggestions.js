// Returns themed outfit suggestions based on style tags
// Each suggestion: { label, top, bottom }

export function getOutfitSuggestions(tops, bottoms) {
  const themes = [
    { label: 'Sporty', style: 'sporty' },
    { label: 'Farmers Market', style: 'farmers market' },
    { label: 'Ball Game', style: 'ball game' },
    { label: 'News Boy', style: 'newsboy' },
  ];
  const suggestions = [];

  themes.forEach(({ label, style }) => {
    const top = tops.find((t) => t.styles && t.styles.includes(style));
    const bottom = bottoms.find((b) => b.styles && b.styles.includes(style));
    if (top && bottom) {
      suggestions.push({ label, top, bottom });
    }
  });

  return suggestions;
} 