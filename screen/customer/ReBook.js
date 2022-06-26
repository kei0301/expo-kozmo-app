import React from "react";
import { View, Text, StyleSheet, Dimensions, Image, ScrollView, TouchableOpacity } from "react-native";
import MapView, { Marker } from 'react-native-maps';
import { LinearGradient } from 'expo-linear-gradient';
import { Images, MapStyles } from "../../constants";

const AppointmentDetail = ({ navigation, route }) => {
    route.params.type = 'rebook';
    return(
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>19 March 2020, 8:30 AM</Text>
            </View>
            <View style={styles.statusContainer}>
                <Text style={styles.status}>CONFIRMED</Text>
            </View>
            <View style={styles.service}>
                <View style={styles.mapContainer}>
                    <MapView style={styles.map}
                        initialRegion={{
                            latitude: 37.78825,
                            longitude: -122.4324,
                            latitudeDelta: 0.0032,
                            longitudeDelta: 0.0031,
                        }}
                        customMapStyle={MapStyles.MapStyle1}
                    >
                        <Marker
                            coordinate={{
                                latitude : 37.78815 , longitude : -122.4324
                            }}
                        >
                            <Image source={Images.ICONS.SERVICE_LOCATION} />
                        </Marker>
                    </MapView>
                </View>
                <View style={styles.serviceDescription}>
                    <View>
                        <Text style={styles.serviceDescTitle}>ABC Facial treatment Clinic</Text>
                        <Text style={styles.serviceDescType}>Plastic surgery</Text>
                        <View style={styles.serviceDescWithIcon}>
                            <Image source={Images.ICONS.LOCATION} style={styles.serviceDescIcon} />
                            <Text style={styles.serviceDescContact}>
                                Shakhbout City, Abu Dhabi.  - 4.5KM
                            </Text>
                        </View>
                    </View>
                    <View style={styles.serviceLikeIconContainer}>
                        <Image source={Images.ICONS.GOTO_MAP} />
                    </View>
                </View>
            </View>
            <View style={styles.serviceDivider}>
                <Text style={styles.serviceDividerText}>Booked Services</Text>
            </View>
            <View style={styles.priceContainer}>
                <Text style={styles.priceType}>
                    Plastic surgery
                </Text>
                <View>
                    <Text style={styles.priceValue}>$600</Text>
                    <Text style={styles.priceTime}>27 Sep 8:30 AM</Text>
                </View>
            </View>
            <View style={styles.noteContainer}>
                <Text style={styles.noteTitle}>Note :</Text>
                <Text style={styles.noteContent}>Successful organizations depend on feedback, whether it comes from customers, the public, your own employees or for your events. Thanks to feedback forms, you can gather information and use it to build a better working environment, increase the efficiency of your company, and provide more a valuable service</Text>
            </View>
            <View style={styles.buttonGroup}>
                <TouchableOpacity onPress={() => navigation.navigate("Appointments")}>
                    <LinearGradient
                        colors={["#FFFFFF", "#FFFFFF"]}
                        style={styles.button}
                    >
                            <Text style={styles.buttonText}>CANCEL</Text>
                    </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("AppointmentReschedule",route.params)}>
                    <LinearGradient
                        colors={['#FFB743', '#FFB743']}
                        style={styles.button}
                    >
                            <Text style={[styles.buttonText, styles.black]}>BOOK AGAIN</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default AppointmentDetail;

const { width } = Dimensions.get('screen');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16
    },
    header: {
        height: 56,
        width: width - 32,
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        fontSize: 16
    },
    statusContainer: {
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 4,
        marginBottom: 16
    },
    status: {
        fontSize: 14,
        color: "#21BE13"
    },
    mapContainer: {
        height: 150,
        width: width - 32 - 16,
        borderRadius: 12,
        overflow: "hidden",
    },
    map: {
        width: width - 32 - 16,
        height: 150,
        flex: 1,
    },
    service: {
        width: width - 32,
        padding: 8,
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
    },
    serviceDescription: {
        flexDirection: "row",
        paddingHorizontal: 8,
        justifyContent: "space-between",
        alignItems: "center"
    },
    serviceDescTitle: {
        fontSize: 12,
        marginTop: 8,
        paddingVertical: 4
    },
    serviceDescType: {
        fontSize: 10,
        color: "#979797",
        paddingVertical: 2
    },
    serviceDescWithIcon: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        marginBottom: 8
    },
    serviceDescIcon: {
        width: 7,
        height: 9,
        resizeMode: "contain",
    },  
    serviceDescContact: {
        fontSize: 9,
        color: "#979797",
        paddingHorizontal: 4
    },
    serviceLikeIconContainer: {
        width: 31,
        height: 31,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 116,
        backgroundColor: "#000000"
    },
    priceContainer: {
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        paddingVertical: 16
    },
    priceType: {
        fontSize: 16
    },
    priceValue: {
        fontSize: 16
    },
    priceTime: {
        fontSize: 11
    },
    serviceDivider: {
        marginTop: 24,
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: "#707070"
    },
    serviceDividerText: {
        fontSize: 11,
        color: "rgba(0, 0, 0, .5)"
    },
    noteContainer: {
        marginVertical: 8,
        marginBottom: 32
    },
    noteTitle: {
        fontSize: 11,
        paddingVertical: 8,
        fontWeight: "bold"
    },
    noteContent: {
        fontSize: 11,
        fontWeight: "100"
    },
    buttonGroup: {
        justifyContent: 'space-between',
        flexDirection: "row",
        paddingVertical: 8,
        width: width - 32
    },
    button: {
        width: (width - 32) / 2 - 4,
        alignItems: "center",
        justifyContent: "center",
        height: 43,
        borderRadius: 24,
        borderWidth: 2,
        borderColor: "#EBEBEB",
    },
    black: {
        color: "#000000"
    },
    buttonText: {
        fontSize: 12,
        color: "rgba(0, 0, 0, .5)"
    },
})