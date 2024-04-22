export const calculateReadingTime = (text, averageSpeed = 200) => {
  const words = text.split(/\s+/).filter((word) => word !== ''); // Split text into words
  const wordCount = words.length; // Count the number of words
  const readingTime = Math.round(wordCount / averageSpeed); // Calculate reading time in minutes
  return readingTime;
};
