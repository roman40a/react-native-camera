export type TLocation = { lat: number; lng: number };
export type TPlace = {
  id: string;
  title: string;
  imageUri: string;
  address: string;
  location: TLocation;
};
