import { FC, useCallback, useState } from "react";
import { Alert, Image, StyleSheet, Text, View } from "react-native";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";
import { OutlinedButton } from "../UI/OutlinedButton";
import { Colors } from "../../constants/colors";
import { getMapPreview } from "../../utils/location";

export const LocationPicker: FC = () => {
  const [pickedLocation, setPickedLocation] = useState<
    { lat: number; lng: number } | undefined
  >(undefined);

  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();
  console.log("locationPermissionInformation", locationPermissionInformation);

  const verifyPermissions = async (): Promise<boolean> => {
    if (
      locationPermissionInformation?.status === PermissionStatus.UNDETERMINED
    ) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (locationPermissionInformation?.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions!",
        "Your need to location camera permissions to use this app."
      );

      return false;
    }

    return true;
  };

  const getLocationHandler = useCallback(async () => {
    const hasPermission = await verifyPermissions();
    console.log("hasPermission", hasPermission);

    if (!hasPermission) {
      return;
    }

    const location = await getCurrentPositionAsync();
    console.log("location", location);
    setPickedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
  }, []);

  const pickOnMapHandler = useCallback(() => {}, []);

  return (
    <View style={{ height: 300 }}>
      <View style={styles.mapPreview}>
        {pickedLocation ? (
          <Image
            style={styles.image}
            source={{ uri: getMapPreview(pickedLocation) }}
          />
        ) : (
          <Text>No location picked yet.</Text>
        )}
      </View>
      <View style={styles.actions}>
        <OutlinedButton name="location" onPress={getLocationHandler}>
          Locate User
        </OutlinedButton>
        <OutlinedButton name="map" onPress={pickOnMapHandler}>
          Pick on map
        </OutlinedButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: "hidden",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
