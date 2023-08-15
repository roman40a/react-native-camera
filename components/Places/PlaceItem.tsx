import { FC } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { TPlace } from "../../models/place";

type TPlaceItemProps = {
  place: TPlace;
  onSelect: () => void;
};
export const PlaceItem: FC<TPlaceItemProps> = ({
  place: { title, address, imageUri },
  onSelect,
}) => {
  return (
    <Pressable onPress={onSelect}>
      <Image source={{ uri: imageUri }} />
      <View>
        <Text>{title}</Text>
        <Text>{address}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({});
