import {TitleOne} from './Titles';
import {View, StyleSheet, TouchableOpacity, Modal, Text, Pressable} from 'react-native';
import commonStyles from '../commonStyles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useState} from 'react';
import { CommonActions } from '@react-navigation/native';
import { TitleTwo } from './Titles';

export const Header =(props, navigation) => {
	const [modalVisible, setModalVisible] = useState(false);
    console.log(props.navigation)
    const logout = () => {
        //delete axios.defaults.headers.common['Authorization']
        navigation.dispatch(
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

	return (
    
		<View>
			<View style={styles.container}>
				<TitleOne title={props.name} />
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
					<View style={styles.centeredView}>
						<View style={styles.modalView}>
                            <Pressable style={styles.pressable}  onPress={logout}>
							    <TitleTwo title={'Sair'}/>
                            </Pressable>
							<Pressable style={styles.pressable} onPress={() => setModalVisible(!modalVisible)}>
								<TitleTwo title={'Fechar'}/>
							</Pressable>
						</View>
					</View>
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
        justifyContent: 'center',
        alignItems: 'center',
      },
      modalView: {
        backgroundColor: commonStyles.colors.cor2,
        borderRadius: 20,
        paddingHorizontal: 50,
        
        alignItems: 'center',
      },
      modalText: {
        marginBottom: 15,
        textAlign: 'center',
        color:commonStyles.colors.cor1
      },
      fechar:{
        color:commonStyles.colors.cor1
      },
      pressable:{
        padding:10,

      }
});
