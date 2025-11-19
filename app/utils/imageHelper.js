// utils/imageHelper.js
export const isValidImageUrl = (url) => {
  if (!url || typeof url !== 'string') return false;
  
  // Check if URL contains "undefined" as string
  if (url.includes('undefined')) return false;
  
  // Check if it's a valid URL format
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const getValidImageUrl = (url, fallback = '/placeholder-hat.png') => {
  return isValidImageUrl(url) ? url : fallback;
};
