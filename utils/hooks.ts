import { useNavigation, useRoute } from "@react-navigation/native";
import { NavigationProp, RouteProp } from "@react-navigation/core/src/types";

export type TParamList = {
  AllPlaces: undefined;
  AddPlace: undefined;
};
export const useAppNavigation = useNavigation<NavigationProp<TParamList>>;

export const useAppRoute = useRoute<RouteProp<TParamList>>;
