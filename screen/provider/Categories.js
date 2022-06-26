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
import { Toast } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import { shop_set } from "../../redux/actions/provider";
import { LinearGradient } from "expo-linear-gradient";
import { useApi } from "../../hooks";

const Categories = ({ navigation }) => {
    const api = useApi();
    const dispatch = useDispatch();
    const { session } = useSelector((state) => state.auth);
    const { pshop } = useSelector((state) => state.provider);

    const defailtstate = {
        skin: false,
        teeth: false,
        nurse: false,
        hair: false,
        eye: false,
    };

    const [businessType, setKind] = useState(pshop ? (pshop.businessType === undefined ? defailtstate : pshop.businessType) : defailtstate);

    const stateChange = (key) => {
        setKind((prevState) => {
            return {
                ...prevState,
                [key]: !businessType[key]
            };
        });
    };

    const save = () => {
        api.update_business({email:session.email,businessType},(data)=>{
            if(data){
                dispatch(shop_set(data));
                Toast.show({
                    text: "saved correctly",
                    buttonText: "Okay",
                    type: "success",
                });
                navigation.navigate('BusinessDetail')
            }
        })
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ flex: 1, justifyContent: "space-between" }}>
            <View style={styles.header}>
                <Text style={styles.title}>Categories</Text>
            </View>
            <View>
                <Text style={{fontSize:20,fontWeight:'bold',textAlign:'center'}}>What kind of business are you?</Text>
            </View>
            <View style={styles.list}>
                <View style={styles.listItem}>
                    <Text>Skin</Text>
                    <CheckBox color="#222" onPress={() => stateChange("skin")} checked={businessType["skin"]} style={styles.checkBox} />
                </View>
                <View style={styles.listItem}>
                    <Text>Teeth</Text>
                    <CheckBox color="#222" onPress={() => stateChange("teeth")} checked={businessType["teeth"]} style={styles.checkBox} />
                </View>
                <View style={styles.listItem}>
                    <Text>Nurse</Text>
                    <CheckBox color="#222" onPress={() => stateChange("nurse")} checked={businessType["nurse"]} style={styles.checkBox} />
                </View>
                <View style={styles.listItem}>
                    <Text>Hair</Text>
                    <CheckBox color="#222" onPress={() => stateChange("hair")} checked={businessType["hair"]} style={styles.checkBox} />
                </View>
                <View style={styles.listItem}>
                    <Text>Eye</Text>
                    <CheckBox color="#222" onPress={() => stateChange("eye")} checked={businessType["eye"]} style={styles.checkBox} />
                </View>
            </View>
            <TouchableOpacity
                onPress={() => save()}
                style={{marginBottom:20}}
            >
                <LinearGradient
                    colors={["#FFB743", "#FFB743"]}
                    style={styles.button}
                >
                    <Text style={{color: "white", fontWeight : 'bold'}}>Save</Text>
                </LinearGradient>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default Categories;

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
        // marginBottom: 12,
        width: width / 1.25,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 18,
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
