import React, {forwardRef, useState, useImperativeHandle, useEffect} from 'react';
import commonStyles from '../commonStyles';
import ModalDropdown from 'react-native-modal-dropdown';
import {StyleSheet, View} from 'react-native';
import { color } from 'react-native-reanimated';

const ModalDrop = (props, ref) => {
	const [list, setList] = useState([]);
	const {initialOption, handle} = props;
	const [selectedOption, setSelectedOption] = useState(initialOption);

	useImperativeHandle(ref, () => ({
		setList,
        getSelected,
        handleOptionSelect,
		getList,
		setSelectedOption,
		teste
	}));

	const handleOptionSelect = (index, value) => {
		console.log('Tem utilidade?')
		setSelectedOption(value);
        return index
	};
    const getSelected = () => {
        return selectedOption
    }

	const getList = () => {
		return list
	}
	const teste = (user) => {
		console.log('entrou ', user)
		setSelectedOption(user)
	}
	console.log('renderizou item ')
	
	return (
		<View>
			<ModalDropdown
				options={list}
				defaultValue={initialOption}
                saveScrollPosition={false}
                showsVerticalScrollIndicator={false}
                onSelect={(index, value) => {
					console.log('index: ', index, 'value: ', value)
					console.log(' ')
                    handle(value);
                    handleOptionSelect(value);
                  }}
				dropdownTextHighlightStyle={{color: commonStyles.colors.white}}
				style={styles.dropdown}
				textStyle={styles.dropdownText}
				dropdownStyle={styles.dropdownDropdown}
				dropdownTextStyle={styles.dropdownDropdownText}
			/>
		</View>
	);
};

export default forwardRef(ModalDrop);

const styles = StyleSheet.create({
	dropdown: {
		width: 150,
		height: 50,
		borderWidth: 1,
		borderColor: commonStyles.colors.white,
		borderRadius: 5,
		justifyContent: 'center',
	},
	dropdownText: {
		fontSize: 16,
		color: commonStyles.colors.white,
		paddingHorizontal: 10,
		paddingVertical: 10,
		fontFamily: commonStyles.fontFamily,
	},
	dropdownDropdown: {
		width: 148,
		height: 'auto',
		maxHeight: 230,
		borderColor: commonStyles.colors.white,
		borderWidth: 1,
		borderRadius: 5,
		marginTop: 4,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: commonStyles.colors.cor1,
	},
	dropdownDropdownText: {
		color: commonStyles.colors.white,
		fontSize: 16,
		paddingHorizontal: 10,
		paddingVertical: 10,
		backgroundColor: commonStyles.colors.cor1,
		fontFamily: commonStyles.fontFamily,
	},
});
