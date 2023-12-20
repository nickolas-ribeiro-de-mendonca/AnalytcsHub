import React, {useState} from 'react';
import {Text, View, StyleSheet, ScrollView, Button} from 'react-native';
import {Table, Row, Rows} from 'react-native-table-component';
import {
	VictoryBar,
	VictoryChart,
	VictoryPie,
	VictoryAxis,
} from 'victory-native';
import {tableHead, tableData, widthArr} from '../fonts';
import commonStyles from '../commonStyles';
import {Header} from '../components/Header';
import SelectLists from '../components/SelectList';
import Tables from '../components/Table';
import BarCharts from '../components/BarCharts';
import { TitleOne, TitleTwo } from '../components/Titles';

const initialState = {
	tableHead: tableHead,
	tableData: tableData,
	widthArr: widthArr,
};

const Companies = () => {
	const [state] = useState({
		tableHead: tableHead,
		tableData: tableData,
		widthArr: widthArr,
	});

	const [selectedCompany, setSelectedCompany] = useState(null);
	const [filteredData, setFilteredData] = useState(state.tableData);

	const situationCaunter = situation => {
		const tableData = filteredData;
		let count = 0;
		tableData.forEach(data => {
			if (data[5] === situation) {
				count++;
			}
		});
		return count;
	};

	const countMobServerVersions = data => {
		const versionsCount = {};

		data.forEach(item => {
			const version = item[6];

			if (versionsCount[version]) {
				versionsCount[version]++;
			} else {
				versionsCount[version] = 1;
			}
		});
		return versionsCount;
	};

	const selectList = () => {
		const {tableData} = state;
		const data = [];
		data.push({key: '', value: 'Empresas'});
		tableData.forEach(item => {
			const existingItem = data.find(obj => obj.value === item[1]);
			if (!existingItem) {
				data.push({key: item[0], value: item[1]});
			}
		});
		return data;
	};
	const handleSelectCompany = value => {
		setSelectedCompany(value);
		if (value !== '') {
			const foundArray = tableData.filter(item => item[0] === value);
			setFilteredData(foundArray);
		} else {
			setFilteredData(state.tableData);
		}
	};

	const dataChartBar = () => {
		const data = [
			{x: 'Normal', y: situationCaunter('Normal')},
			{x: 'Atrasado', y: situationCaunter('Atrasado')},
			{x: 'Parado', y: situationCaunter('Parado')},
		];
		return data;
	};

	const versionsCount = countMobServerVersions(filteredData);
	const dataPie = Object.keys(versionsCount).map(version => ({
		x: version,
		y: versionsCount[version],
	}));

	return (
		<ScrollView style={{backgroundColor: commonStyles.colors.cor1}}>
			<View style={styles.container}>
				<Header name={'Sincronização'} />

				<View style={styles.listView}>
					<SelectLists
						data={selectList}
						placeholder={'Empresas'}
						setSelected={handleSelectCompany}
						width={150}
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
					<BarCharts
						xAxis={true}
						yAxis={false}
						data={dataChartBar()}
						colors={[
							commonStyles.colors.verde,
							commonStyles.colors.amarelo,
							commonStyles.colors.vermelho
						]}
					/>
				</View>
				<TitleTwo title={'MobServer'}/>
				<View>					
					<VictoryPie
						data={dataPie}
						//animate={{ duration: 3000, onLoad: { duration: 1000 }}}
						colorScale="qualitative"
						height={300}
						style={{
							labels: {
								fill: 'white',
								fontSize: 12,
							},
						}}
					/>
				</View>
			</View>
		</ScrollView>
	);
};

export default Companies;

const styles = StyleSheet.create({
	container: {
		backgroundColor: commonStyles.colors.cor1,
		flex: 1,
	},
	title: {
		paddingTop: 20,
		textAlign: 'center',
		fontSize: 20,
		color: commonStyles.colors.white,
	},
	table: {
		borderWidth: 0.5,
		borderColor: commonStyles.colors.white,
	},
	head: {
		height: 50,
		backgroundColor: commonStyles.colors.cor2,
	},
	rows: {
		backgroundColor: commonStyles.colors.cor1,
	},
	text: {
		color: commonStyles.colors.white,
		textAlign: 'center',
		margin: 3,
	},
	chartOne: {
		paddingTop: 10,
	},
	listView: {
		paddingTop: 25,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	btnView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingTop: 20,
	},
});
