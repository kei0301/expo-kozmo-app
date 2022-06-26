import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TextInput,
    TouchableOpacity,
    ScrollView,
} from "react-native";

import { CheckBox } from "native-base";
import { useDispatch } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import { register_shop_store } from "../../redux/actions/provider";

const OpeningHours = ({ navigation }) => {
    const dispatch = useDispatch();
    const [openingHours, setOpeningHours] = useState({
        monday: {
            status: false,
            from: "08:00",
            to: "18:00"
        },
        tuesday: {
            status: false,
            from: "08:00",
            to: "18:00"
        },
        wednesday: {
            status: false,
            from: "08:00",
            to: "18:00"
        },
        thursday: {
            status: false,
            from: "08:00",
            to: "18:00"
        },
        friday: {
            status: false,
            from: "08:00",
            to: "18:00"
        },
        saturday: {
            status: false,
            from: "08:00",
            to: "18:00"
        },
        sunday: {
            status: false,
            from: "08:00",
            to: "18:00"
        },
    });

    const fromChange = (key, val) => {
        setOpeningHours((prevState) => {
            return {
                ...prevState,
                [key]: {
                    to: openingHours[key].to,
                    from: val,
                    status: openingHours[key].status,
                },
            };
        });
        return;
    };
    const toChange = (key, val) => {
        setOpeningHours((prevState) => {
            return {
                ...prevState,
                [key]: {
                    to: val,
                    from: openingHours[key].from,
                    status: openingHours[key].status,
                },
            };
        });
        return;
    };
    const nextStep = () => {
        dispatch(register_shop_store({
            openingHours
        }))
        navigation.navigate("WorkPlace");
    }
    const stateChange = (key) => {
        setOpeningHours((prevState) => {
            return {
                ...prevState,
                [key]: {
                    to: openingHours[key].to,
                    from: openingHours[key].from,
                    status: !openingHours[key].status,
                },
            };
        });
    };
    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Your Opening Hours</Text>
                <Text style={styles.subTitle}>
                    When clients can book with you?
                </Text>
            </View>
            <View style={styles.list}>
                <View style={styles.listItem}>
                    <CheckBox
                        style={styles.checkBox}
                        color={"#222222"}
                        checked={openingHours["monday"].status}
                        onPress={() => stateChange("monday")}
                    />
                    <Text>Monday</Text>
                    <View style={styles.inputGroup}>
                        <TextInput
                            value={openingHours["monday"].from}
                            style={styles.input}
                            onChangeText={(val) => fromChange("monday", val)}
                            placeholder="00:00"
                        />
                        <TextInput
                            value={openingHours["monday"].to}
                            style={styles.input}
                            onChangeText={(val) => toChange("monday", val)}
                            placeholder="00:00"
                        />
                    </View>
                </View>
                <View style={styles.listItem}>
                    <CheckBox
                        style={styles.checkBox}
                        color={"#222222"}
                        checked={openingHours["tuesday"].status}
                        onPress={() => stateChange("tuesday")}
                    />
                    <Text>Tuesday</Text>
                    <View style={styles.inputGroup}>
                        <TextInput
                            value={openingHours["tuesday"].from}
                            style={styles.input}
                            onChangeText={(val) => fromChange("tuesday", val)}
                            placeholder="00:00"
                        />
                        <TextInput
                            value={openingHours["tuesday"].to}
                            style={styles.input}
                            onChangeText={(val) => toChange("tuesday", val)}
                            placeholder="00:00"
                        />
                    </View>
                </View>
                <View style={styles.listItem}>
                    <CheckBox
                        style={styles.checkBox}
                        color={"#222222"}
                        checked={openingHours["wednesday"].status}
                        onPress={() => stateChange("wednesday")}
                    />
                    <Text>Wednesday</Text>
                    <View style={styles.inputGroup}>
                        <TextInput
                            value={openingHours["wednesday"].from}
                            style={styles.input}
                            onChangeText={(val) => fromChange("wednesday", val)}
                            placeholder="00:00"
                        />
                        <TextInput
                            value={openingHours["wednesday"].to}
                            style={styles.input}
                            onChangeText={(val) => toChange("wednesday", val)}
                            placeholder="00:00"
                        />
                    </View>
                </View>
                <View style={styles.listItem}>
                    <CheckBox
                        style={styles.checkBox}
                        color={"#222222"}
                        checked={openingHours["thursday"].status}
                        onPress={() => stateChange("thursday")}
                    />
                    <Text>Thursday</Text>
                    <View style={styles.inputGroup}>
                        <TextInput
                            value={openingHours["thursday"].from}
                            style={styles.input}
                            onChangeText={(val) => fromChange("thursday", val)}
                            placeholder="00:00"
                        />
                        <TextInput
                            value={openingHours["thursday"].to}
                            style={styles.input}
                            onChangeText={(val) => toChange("thursday", val)}
                            placeholder="00:00"
                        />
                    </View>
                </View>
                <View style={styles.listItem}>
                    <CheckBox
                        style={styles.checkBox}
                        color={"#222222"}
                        checked={openingHours["friday"].status}
                        onPress={() => stateChange("friday")}
                    />
                    <Text>Friday</Text>
                    <View style={styles.inputGroup}>
                        <TextInput
                            value={openingHours["friday"].from}
                            style={styles.input}
                            onChangeText={(val) => fromChange("friday", val)}
                            placeholder="00:00"
                        />
                        <TextInput
                            value={openingHours["friday"].to}
                            style={styles.input}
                            onChangeText={(val) => toChange("friday", val)}
                            placeholder="00:00"
                        />
                    </View>
                </View>
                <View style={styles.listItem}>
                    <CheckBox
                        style={styles.checkBox}
                        color={"#222222"}
                        checked={openingHours["saturday"].status}
                        onPress={() => stateChange("saturday")}
                    />
                    <Text>Saturday</Text>
                    <View style={styles.inputGroup}>
                        <TextInput
                            value={openingHours["saturday"].from}
                            style={styles.input}
                            onChangeText={(val) => fromChange("saturday", val)}
                            placeholder="00:00"
                        />
                        <TextInput
                            value={openingHours["saturday"].to}
                            style={styles.input}
                            onChangeText={(val) => toChange("saturday", val)}
                            placeholder="00:00"
                        />
                    </View>
                </View>
                <View style={styles.listItem}>
                    <CheckBox
                        style={styles.checkBox}
                        color={"#222222"}
                        checked={openingHours["sunday"].status}
                        onPress={() => stateChange("sunday")}
                    />
                    <Text>Sunday</Text>
                    <View style={styles.inputGroup}>
                        <TextInput
                            value={openingHours["sunday"].from}
                            style={styles.input}
                            onChangeText={(val) => fromChange("sunday", val)}
                            placeholder="00:00"
                        />
                        <TextInput
                            value={openingHours["sunday"].to}
                            style={styles.input}
                            onChangeText={(val) => toChange("sunday", val)}
                            placeholder="00:00"
                        />
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
            </View>
        </ScrollView>
    );
};

export default OpeningHours;
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
    subTitle: {
        fontSize: 14,
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
    inputGroup: {
        flexDirection: "row"
    }, 
    input: {
        width: 60,
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
    button: {
        borderRadius: 26,
        marginTop: 32,
        justifyContent: "center",
        alignItems: "center",
        width: width - 64,
        height: 48,
        marginBottom: 32
    },
});
