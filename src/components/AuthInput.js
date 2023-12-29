import React from "react";
import { View, TextInput, StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import commonStyles from "../commonStyles";


export default props => {
	return(
		<View style={[styles.container, props.style]}>
			<Icon name={props.icon} style={styles.icon} size={20} />
			<TextInput {...props} style={styles.input}/>
		</View>
	)
}

const styles = StyleSheet.create({
	container:{
		width:'100%',
		height:40,
		backgroundColor:'black',
		borderRadius:20,
		flexDirection:"row",
		alignItems:"center"
	},
	input:{
		color:'#333',
		marginLeft:20
	},
	icon:{
        color:commonStyles.colors.cor6,
		marginLeft:20
	},
})