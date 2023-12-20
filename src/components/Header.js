import React, {Component} from 'react';
import {TitleOne} from './Titles';
import {View, StyleSheet} from 'react-native';
import commonStyles from '../commonStyles';

export const Header = (props) => {
	return (
        <View style={styles.container}>
            <TitleOne title={props.name}/>
        </View>
    );
};

const styles = StyleSheet.create({
	container: {
        backgroundColor: commonStyles.colors.cor2,
        borderBottomRightRadius:15,
        borderBottomLeftRadius:15,
        marginBottom:20
	},
});
