import { FC } from "react";
import { Text } from "react-native";
import { PlacesList } from "../components/Places/PlacesList";

export const AllPlacesList: FC = () => {
  return <PlacesList places={[]} />;
};
