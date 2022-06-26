import "react-native-gesture-handler";
import React, { useState } from "react";
import { StatusBar, Image } from "react-native";
import { Root } from "native-base";
import { Asset } from "expo-asset";
import { NavigationContainer } from "@react-navigation/native";
import { Images } from "./constants";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

// Import Screens
import Router from "./navigation/Router";

// Import Providers
import { Provider } from "react-redux";

// ** Initialize Store
import configureStore from "./redux/store";

const App = () => {
    const store = configureStore({});
    // Define States
    const [isLoading, setIsLoading] = useState(true);
    // Import Assets
    const assetImages = [Images.BASE.LOGO];
    // Define Actions
    const cacheImages = (images) => {
        return images.map((image) => {
            if (typeof image === "string") {
                return Image.prefetch(image);
            } else {
                return Asset.fromModule(image).downloadAsync();
            }
        });
    };
    const _loadResourcesAsync = async () => {
        return await Promise.all([
            ...cacheImages(assetImages),
            Font.loadAsync({
                Roboto: require("native-base/Fonts/Roboto.ttf"),
                Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
            }),
        ]);
    };
    const _handleLoadingError = (error) => {
        // In this case, you might want to report the error to your error
        // reporting service, for example Sentry
        console.warn(error);
    };
    const _handleFinishLoading = () => {
        setIsLoading(false);
    };
    // Render App
    if (isLoading) {
        return (
            <AppLoading
                startAsync={_loadResourcesAsync}
                onError={_handleLoadingError}
                onFinish={_handleFinishLoading}
            />
        );
    } else {
        return (
            <NavigationContainer>
                <Provider store={store}>
                    <Root>
                        <StatusBar barStyle="default" />
                        <Router />
                    </Root>
                </Provider>
            </NavigationContainer>
        );
    }
};
export default App;
