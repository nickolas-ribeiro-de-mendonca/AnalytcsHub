import React from "react";
import { StyleSheet, Text } from "react-native";

const TitleOne = (props) => {
    return (
        <Text style={styles.titleOne}>{props.title}</Text>
    )
}

export {TitleOne}

const styles = StyleSheet.create({
    titleOne:{
        textAlign:"center",
        fontSize: 30,
        paddingVertical: 20
    },
})