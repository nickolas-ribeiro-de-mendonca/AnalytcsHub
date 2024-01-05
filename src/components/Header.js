import {TitleOne} from './Titles';
import {
	View,
	StyleSheet,
	TouchableOpacity,
	Modal,
	Pressable,
} from 'react-native';
import commonStyles from '../commonStyles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useState} from 'react';
import {CommonActions} from '@react-navigation/native';
import {TitleTwo} from './Titles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {SelectList} from 'react-native-dropdown-select-list';

export const Header = ({navigation, name}) => {
	const [modalVisible, setModalVisible] = useState(false);

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
					animationType="fade"
					transparent={true}
					visible={modalVisible}
					onRequestClose={() => {
						Alert.alert('Modal has been closed.');
						setModalVisible(!modalVisible);
					}}>
					<Pressable
						style={styles.modalBackground}
						onPress={() => setModalVisible(!modalVisible)}>
						<View style={styles.centeredView}>
							<View style={styles.modalView}>
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
		position: 'absolute',
		marginLeft: 208,
		paddingTop: 40,
	},
	modalView: {
		backgroundColor: commonStyles.colors.white,
		borderRadius: 20,
		paddingHorizontal: 50,
		borderTopEndRadius: 0,

		alignItems: 'center',
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
	},
	modalBackground: {
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		//justifyContent: 'center',
		//alignItems: 'center',
	},
});
