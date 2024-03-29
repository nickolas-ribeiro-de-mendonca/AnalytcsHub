import React, { forwardRef, useEffect, useImperativeHandle, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import commonStyles from '../commonStyles';

const Cards = (props, ref) => {
    const [dataCard, setDataCard] = useState()
    const [color, setColor] = useState(commonStyles.colors.cor2)
    const {title,symbol} = props

    
    useImperativeHandle(ref, ()=>({
        setDataCard,
        setColor
    }))
    
	return (
		<View style={[styles.container,{backgroundColor: color}]}>
            <Text style={styles.title}>
                {title}
            </Text>
			<Text style={styles.text}>
                {dataCard}{symbol}
            </Text>
            
		</View>
	);
};

const styles = StyleSheet.create({
    container:{
        borderColor: commonStyles.colors.cor2,
        borderWidth: 1,
        borderRadius: 15,
        padding: 10,
        width: 150,
        justifyContent:'center',
        
    },
    title:{
        fontSize: 12,
        textAlign: 'center',
        color: commonStyles.colors.white
    },
	text: {
        textAlign: 'center',
		fontSize: 25,
		color: commonStyles.colors.white,
	},
});

export default forwardRef(Cards);
