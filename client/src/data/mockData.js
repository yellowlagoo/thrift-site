import wilsonHoodie from '../mockImages/wilsonHoodie.jpeg';
import greenShortSleeve from '../mockImages/greenShortSleeve.jpeg';
import yankeesNavyTop from '../mockImages/yankeesNavyTop.jpeg';
import yankeesGreyHoodie from '../mockImages/yankeesGreyHoodie.jpeg';
import blueDenimSkirt from '../mockImages/blueDenimSkirt.jpeg';
import redLiverpoolShorts from '../mockImages/redLiverpoolShorts.jpeg';
import blackPinstripePants from '../mockImages/blackPinstripePants.jpeg';

// Example category IDs (as strings)
const CAT_TOPS = 'cat1';
const CAT_BOTTOMS = 'cat2';

// Tops data
export const tops = [
  {
    _id: 'top1',
    name: 'Wilson Green Hoodie',
    description: 'A comfortable green hoodie with Wilson branding. Perfect for casual outings.',
    categoryId: CAT_TOPS,
    size: 'M',
    brand: 'Wilson',
    condition: 'Good',
    images: [wilsonHoodie],
    status: 'available',
    featured: true,
    dateAdded: new Date('2024-01-01'),
    price: 10.00,
  },
  {
    _id: 'top2',
    name: 'Green Short Sleeve Shirt',
    description: 'A vintage-style green short sleeve shirt. Great for farmers market visits.',
    categoryId: CAT_TOPS,
    size: 'S',
    brand: 'Vintage',
    condition: 'Excellent',
    images: [greenShortSleeve],
    status: 'available',
    featured: false,
    dateAdded: new Date('2024-01-05'),
    price: 1.00,
  },
  {
    _id: 'top3',
    name: 'NY Yankees Navy T-Shirt',
    description: 'Show your support for the Yankees with this navy blue t-shirt.',
    categoryId: CAT_TOPS,
    size: 'L',
    brand: 'Yankees',
    condition: 'Good',
    images: [yankeesNavyTop],
    status: 'sold',
    featured: false,
    dateAdded: new Date('2024-01-10'),
    price: 1.00,
  },
  {
    _id: 'top4',
    name: 'NY Yankees Grey Hoodie',
    description: 'A comfortable grey hoodie with Yankees branding. Perfect for game day.',
    categoryId: CAT_TOPS,
    size: 'M',
    brand: 'Yankees',
    condition: 'Fair',
    images: [yankeesGreyHoodie],
    status: 'available',
    featured: false,
    dateAdded: new Date('2024-01-15'),
    price: 10.00,
  },
];

// Bottoms data
export const bottoms = [
  {
    _id: 'bottom1',
    name: 'Blue Denim Skirt',
    description: 'A classic blue denim skirt with a vintage feel. Versatile and stylish.',
    categoryId: CAT_BOTTOMS,
    size: 'S',
    brand: 'Levis',
    condition: 'Excellent',
    images: [blueDenimSkirt],
    status: 'available',
    featured: false,
    dateAdded: new Date('2024-01-03'),
    price: 1.00,
  },
  {
    _id: 'bottom2',
    name: 'Red Liverpool Shorts',
    description: 'Show your team spirit with these red Liverpool shorts.',
    categoryId: CAT_BOTTOMS,
    size: 'M',
    brand: 'Liverpool',
    condition: 'Good',
    images: [redLiverpoolShorts],
    status: 'available',
    featured: false,
    dateAdded: new Date('2024-01-07'),
    price: 1.00,
  },
  {
    _id: 'bottom3',
    name: 'Black Pinstripe Pants',
    description: 'Classic black pinstripe pants with a vintage newsboy style.',
    categoryId: CAT_BOTTOMS,
    size: 'L',
    brand: 'Vintage',
    condition: 'Good',
    images: [blackPinstripePants],
    status: 'sold',
    featured: true,
    dateAdded: new Date('2024-01-12'),
    price: 7.00,
  },
];

// Combined products array for search and other pages
export const allProducts = [...tops, ...bottoms];

// Helper function to get product by ID
export const getProductById = (id) => {
  return allProducts.find(product => product._id === id);
}; 