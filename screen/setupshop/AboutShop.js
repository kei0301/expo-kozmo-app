import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TextInput,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { useDispatch } from "react-redux";
import { register_shop_store } from "../../redux/actions/provider";
import { Toast } from "native-base";
import isEmail from "validator/lib/isEmail";
import { useApi } from "../../hooks";

const AboutShop = ({ navigation }) => {
    const dispatch = useDispatch();
    const api = useApi();

    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [businessName, setBusinessName] = useState("");
    const [businessPhoneNumber, setBusinessPhoneNumber] = useState("");
    const validatePassword = (password) => {
        if (password === "" || password.length <= 8) {
            return false;
        } else {
            return true;
        }
    };
    const nextStep = () => {
        if (
            username &&
            email &&
            phoneNumber &&
            password &&
            businessName &&
            businessPhoneNumber
        ) {
            const isValidEmail = isEmail(email);
            const isValidPassword = validatePassword(password);
            if (isValidEmail) {
                api.emailCheck({email : email},(data)=>{
                    if (data === true) {
                        if (isValidPassword) {
                            dispatch(
                                register_shop_store({
                                    username,
                                    email,
                                    phoneNumber,
                                    password,
                                    businessName,
                                    businessPhoneNumber,
                                })
                            );
                            navigation.navigate("Address");
                        } else {
                            Toast.show({
                                text: "Password should be more than 8 digit",
                                buttonText: "Okay",
                                type: "danger",
                            });
                        }
                    }else if (data === "exist") {
                        Toast.show({
                            text: "Email already exist!",
                            buttonText: "Okay",
                            type: "danger",
                        });
                    }
                })
            } else {
                Toast.show({
                    text: "Email is invalid!",
                    buttonText: "Okay",
                    type: "danger",
                });
            }
        } else {
            Toast.show({
                text: "Please input valid information",
                buttonText: "Okay",
                type: "danger",
            });
        }
    };
    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>About You</Text>
                <Text style={styles.subTitle}>
                    Add a few more details about you to start getting bookings.
                </Text>
            </View>
            <SafeAreaView>
                <TextInput
                    onChangeText={(val) => setUserName(val)}
                    style={styles.input}
                    placeholder="Your Name"
                />
                <TextInput
                    onChangeText={(val) => setEmail(val)}
                    style={styles.input}
                    placeholder="Email"
                />
                <TextInput
                    onChangeText={(val) => setPhoneNumber(val)}
                    style={styles.input}
                    placeholder="Phone Number"
                />
                <TextInput
                    onChangeText={(val) => setPassword(val)}
                    style={styles.input}
                    placeholder="Choose Password"
                    secureTextEntry 
                />
                <TextInput
                    onChangeText={(val) => setBusinessName(val)}
                    style={[styles.input, { marginTop: 16 }]}
                    placeholder="What is the name of your business ?"
                />
                <TextInput
                    onChangeText={(val) => setBusinessPhoneNumber(val)}
                    style={styles.input}
                    placeholder="What is your business phone number ?"
                />
                <TouchableOpacity onPress={() => nextStep()}>
                    <LinearGradient
                        colors={["#FFB743", "#FFB743"]}
                        style={styles.button}
                    >
                        <Text>Continue</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </SafeAreaView>
        </ScrollView>
    );
};

export default AboutShop;

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
    input: {
        borderRadius: 24,
        borderWidth: 2,
        fontSize: 12,
        width: width - 64,
        paddingHorizontal: 24,
        height: 48,
        borderColor: "#EBEBEB",
        backgroundColor: "#fff",
        marginVertical: 4,
    },
    button: {
        borderRadius: 26,
        marginTop: 32,
        justifyContent: "center",
        alignItems: "center",
        width: width - 64,
        height: 48,
    },
});
