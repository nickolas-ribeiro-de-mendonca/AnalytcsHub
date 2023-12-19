import React, {useState} from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import SelectLists from '../components/SelectList';
import {tableData, tableHead, widthArr} from '../situacaoData';
import Tables from '../components/Table';
import commonStyles from '../commonStyles';

const dataInitial = tableData.sort((a,b)=>a[9]-b[9])
const modifiedData = dataInitial.map(item => {
   const modifiedItem = [...item]; 
   modifiedItem[1] = item[1].split(' ').slice(0, 3).join(' ');
   modifiedItem[9] = Number(item[9].toFixed(2));
   return modifiedItem
 });

const SituationApt = () => {
	const [state] = useState({
		tableHead: tableHead,
		tableData: modifiedData,
		widthArr: widthArr,
	});

	const [selectedValue, setSelectedValue] = useState('');
	const [filteredData, setFilteredData] = useState(state.tableData);

	const list = () => {
		const {tableData} = state;
		const data = [];
		data.push({key: '', value: 'Empresas'});
		tableData.forEach(item => {
			const existingItem = data.find(obj => obj.value === item[2]);
			if (!existingItem) {
				data.push({key: item[0], value: item[2]});
			}
		});
		return data;
	};

	const handleSelect = value => {
		setSelectedValue(value);
		if (value !== '') {
			const foundArray = tableData.filter(item => item[0] === value);
			setFilteredData(foundArray);

		} else {
			setFilteredData(state.tableData);
		}
	};

	return (
		<View style={styles.container}>
			<Text>Texto zuado </Text>
			<View style={styles.drop}>
				<SelectLists
					data={list}
					placeholder={'Empresas'}
					setSelected={handleSelect}
				/>
			</View>
			<View>
				<Tables
					tableHead={state.tableHead}
					tableData={filteredData}
					widthArr={state.widthArr}
				/>
			</View>
		</View>
	);
};

export default SituationApt;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: commonStyles.colors.cor1,
	},
	drop: {
		alignItems: 'center',
	},
});
