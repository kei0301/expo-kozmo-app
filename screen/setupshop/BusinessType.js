import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { CheckBox } from "native-base";
import { useDispatch } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import { register_shop_store } from "../../redux/actions/provider";

const BusinessType = ({ navigation }) => {
    const dispatch = useDispatch();
    const [kind, setKind] = useState({
        skin: false,
        teeth: false,
        nurse: false,
        hair: false,
        eye: false,
    });

    const stateChange = (key) => {
        setKind((prevState) => {
            return {
                ...prevState,
                [key]: !kind[key]
            };
        });
    };

    const nextStep = () => {
        dispatch(register_shop_store({
            businessType: kind
        }));
        navigation.navigate("ProvidingService")
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>
                    What kind of business are you ?
                </Text>
            </View>
            <View style={styles.list}>
                <View style={styles.listItem}>
                    <Text>Skin</Text>
                    <CheckBox color="#222" onPress={() => stateChange("skin")} checked={kind["skin"]} style={styles.checkBox} />
                </View>
                <View style={styles.listItem}>
                    <Text>Teeth</Text>
                    <CheckBox color="#222" onPress={() => stateChange("teeth")} checked={kind["teeth"]} style={styles.checkBox} />
                </View>
                <View style={styles.listItem}>
                    <Text>Nurse</Text>
                    <CheckBox color="#222" onPress={() => stateChange("nurse")} checked={kind["nurse"]} style={styles.checkBox} />
                </View>
                <View style={styles.listItem}>
                    <Text>Hair</Text>
                    <CheckBox color="#222" onPress={() => stateChange("hair")} checked={kind["hair"]} style={styles.checkBox} />
                </View>
                <View style={styles.listItem}>
                    <Text>Eye</Text>
                    <CheckBox color="#222" onPress={() => stateChange("eye")} checked={kind["eye"]} style={styles.checkBox} />
                </View>
            </View>
            <TouchableOpacity
                onPress={() => nextStep()}
            >
                <LinearGradient
                    colors={["#FFB743", "#FFB743"]}
                    style={styles.button}
                >
                    <Text>Continue</Text>
                </LinearGradient>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default BusinessType;

const { width } = Dimensions.get("screen");
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: width,
        backgroundColor: "#F8F8F8",
        paddingHorizontal: 32,
    },
    header: {
        height: 56,
        marginTop: 64,
        marginBottom: 32,
        width: width,
        justifyContent: "center",
        alignItems: "flex-start",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#000000",
    },
    button: {
        borderRadius: 26,
        marginTop: 32,
        justifyContent: "center",
        alignItems: "center",
        width: width - 64,
        height: 48,
    },
    checkBox: {
        margin: -15,
        marginRight: 15,
        width: 18,
        height: 18,
        borderColor: "#222",
        borderWidth: 6,
        justifyContent: "center",
        alignItems: "center"
    },
    listItem: {
        borderRadius: 24,
        borderWidth: 2,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        fontSize: 12,
        width: width - 64,
        paddingHorizontal: 24,
        height: 48,
        borderColor: "#EBEBEB",
        backgroundColor: "#fff",
        marginVertical: 4,
    },
});
