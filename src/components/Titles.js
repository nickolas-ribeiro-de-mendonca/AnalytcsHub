import React from "react";
import { StyleSheet, Text } from "react-native";
import commonStyles from "../commonStyles";
import { color } from "react-native-reanimated";

const TitleOne = (props) => {
    return (
        <Text style={styles.titleOne}>{props.title}</Text>
    )
}
const TitleTwo = (props) => {
    return (
        <Text style={styles.titleTwo}>{props.title}</Text>
    )
}

export {TitleOne, TitleTwo}

const styles = StyleSheet.create({
    titleOne:{
        textAlign:"center",
        fontSize: 20,
        paddingVertical: 20,
        fontFamily: 'Roboto-Bold',
        color: commonStyles.colors.white
    },
    titleTwo:{
        textAlign: "center",
        fontSize: 15,
        paddingVertical: 5,
        fontFamily: 'Roboto-Bold',
        color: commonStyles.colors.white
    }
})