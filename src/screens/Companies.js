import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView, StatusBar} from 'react-native';
import {VictoryPie} from 'victory-native';
import {tableHead, tableData, widthArr} from '../fonts';
import commonStyles from '../commonStyles';
import {Header} from '../components/Header';
import SelectLists from '../components/SelectList';
import Tables from '../components/Table';
import BarCharts from '../components/BarCharts';
import {TitleTwo} from '../components/Titles';
import {dataWS} from '../dataJSON';
import moment from 'moment';
import axios from 'axios';
import { server } from '../common';


const Companies = () => {
	const [dat, setData] = useState([])
	const fullData = async () => {
		try{
			const res = await axios.get(`${server}/empresa`)
			const shortData= res.data.map(obj =>{
				return{
					EMPCODIGO: obj.EMPCODIGO,
					EMPRAZAOSOCIAL:obj.EMPRAZAOSOCIAL,
					EMPCNPJ:obj.EMPCNPJ,
					EMPIE:obj.EMPIE ,
					EMPULTIMAATUALIZACAO :obj.EMPULTIMAATUALIZACAO,
					EMPCODIGOAGRO :obj.EMPCODIGOAGRO,
					EMPVERSAOMOBSERVER:obj.EMPVERSAOMOBSERVER,
					EMPAPELIDO: obj.EMPAPELIDO,
					EMPAUTORIZADA: obj.EMPAUTORIZADA
				}
			})
			const final = shortData.filter(obj => obj.EMPAUTORIZADA === 1).map(obj => Object.values(obj));
			setFilteredData(final)

		}catch(error){
			console.log(error)
		}
	}

	useEffect(() =>{
		fullData()
	}, [])

	
	const data = dat
	const head = [
		'WS',
		'Empresa',
		'CNPJ',
		'Inscrição',
		'Ultima Sinc.',
		'Código Agro',
		'MobServer',
		'Apelido',
	];
	const widthA = [50, 200, 150, 150, 150, 50, 100, 100];

	const [state] = useState({
		tableHead: head,
		tableData: data,
		widthArr: widthA,
	});

	const [selectedCompany, setSelectedCompany] = useState(null);
	const [selectOrder, setSelectOrder] = useState('');
	const [filteredData, setFilteredData] = useState(state.tableData);

	const situation = () => {
		const data = filteredData;
		var normal = 0;
		var atrasado = 0;
		var parado = 0;
		const now = new Date(moment());
		data.forEach(item => {
			const lastSinc = new Date(item[4]).getTime();
			const datadif = (now - lastSinc) / (1000 * 3600);
			if (datadif <= 1) normal++;
			if (datadif <= 2) atrasado++;
			if (datadif > 2) parado++;
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
					filteredData.sort(function (a, b) {
						return a[7] > b[7] ? 1 : -1;
					}),
				);
				break;
			case 2:
				setSelectOrder(value);
				setFilteredData(
					filteredData.sort(function (a, b) {
						return a[4] > b[4] ? 1 : -1;
					}),
				);
				break;
			default:
				break;
		}
	};

	const versionsCount = countMobServerVersions(filteredData);
	const dataPie = Object.keys(versionsCount).map(version => ({
		x: version,
		y: versionsCount[version],
	}));
	
	return (
		
		<ScrollView style={{backgroundColor: commonStyles.colors.cor1}}>
			<StatusBar
				hidden={false}
				backgroundColor={commonStyles.colors.cor2}
				translucent={false}
				networkActivityIndicatorVisible={true}
			/>

			<View style={styles.container}>
				<Header name={'Sincronização'} />
				
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
