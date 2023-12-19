import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import commonStyles from '../commonStyles';

export const Cards = (props) => {
	return (
		<View style={[styles.container,{backgroundColor: props.bgcolor}]}>
            <Text style={styles.title}>
                {props.title}
            </Text>
			<Text style={styles.text} >
                {props.data}{props.symbol}
            </Text>
            
		</View>
	);
};

const styles = StyleSheet.create({
    container:{
        borderColor: commonStyles.colors.cor2,
        borderWidth: 0.5,
        borderRadius: 5,
        width: 150,
        height: 80,
        justifyContent:'center',
        
    },
    title:{
        fontSize:20,
        textAlign:'center',
        textAlignVertical:'bottom',
        color: commonStyles.colors.white
    },
	text: {
        textAlign: 'center',
		fontSize: 35,
		color: commonStyles.colors.white,
	},
});
