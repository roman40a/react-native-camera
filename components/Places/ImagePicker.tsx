import { FC, useMemo, useState } from "react";
import { Alert, Image, StyleSheet, Text, View } from "react-native";
import {
  ImagePickerResult,
  launchCameraAsync,
  PermissionStatus,
  useCameraPermissions,
} from "expo-image-picker";
import { Colors } from "../../constants/colors";
import { OutlinedButton } from "../UI/OutlinedButton";

export const ImagePicker: FC = () => {
  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();

  const [pickedImage, setPickedImage] = useState<ImagePickerResult | undefined>(
    undefined
  );

  const verifyPermissions = async (): Promise<boolean> => {
    if (cameraPermissionInformation?.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (cameraPermissionInformation?.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions!",
        "Your need to grant camera permissions to use this app."
      );

      return false;
    }

    return true;
  };

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();

    if (hasPermission) {
      const image = await launchCameraAsync({
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.5,
      });

      if (!image.canceled) {
        // @ts-ignore
        delete image.cancelled;

        setPickedImage(image);
      }
    }
  };

  const imageUri: string | undefined = useMemo(() => {
    if (pickedImage && pickedImage.assets) {
      return pickedImage.assets[0].uri;
    }
    return undefined;
  }, [pickedImage]);

  return (
    <View>
      <View style={styles.imagePreview}>
        {imageUri ? (
          <Image style={styles.image} source={{ uri: imageUri }} />
        ) : (
          <Text>No image taking yet</Text>
        )}
      </View>
      <OutlinedButton name="camera" onPress={takeImageHandler}>
        Take image
      </OutlinedButton>
    </View>
  );
};

const styles = StyleSheet.create({
  imagePreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
