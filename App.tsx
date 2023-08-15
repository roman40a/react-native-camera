import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AllPlacesList } from "./screens/AllPlacesList";
import { AddPlace } from "./screens/AddPlace";
import { IconButton } from "./components/UI/IconButton";
import { TParamList } from "./utils/hooks";
import { NavigationProp } from "@react-navigation/core/src/types";
import { Colors } from "./constants/colors";

const Stack = createNativeStackNavigator<TParamList>();

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: Colors.primary500 },
            headerTintColor: Colors.gray700,
            contentStyle: { backgroundColor: Colors.gray700 },
          }}
        >
          <Stack.Screen
            name="AllPlaces"
            component={AllPlacesList}
            options={({
              navigation,
            }: {
              navigation: NavigationProp<TParamList>;
            }) => ({
              title: "Your favorite places",
              headerRight: ({ tintColor }) => (
                <IconButton
                  name="add"
                  size={24}
                  color={tintColor}
                  onPress={() => navigation.navigate("AddPlace")}
                />
              ),
            })}
          />
          <Stack.Screen
            name="AddPlace"
            component={AddPlace}
            options={{
              title: "Add a new place",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
