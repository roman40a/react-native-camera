const GOOGLE_API_KEY = "AIzaSyA1zVst_OlCUQ5EYa78XZPOr9oBuVCzSV4";

export const getMapPreview = ({
  lat,
  lng,
}: {
  lat: number;
  lng: number;
}): string => {
  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${lng}&key=AIzaSyA1zVst_OlCUQ5EYa78XZPOr9oBuVCzSV4&signature=${GOOGLE_API_KEY}`;
  console.log("imagePreviewUrl", imagePreviewUrl);
  return imagePreviewUrl;
};
