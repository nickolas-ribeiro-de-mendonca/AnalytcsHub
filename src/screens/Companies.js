import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView, StatusBar} from 'react-native';
import {VictoryPie} from 'victory-native';
import commonStyles from '../commonStyles';
import {Header} from '../components/Header';
import SelectLists from '../components/SelectList';
import Tables from '../components/Table';
import BarCharts from '../components/BarCharts';
import {TitleTwo} from '../components/Titles';
import moment from 'moment';
import axios from 'axios';
import {server} from '../common';

const Companies = props => {
	const [selectedCompany, setSelectedCompany] = useState(null);
	const [selectOrder, setSelectOrder] = useState('');
	const [filteredData, setFilteredData] = useState([]);
	const [initialData, setInitialData] = useState([])
	const head = ['WS','Empresa','CNPJ','Inscrição','Ultima Sinc.','Código Agro','MobServer','Apelido'];
	const widthArr = [50, 250, 150, 150, 200, 50, 100, 100];

	const shortData = async () => {
		try {
			const res = await axios.get(`${server}/compShort`)
			const convet = res.data.map((obj) => {
				return Object.keys(obj).map((chave) => {
					return obj[chave];
				});
			});
			setFilteredData(convet);
			setInitialData(convet)
		} catch (error) {
			console.log(error)
		}
	} 
	
	useEffect(() => {
		shortData()
	}, []);

	const situation = () => {
		const data = filteredData;
		var normal = 0;
		var atrasado = 0;
		var parado = 0;
		const now = new moment();
		data.forEach(item => {
			const lastSinc = new Date(item[4]).getTime();
			const datadiff = (now - lastSinc) / (1000 * 3600);
			if (datadiff <= 1) normal++;
			if (datadiff <= 2 && datadiff > 1) atrasado++;
			if (datadiff > 2) parado++;
		});
		return [normal, atrasado, parado];
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

	const ordenador = [
		{key: 0, value: 'Código'},
		{key: 1, value: 'Codinome'},
		{key: 2, value: 'Sincronização'},
	];

	const selectList = () => {
		const tableData = initialData;
		const data = [];
		data.push({key: '', value: 'Empresas'});
		tableData.forEach(item => {
			const existingItem = data.find(obj => obj.value === item[7]);
			if (!existingItem) {
				data.push({key: item[0], value: item[7]});
			}
		});
		return data;
	};

	const handleSelectCompany = value => {
		setSelectedCompany(value);
		if (value !== '') {
			const foundArray = initialData.filter(item => item[0] === value);
			setFilteredData(foundArray);
		} else {
			setFilteredData(initialData);
		}
	};

	const dataChartBar = () => {
		const data = [
			{x: 'Normal', y: situation()[0]},
			{x: 'Atrasado', y: situation()[1]},
			{x: 'Parado', y: situation()[2]},
		];
		return data;
	};

	const reordenar = value => {
		switch (value) {
			case 0:
				setSelectOrder(value);
				setFilteredData(filteredData.sort((a, b) => a[0] - b[0]));
				break;
			case 1:
				setSelectOrder(value);
				setFilteredData(
					filteredData.sort(function (a, b) {return a[7] > b[7] ? 1 : -1 }));
				break;
			case 2:
				setSelectOrder(value);
				setFilteredData(filteredData.sort(function (a, b) { return a[4] > b[4] ? 1 : -1 }));
				break;
			default: break;
		}
	};
	
	const versionsCount = countMobServerVersions(filteredData);

	const dataPie = Object.keys(versionsCount).map(version => ({
		x: version,
		y: versionsCount[version],
		label: `\n ${versionsCount[version]} \n ${version} \n`,
	}));

	const formatRowDate = row => {
		const formattedDate = moment(row[4]).format("DD/MM/YY - HH:mm:ss");
		return [row[0], row[1], row[2],row[3], formattedDate,row[5],row[6],row[7]]
	}
	
	return (
		<ScrollView style={{backgroundColor: commonStyles.colors.cor1}}>
			<StatusBar
				hidden={false}
				backgroundColor={commonStyles.colors.cor2}
				translucent={false}
				networkActivityIndicatorVisible={true}
			/>

			<View style={styles.container}>
				<Header name={'Sincronização'} navigation={props.navigation} />

				<View style={styles.listView}>
					<SelectLists
						data={selectList}
						placeholder={'Empresas'}
						setSelected={handleSelectCompany}
						width={150}
					/>
					<SelectLists
						data={ordenador}
						placeholder={'Ordenar'}
						setSelected={reordenar}
						width={150}
					/>
				</View>

				<View>
					<Tables
						tableHead={head}
						tableData={filteredData.map(formatRowDate)}
						widthArr={widthArr}
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
							commonStyles.colors.vermelho,
						]}
					/>
				</View>
				<TitleTwo title={'MobServer'} />
				<View>
					<VictoryPie
						data={dataPie}
						colorScale="qualitative"
						height={300}
						style={{
							labels: {
								fill: 'white',
								fontSize: 12,
								textAnchor: 'middle',
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
	listView: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
	},
});
