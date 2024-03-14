import {TitleOne} from './Titles';
import {View,StyleSheet,TouchableOpacity,Modal,	Pressable, ActivityIndicator} from 'react-native';
import commonStyles from '../commonStyles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useEffect, useState} from 'react';
import {CommonActions} from '@react-navigation/native';
import {TitleTwo} from './Titles';
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';

export const Header = ({navigation, name, onRefreshData }) => {

	const [modalVisible, setModalVisible] = useState(false);
	const [userName, setUserName] = useState('')

	const [loading, setLoading] = useState(false); 

	const logout = () => {
		delete axios.defaults.headers.common['Authorization'];
		AsyncStorage.removeItem('userData');
		navigation.dispatch(
			CommonActions.reset({
				index: 0,
				routes: [{name: 'Login'}],
			}),
		);
	};

	const userData = async () => {
		try {
			var userData = '';
			const value = await AsyncStorage.getItem('userData');
			if (value !== null) {
				userData = JSON.parse(value);
				setUserName(userData.name)
			} 
		} catch (error) {
			console.log(error);
		}
	};
	
	useEffect(() => {
		userData()
	}, []);

	const handleRefreshData = async () => {
		setLoading(true); 
		setTimeout(async () => {
			await onRefreshData();
			setLoading(false);
		}, 1500);
	};
	
	return (
		<View>
			<View style={styles.container}>
				<TitleOne title={name} />
			</View>
			<View style={styles.icon}>
				<TouchableOpacity onPress={() => setModalVisible(true)}>
					<FontAwesome5 name={'bars'} size={25} />
				</TouchableOpacity>
			</View>
			<View style={styles.centeredView}>
				<Modal
					statusBarTranslucent= {true}
					animationType="fade"
					transparent={true}
					visible={modalVisible}
					onRequestClose={() => {setModalVisible(!modalVisible)}}>
					<Pressable
						style={styles.modalBackground}
						onPress={() => setModalVisible(!modalVisible)}>
						<View style={styles.centeredView}>
							<View style={styles.modalView}>
								<TitleOne title={userName} color={commonStyles.colors.cor2}/>
								<Pressable style={styles.pressable} 
									onPress={handleRefreshData}
								>	
								<View style={{flexDirection:'row', marginLeft:'37%'}}>
									<TitleTwo title={'Atualizar Dados  '}color={commonStyles.colors.cor2}/>
									{loading ? (
                                        <ActivityIndicator size="small" color={commonStyles.colors.lightGray} />
                                    ) : <></>}
									
									
								</View>
								</Pressable>
								<Pressable style={styles.pressable} onPress={logout}>
									<TitleTwo
										title={'Sair'}
										color={commonStyles.colors.cor2}
									/>
								</Pressable>
								<Pressable
									style={styles.pressable}
									onPress={() => setModalVisible(!modalVisible)}>
									<TitleTwo
										title={'Fechar'}
										color={commonStyles.colors.cor1}
									/>
								</Pressable>
							</View>
						</View>
					</Pressable>
				</Modal>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: commonStyles.colors.cor2,
		borderBottomRightRadius: 15,
		borderBottomLeftRadius: 15,
		alignItems: 'center',
		marginBottom: -37,
	},
	icon: {
		marginBottom: 20,
		alignItems: 'flex-end',
		marginRight: 20,
		marginBottom: 40,
	},
	centeredView: {
		flex: 1,
    	justifyContent: 'flex-end',
		alignItems:'center',
	},
	modalView: {
		backgroundColor: commonStyles.colors.white,
		borderTopLeftRadius: 23,
		borderTopRightRadius:23,
		alignItems: 'center',
		width: '100%'
	},
	modalText: {
		marginBottom: 15,
		textAlign: 'center',
		color: commonStyles.colors.amarelo,
	},
	fechar: {
		color: commonStyles.colors.cor1,
	},
	pressable: {
		padding: 10,
		width: '100%'
	},
	modalBackground: {
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.7)',
	},
});
