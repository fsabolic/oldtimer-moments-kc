export const getApiImage = (
  imageId: string,
  width?: number,
  height?: number,
) => {
  const imageUrl =
    "https://" + import.meta.env.VITE_PINATA_GATEWAY + "/ipfs/" + imageId;
  if (width && height) {
    return imageUrl + "?w=" + width + "&h=" + height;
  }
  return imageUrl;
};
