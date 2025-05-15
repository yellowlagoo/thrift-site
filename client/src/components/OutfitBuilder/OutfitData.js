// OutfitData.js - Sample outfit data for the wardrobe

const clothingItems = {
  tops: [
    {
      id: 't1',
      name: 'Black T-shirt',
      price: '$39.99',
      category: 'tops',
      image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dCUyMHNoaXJ0fGVufDB8fDB8fHww',
      description: 'Comfortable black polo shirt with white collar, perfect for casual wear',
      color: 'Black',
      brand: 'Vintage 901',
      size: 'M',
    },
    {
      id: 't2',
      name: 'White Sweater',
      price: '$29.99',
      category: 'tops',
      image: 'hhttps://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=3172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description: 'Classic black t-shirt with geometric Puma graphic design',
      color: 'white',
      brand: 'Puma',
      size: 'M',
    },
    {
      id: 't3',
      name: 'White Basic Tee',
      price: '$24.99',
      category: 'tops',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
      description: 'Simple white t-shirt, perfect for everyday wear',
      color: 'white',
      brand: 'Vintage 901',
      size: 'M',
    },
  ],
  bottoms: [
    {
      id: 'b1',
      name: 'Classic Navy Chinos',
      price: '$49.99',
      category: 'bottoms',
      image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGFudHN8ZW58MHx8MHx8fDA%3D',
      description: 'Timeless navy blue chino pants with a slim fit design',
      color: 'navy',
      brand: 'Vintage 901',
      size: '32',
    },
    {
      id: 'b2',
      name: 'Purple Cargo Joggers',
      price: '$54.99',
      category: 'bottoms',
      image: 'https://images.unsplash.com/photo-1706177208693-2e3c68e5f0f2?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description: 'Modern gray cargo joggers with zippered pockets',
      color: 'purple',
      brand: 'Urban Tech',
      size: 'M',
    },
    {
      id: 'b3',
      name: 'Denim Distressed Shorts',
      price: '$59.99',
      category: 'bottoms',
      image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description: 'Versatile black slim fit jeans for any occasion',
      color: 'black',
      brand: 'Vintage 901',
      size: '32',
    },
  ]
};

// Sample outfits for inspiration
const suggestedOutfits = [
  {
    id: 'outfit1',
    name: 'Casual Day Out',
    top: 't1',
    bottom: 'b1',
    shoes: 's1',
    matchScore: 4.5,
    description: 'A comfortable and stylish outfit for a casual day out'
  },
  {
    id: 'outfit2',
    name: 'Sporty Vibes',
    top: 't2',
    bottom: 'b2',
    shoes: 's2',
    matchScore: 4.2,
    description: 'Athletic inspired look for an active day'
  }
];

export { clothingItems, suggestedOutfits }; 