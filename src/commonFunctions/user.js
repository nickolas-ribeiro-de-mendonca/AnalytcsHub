import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const retrieveData = async () => {
    
    try {
        var userData = '';
        const value = await AsyncStorage.getItem('userData');
        if (value !== null) {
            userData = JSON.parse(value);
            setUser(userData.name)
        } 
    } catch (error) {
        console.log(error);
    }
};

export {retrieveData}