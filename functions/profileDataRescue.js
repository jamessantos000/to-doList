import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

export default async function ProfileDataRescue(callb) {
    const dataProfile = await AsyncStorage.getItem("signed")
        if(JSON.parse(dataProfile) !== null){
            callb(JSON.parse(dataProfile))
        }
}
