import React, { useEffect, useState } from "react";
import {
    View,
    StyleSheet,
    Dimensions,
    SafeAreaView,
    TextInput,
    Image,
    TouchableOpacity,
    Text,
} from "react-native";
import MapPicker from "react-native-map-picker";
import { Images, MapStyles } from "../../constants";
import Geocoder from 'react-native-geocoding';
import { Toast } from "native-base";

const Explore = ({ navigation ,route}) => {
    const [lat, setLat] = useState(route.params ? route.params.geocode ? (route.params.geocode.split(","))[0]:37.78825:37.78825);
    const [lon, setLon] = useState(route.params ? route.params.geocode ? (route.params.geocode.split(","))[1]:-122.4324:-122.4324);
    useEffect(() => {

    }, []);
    const _attemptReverseGeocodeAsync = async (lat, lng) => {
        await fetch('http://api.positionstack.com/v1/reverse?access_key=b454a3c464717c71048904a0c104859a&query=' + lat + ',' + lng)
            .then((response) => response.json())
            .then((json) => {
                var j = json.data.length;
                for (let i = 0; i < json.data.length; i++) {
                    if (json.data[i].street && json.data[i].name && json.data[i].locality && json.data[i].postal_code) {
                        return navigation.navigate("BusinessAddress", json.data[i])
                    }
                    j--;
                }
                if (j === 0) {
                    return Toast.show({
                        text: "choose exactly!",
                        buttonText: "Okay",
                        type: "danger",
                    });
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <View style={styles.container}>
            <MapPicker
                initialCoordinate={{
                    latitude: lat*1,
                    longitude: lon*1,
                }}
                buttonText={"Continue"}
                buttonStyle={styles.button}
                onLocationSelect={({ latitude, longitude }) =>
                    _attemptReverseGeocodeAsync(latitude, longitude)
                }
            />
            <View style={styles.searchContainer}>
                <SafeAreaView style={styles.inputRoot}>
                    <TextInput
                        style={styles.input}
                        placeholder="Search Location"
                    />
                    <Image
                        source={Images.ICONS.SEARCH}
                        style={styles.inputIcon}
                    />
                </SafeAreaView>
            </View>
        </View>
    );
};

export default Explore;

const { height, width } = Dimensions.get("screen");
const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "relative",
    },
    map: {
        width: width,
        height: height,
    },
    searchContainer: {
        position: "absolute",
        top: 8,
        paddingLeft: 48,
        paddingRight: 16,
    },
    inputRoot: {
        position: "relative",
        padding: 0,
    },
    input: {
        borderRadius: 24,
        borderWidth: 2,
        fontSize: 12,
        width: width - 48 - 16,
        paddingHorizontal: 24,
        paddingLeft: 48,
        height: 43,
        borderColor: "#EBEBEB",
        backgroundColor: "#fff",
        marginVertical: 4,
    },
    inputIcon: {
        position: "absolute",
        width: 16,
        height: 16,
        top: 51 / 2 - 8,
        left: 18,
        zIndex: 2,
    },
    touchableButton: {
        position: "absolute",
        left: 32,
        width: width - 64,
        bottom: 24 + 16,
        alignItems: "center",
    },
    button: {
        borderRadius: 26,
        justifyContent: "center",
        alignItems: "center",
        width: width - 64,
        height: 48,
        backgroundColor: "#FFB743",
    },
});
