/**
 * Format price to currency string
 * @param {number} price - Price value
 * @param {string} currency - Currency symbol (default: $)
 * @returns {string} Formatted price string
 */
export const formatPrice = (price, currency = '$') => {
  if (typeof price !== 'number' || isNaN(price)) {
    return `${currency}0.00`;
  }
  return `${currency}${price.toFixed(2)}`;
};

/**
 * Format product details string
 * @param {Object} product - Product object
 * @returns {string} Formatted details string
 */
export const formatProductDetails = (product) => {
  const { brand, size, condition } = product;
  const parts = [brand, size, condition].filter(Boolean);
  return parts.join(' • ');
};

/**
 * Pluralize text based on count
 * @param {number} count - Count value
 * @param {string} singular - Singular form
 * @param {string} plural - Plural form (optional, defaults to singular + 's')
 * @returns {string} Pluralized text
 */
export const pluralize = (count, singular, plural = `${singular}s`) => {
  return count === 1 ? singular : plural;
};

/**
 * Capitalize first letter of string
 * @param {string} str - String to capitalize
 * @returns {string} Capitalized string
 */
export const capitalize = (str) => {
  if (!str || typeof str !== 'string') return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @param {string} suffix - Suffix to add (default: '...')
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength, suffix = '...') => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength - suffix.length) + suffix;
};

/**
 * Format item count for display
 * @param {number} count - Item count
 * @param {string} itemType - Type of item (default: 'item')
 * @returns {string} Formatted count string
 */
export const formatItemCount = (count, itemType = 'item') => {
  return `${count} ${pluralize(count, itemType)}`;
};

/**
 * Generate initials from name
 * @param {string} name - Full name
 * @returns {string} Initials
 */
export const getInitials = (name) => {
  if (!name) return '';
  return name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .join('')
    .substring(0, 2);
};

/**
 * Format file size
 * @param {number} bytes - File size in bytes
 * @returns {string} Formatted file size
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Format date to readable string
 * @param {Date|string} date - Date to format
 * @param {Object} options - Intl.DateTimeFormat options
 * @returns {string} Formatted date string
 */
export const formatDate = (date, options = { 
  year: 'numeric', 
  month: 'long', 
  day: 'numeric' 
}) => {
  if (!date) return '';
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-US', options).format(dateObj);
}; 