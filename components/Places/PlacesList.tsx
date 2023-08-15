import { FC } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { TPlace } from "../../models/place";
import { PlaceItem } from "./PlaceItem";
import { Colors } from "../../constants/colors";

type TPlacesListProps = {
  places: TPlace[];
};
export const PlacesList: FC<TPlacesListProps> = ({ places }) => {
  if (places.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>
          No places yet - start adding some!
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={places}
      keyExtractor={({ id }) => id}
      renderItem={({ item }) => <PlaceItem place={item} onSelect={() => {}} />}
    />
  );
};

const styles = StyleSheet.create({
  fallbackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    fontSize: 16,
    color: Colors.primary200,
  },
});
