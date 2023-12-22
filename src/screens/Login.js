import React from 'react';
import {TitleTwo} from '../components/Titles';
import {Image, View, StyleSheet, TextInput, Button} from 'react-native';
import commonStyles from '../commonStyles';

const Login = () => {
	const [text, onChangeText] = React.useState('');
	const [number, onChangeNumber] = React.useState('');

	return (
		<View style={styles.container}>
			<Image source={require('../imagem/ah.png')} style={styles.img} />
			<TextInput
				style={styles.input}
				onChangeText={onChangeText}
				value={text}
				placeholder="Usuário"
				placeholderTextColor={commonStyles.colors.cor1}
				returnKeyType="go"
			/>
			<TextInput
				style={styles.input}
				onChangeText={onChangeNumber}
				value={number}
				placeholder="Senha"
				keyboardType="numeric"
				placeholderTextColor={commonStyles.colors.cor1}
			/>
			<Button
				title="Entrar"
				style={styles.btn}
			/>
		</View>
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
		height: 50,
		margin: 12,
		borderWidth: 2,
		padding: 10,
		borderColor: commonStyles.colors.cor1,
		backgroundColor: commonStyles.colors.white,
		shadowColor: commonStyles.colors.cor1,
	},
    btn:{
        margin:100
    }
});
