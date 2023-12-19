import React, {useState} from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import SelectLists from '../components/SelectList';
import {tableData, tableHead, widthArr} from '../situacaoData';
import Tables from '../components/Table';
import commonStyles from '../commonStyles';
import {Cards} from '../components/Cards';
import BarCharts from '../components/BarCharts';
import { TitleOne } from '../components/Titles';

const dataInitial = tableData.sort((a, b) => a[9] - b[9]);
const modifiedData = dataInitial.map(item => {
	const modifiedItem = [...item];
	modifiedItem[1] = item[1].split(' ').slice(0, 3).join(' ');
	modifiedItem[9] = Number(item[9].toFixed(2));
	return modifiedItem;
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
			const foundArray = state.tableData.filter(item => item[0] === value);
			setFilteredData(foundArray);
		} else {
			setFilteredData(state.tableData);
		}
	};

	const reduceTotal = i => {
		return filteredData.reduce((total, element) => total + element[i], 0);
	};
	const dataTotals = () => {
		const data = [];
		const conf = reduceTotal(3);
		const calc = reduceTotal(4);
		const exp = reduceTotal(5);
		const edit = reduceTotal(8);
		const can = reduceTotal(7);
		const valid = conf + calc + exp;
		data.push(conf, calc, exp, can, edit, valid);
		return data;
	};
	const percentExp = () => {
		const data = dataTotals();
		return ((data[2] * 100) / (data[0] + data[1] + data[2])).toFixed(2);
	};
	const percentEdit = () => {
		const data = dataTotals();
		return ((100 * data[4]) / data[2]).toFixed(2);
	};
	const dataChartBar = () => {
		const data = [
			{x: 'Conf', y: dataTotals()[0]},
			{x: 'Calc', y: dataTotals()[1]},
			{x: 'Exp', y: dataTotals()[2]},
			{x: 'Can', y: dataTotals()[3]},
		];
		return data;
	};

	return (
		<ScrollView>
			<View style={styles.container}>
				<TitleOne title={'Situação'}/>
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
				<View>
					<Tables
						tableHead={['Conf', 'Calc', 'Exp', 'Can', 'Edit', 'Validos']}
						tableData={[dataTotals()]}
						widthArr={[60, 60, 60, 60, 60, 60]}
					/>
				</View>
				<View style={styles.chartBars}>
					<BarCharts
						xAxis={true}
						yAxis={false}
						data={dataChartBar()}
						colors={[
							commonStyles.colors.azul,
							commonStyles.colors.lightGray,
							commonStyles.colors.verde,
							commonStyles.colors.vermelho,
						]}
					/>
				</View>
				<View style={styles.cards}>
					<Cards
						data={percentExp()}
						bgcolor={
							percentExp() > 70
								? `${commonStyles.colors.verde}`
								: percentExp() > 50
								? `${commonStyles.colors.cor4}`
								: `${commonStyles.colors.cor5}`
						}
						title={'% Exp.'}
						symbol={'%'}
					/>
					<Cards
						data={percentEdit()}
						title={'%Edit/Exp'}
						symbol={'%'}
						bgcolor={`${commonStyles.colors.cor2}`}
					/>
				</View>
			</View>
		</ScrollView>
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
	cards: {
		paddingBottom: 30,
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
	chartBars: {
		alignContent: 'center',
		justifyContent: 'center',
	},
});
