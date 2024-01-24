import React, { Component } from 'react'
import {View,ActivityIndicator,StyleSheet, Text, Image} from 'react-native'
import { CommonActions } from '@react-navigation/native';
import axios from 'axios'
import AsyncStorage from "@react-native-async-storage/async-storage";
import commonStyles from '../commonStyles';

export default class LoginOrApp extends Component {

    componentDidMount = async () => {
        const userDataJson = await AsyncStorage.getItem('userData')
        let userData = null

        try {
            userData = JSON.parse(userDataJson)
        } catch (e) {
            console.log(e)
        }
        if (userData && userData.token) {
            axios.defaults.headers.common['Authorization'] = `bearer ${userData.token}`
            this.props.navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [
                        {
                            name: 'Home',
                            params: userData,
                        },
                    ],
                })
            );
        } else {
            this.props.navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [
                        {
                            name: 'Login',
                        },
                    ],
                })
            )
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={{paddingBottom: 10}}>Carregando...</Text>
                <ActivityIndicator size='large' color={commonStyles.colors.lightGray}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: commonStyles.colors.cor1
    }
})