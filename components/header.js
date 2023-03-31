import React, { useContext } from "react";
import { View, Text, Image, Platform } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import styles from "../src/style/styles";
import { TaskContext } from "../functions/context";

export default function Header(props) {
    const { orderBy, setOrderBy } = useContext(TaskContext)
    const { active } = props
    return (
        <View style={styles.header}>
            <Ionicons name="filter-outline" size={24} color="white" onPress={() => setOrderBy(!orderBy) } />
            <Text style={styles.txtWhite}>{active}</Text>
            <Image
                style={{ width: 50, height: 50, borderRadius: 50 }}
                source={{
                    uri: 'https://images.ctfassets.net/lh3zuq09vnm2/yBDals8aU8RWtb0xLnPkI/19b391bda8f43e16e64d40b55561e5cd/How_tracking_user_behavior_on_your_website_can_improve_customer_experience.png',
                }}
            />
        </View>
    );
}