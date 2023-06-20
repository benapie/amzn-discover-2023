export const floodFill = (options: {
  // Image grid
  image: number[][];
  // Starting row
  sr: number;
  // Starting column
  sc: number;
  newColor: number;
}) => {
  const { image, sr, sc, newColor } = options;

  const rows = image.length;
  const cols = image[0].length;

  const isOutOfBounds = sr >= rows || sc >= cols;
  const isEmpty = rows === 0 || cols === 0;

  if (isOutOfBounds) {
    console.error("Out of bounds, returning original image");
    return image;
  }

  if (isEmpty) {
    console.warn("Empty image, returning original image");
    return image;
  }

  const oldColor = image[sr][sc];

  if (oldColor === newColor) return image;

  recursion({ image, row: sr, col: sc, newColor, oldColor });

  return image;
};

const recursion = (options: {
  // Image grid
  image: number[][];
  row: number;
  col: number;
  newColor: number;
  oldColor: number;
}) => {
  const { image, row, col, newColor, oldColor } = options;

  const rows = image.length;
  const cols = image[0].length;

  const currentColor = image[row][col];

  const shouldColorPixel = currentColor === oldColor;

  if (shouldColorPixel) {
    image[row][col] = newColor;

    if (row + 1 < rows) {
      recursion({ image, row: row + 1, col, newColor, oldColor });
    }
    if (row >= 1) {
      recursion({ image, row: row - 1, col, newColor, oldColor });
    }
    if (col + 1 < cols) {
      recursion({ image, row, col: col + 1, newColor, oldColor });
    }
    if (col >= 1) {
      recursion({ image, row, col: col - 1, newColor, oldColor });
    }
  }
};
