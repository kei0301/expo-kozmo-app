import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector } from "react-redux";
import { Calendar } from 'react-native-calendars';
import { useDispatch } from "react-redux";
import { appoint_set } from "../../redux/actions/provider";
import { useApi } from "../../hooks";
import { Toast } from "native-base";

const AppointmentReschedule = ({ navigation, route }) => {
    const api = useApi();
    const dispatch = useDispatch();
    const [selectedDay, setSelectedDay] = useState(route.params.serviceDate);
    const { session } = useSelector((state) => state.auth);
    const [markedDates, setMarkedDates] = useState({
        [route.params.serviceDate]: {
            selected: true
        }   
    });
    const changebook = ()=>{
        var status = route.params.type = 'rebook' ? 'rescheduled':'completed';
        api.changebook({serviceDate : selectedDay, _id : route.params._id, status,serviceUser:session.email}, (data) => {
            if (data) {
                dispatch(appoint_set(data));
                Toast.show({
                    text: "Change successed.",
                    buttonText: "Okay",
                    type: "success",
                });
            }
        })
        navigation.navigate("Appointments");
    }
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Reschedule Appointment</Text>
            </View>
            <View style={styles.calendar}>
                <Calendar
                    current={selectedDay}
                    enableSwipeMonths={true}
                    showWeekNumbers={false}
                    markedDates={markedDates}
                    theme={{
                        backgroundColor: "transparent",
                        calendarBackground: "transparent",
                        textDayFontSize: 16,
                        textMonthFontSize: 16,
                        textDayHeaderFontSize: 16,
                        selectedDayBackgroundColor: "#FFB743",
                    }}
                    onDayPress={(day) => {
                        setMarkedDates({
                            [day.dateString]: {
                                selected: true,
                            }
                        });
                        setSelectedDay(day.dateString);
                    }}
                />
            </View>
            <View style={styles.buttonGroup}>
                <TouchableOpacity onPress={() => changebook()}>
                    <LinearGradient
                        colors={['#FFB743', '#FFB743']}
                        style={styles.continueButton}
                    >
                            <Text style={styles.buttonText}>Continue</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default AppointmentReschedule;

const { width } = Dimensions.get('screen');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        justifyContent: "space-between"
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
    buttonGroup: {
        justifyContent: 'space-between',
        flexDirection: "row",
        paddingVertical: 16,
        width: width - 32
    },
    continueButton: {
        width: width - 32,
        alignItems: "center",
        justifyContent: "center", 
        height: 43,
        borderRadius: 24,
        borderWidth: 2,
        borderColor: "#EBEBEB",
    },
    buttonText: {
        color: "white",
    }
});