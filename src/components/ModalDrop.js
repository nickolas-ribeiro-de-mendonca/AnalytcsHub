import React, {forwardRef, useState, useImperativeHandle} from 'react';
import commonStyles from '../commonStyles';
import ModalDropdown from 'react-native-modal-dropdown';
import { StyleSheet, View} from 'react-native';
import { Text } from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronDown} from '@fortawesome/free-solid-svg-icons/faChevronDown';

const ModalDrop = (props, ref) => {
	const [list, setList] = useState([]);
	const [selectedOption, setSelectedOption] = useState(initialOption);
	const {initialOption, handle} = props;

	useImperativeHandle(ref, () => ({
		setSelectedOption,
		setList,
        getSelected,
		getList,
		handleOptionSelect, 
		onSelect,
		setSelected
	}));

	const handleOptionSelect = (index, value) => {
		setSelectedOption(value);
        return index
	};
    const getSelected = () => {
        return selectedOption
    }
	const 	setSelected = (value) =>{
		setSelectedOption(value)
	}

	const getList = () => {
		return list
	}
	
	const onSelect = (index, value) => {
        handleOptionSelect(index, value);
        handle(value);
    };
	
	return (
		<View style={[styles.view]}>
			<ModalDropdown
				options={list}
				defaultValue={initialOption}
                saveScrollPosition={false}
                showsVerticalScrollIndicator={false}
                onSelect={onSelect}
				dropdownTextHighlightStyle={{color: commonStyles.colors.lightGray}}
				style={styles.dropdown}
				textStyle={styles.dropdownText}
				dropdownStyle={styles.dropdownDropdown}
				dropdownTextStyle={styles.dropdownDropdownText}
			>	
			<View style={{display:'flex', flexDirection:'row', justifyContent:'space-between', marginHorizontal:8,alignItems:'center'
				,flexWrap:'nowrap'
			}}>
				<Text style={[styles.dropdownText, {maxWidth:110}]}>{selectedOption}</Text>
				<FontAwesomeIcon
						icon={faChevronDown}
						size={12}
						color={commonStyles.colors.lightGray}
					/>
			</View>
			</ModalDropdown>
		</View>
	);
};

const styles = StyleSheet.create({
	
	dropdown: {
		width: 150,
		height: 40,
		borderWidth: 0.7,
		borderColor: commonStyles.colors.lightGray,
		borderRadius: 7,
		justifyContent: 'center',
	},
	dropdownText: {
		textAlign:'left',
		fontSize: 15,
		color: commonStyles.colors.white,
		fontFamily: commonStyles.fontFamily,
	},
	
	dropdownDropdown: {
		width: 148,
		height: 'auto',
		maxHeight: 230,
		borderColor: commonStyles.colors.lightGray,
		borderWidth: 1,
		borderRadius: 5,
		marginTop: 10,
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

export default forwardRef(ModalDrop);