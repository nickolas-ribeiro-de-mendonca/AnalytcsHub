import React, {useState} from 'react';
import {
	Image,
	View,
	StyleSheet,
	TouchableOpacity,
	Text,
	ScrollView,
} from 'react-native';
import commonStyles from '../commonStyles';
import axios from "axios";
import {server, showError, showSuccess} from '../common';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthInput from '../components/AuthInput';

const Login = () => {
	const [email, onChangeEmail] = useState('');
	const [password, onChangePassword] = useState('');

	const signin = async () => {
		try {
			const res = await axios.post(`${server}/signin`, {
				email:email,
				password:password
			})
			console.log('1')
			console.log(res.data)
			AsyncStorage.setItem('userData', JSON.stringify(res.data));
			axios.defaults.headers.common[
				'Authorization'
			] = `bearer ${res.data.token}`;
			
		} catch (error) {
			showError(error);
		}
	};
	const validations = [];
	validations.push(email);
	validations.push(password);
	const validForm = validations.reduce((t, a) => t && a);

	return (
		<ScrollView>
			<View style={styles.container}>
				<Image source={require('../imagem/ah.png')} style={styles.img} />
				<AuthInput
					icon="at"
					placeholder="E-mail"
					value={email}
					style={styles.input}
					onChangeText={email => onChangeEmail(email)}
				/>
				<AuthInput
					icon="lock"
					placeholder="Senha"
					value={password}
					style={styles.input}
					onChangeText={password => onChangePassword(password)}
					secureTextEntry={true}
				/>
				<TouchableOpacity onPress={signin} disabled={!validForm}>
					<View
						style={[
							styles.button,
							!validForm && styles.buttonDisabled, 
						]}>
						<Text style={styles.buttonText}>Entrar</Text>
					</View>
				</TouchableOpacity>
			</View>
		</ScrollView>
	);
};

export default Login;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
	},
	input: {
		color: commonStyles.colors.cor1,
		borderRadius: 10,
		width: 250,
		height: 60,
		margin: 12,
		borderWidth: 2,
		borderColor: commonStyles.colors.cor1,
		backgroundColor: commonStyles.colors.white,
		shadowColor: commonStyles.colors.cor1,
	},
	buttonText: {
		fontFamily: commonStyles.fontFamily,
		color: commonStyles.colors.white,
		padding: 10,
		fontSize: 20,
		borderWidth: 1,
		borderRadius:6,
	},
	buttonDisabled: {
		backgroundColor: commonStyles.colors.cor1,
		opacity: 0.6,
	  },
});
