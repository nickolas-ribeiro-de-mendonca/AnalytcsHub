import React, {useState, useImperativeHandle, forwardRef} from 'react';
import {View, StyleSheet} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';
import commonStyles from '../commonStyles';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronDown} from '@fortawesome/free-solid-svg-icons/faChevronDown';

const SelectLists = (props, ref) => {
    const [data, setData] = useState([])
    const {placeholder, setSelected, width} = props
    
    useImperativeHandle(ref, () => ({
        setData
    }))

	return (
		<View style={styles.container}>
			<SelectList
				data={data}
				placeholder={placeholder}
				boxStyles={[styles.box, {width: width}]}
				inputStyles={styles.input}
				dropdownTextStyles={styles.dropText}
				dropdownStyles={[styles.drop, {width: width}]}
				search={false}
				setSelected={val => setSelected(val)}
				arrowicon={
					<FontAwesomeIcon
						icon={faChevronDown}
						size={12}
						color={commonStyles.colors.white}
					/>
				}
			/>
		</View>
	);
};

export default forwardRef(SelectLists);

const styles = StyleSheet.create({
	container: {},
	box: {
		borderColor: 'white',
		width: 200,
		alignContent: 'center',
	},
	input: {
		color: commonStyles.colors.white,
		fontFamily: commonStyles.fontFamily,
	},
	dropText: {
		color: commonStyles.colors.white,
		fontFamily: commonStyles.fontFamily,
	},
	drop: {
		width: 200,
	},
});
