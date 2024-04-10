import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet, ScrollView, StatusBar} from 'react-native';
import commonStyles from '../commonStyles';
import {Header} from '../components/Header';
import Tables from '../components/Table';
import BarCharts from '../components/BarCharts';
import {TitleTwo} from '../components/Titles';
import moment  from 'moment';
import axios from 'axios';
import {server} from '../common';
import DataPie from '../components/DataPie';
import Cards from '../components/Cards';
import ModalDrop from '../components/ModalDrop';
import TableData from '../components/TableData';

const Companies = props => {
	const refInitialData = useRef([]);
	const refDataList = useRef([]);
	const refFilteredData = useRef([]);
	const refTabela = useRef();
	const refBarChart = useRef();
	const refDataPie = useRef([]);
	const refOrderList = useRef([]);
	const refCardMedia = useRef();
	const refCardDesvio = useRef();
	const head = ['WS','Empresa','Ultima Sinc.','MobServer'];
	const widthArr = [50, 150, 150, 150];

	const shortData = async () => {
		refDataList.current.setSelectedOption("Empresas")
		refOrderList.current.setSelectedOption("Código")
		try {
			const res = await axios.get(`${server}/compShort`);
			const convert = res.data.map(obj => {
				return Object.keys(obj).map(chave => {
					return obj[chave];
				});
			});
			refFilteredData.current = convert;
			refInitialData.current = convert;
			ListaAlterada();
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		shortData();
	}, []);

	const situation = () => {
		const data = refFilteredData.current;
		var normal = 0;
		var atrasado = 0;
		var parado = 0;
		const now = new moment();
		data.forEach(item => {
			const lastSinc = new Date(item[4]).getTime();
			const datadiff = (now - lastSinc) / (1000 * 60);
			if (datadiff <= 5) normal++;
			if (datadiff < 15 && datadiff > 5) atrasado++;
			if (datadiff >= 15) parado++;
		});
		return [normal, atrasado, parado];
	};

	const average = () => {
		const data = refFilteredData.current;
		const now = new moment();
		var media = 0;
		data.forEach(item => {
			const last = new Date(item[4]).getTime();
			const dataDiff = (now - last) / 60000;
			media = media + dataDiff;
		});

		return (media / data.length).toFixed(2);
	};

	const color = (val) => {
		let color = ''
		const media = average()
		if (media <= 5) {
			color = commonStyles.colors.verde
		}else if (media < 15){
			color =  commonStyles.colors.amarelo
		}else{
			color = commonStyles.colors.cor5
		}
		return color
	}

	const standardDeviation = () => {
		const data = refFilteredData.current;
		const now = new moment();
		const n = data.length;
		const media = average();
		var sum = 0;

		data.forEach(item => {
			const last = new Date(item[4]).getTime();
			const dataDiff = (now - last) / 60000;
			const pow = Math.pow(dataDiff - media, 2);

			sum = sum + pow;
		});
		return Math.pow(sum / n, 0.5).toFixed(2);
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

	const ordenador = () => {
		const data = ['Código', 'Codinome', 'Sincronização'];
		return data;
	};

	const selectList = () => {
		const tableData = refInitialData.current;
		const data = [];
		data.push('Empresas');
		tableData.forEach(item => {
			const existingItem = data.find(obj => obj === item[1]);
			if (!existingItem) {
				data.push(item[7]);
			}
		});
		return data;
	};

	const handleSelectCompany = value => {
		if (value !== 'Empresas') {
			const foundArray = refInitialData.current.filter(
				item => item[7] === value,
			);
			refFilteredData.current = foundArray;
		} else {
			refFilteredData.current = refInitialData.current;
		}
		ListaAlterada();
	};

	const dataChartBar = () => {
		const data = [
			{x: 'Normal', y: situation()[0], fill: commonStyles.colors.verde},
			{x: 'Atrasado', y: situation()[1], fill: commonStyles.colors.amarelo},
			{x: 'Parado', y: situation()[2], fill: commonStyles.colors.vermelho},
		];

		return data;
	};

	const reordenar = value => {
		switch (value) {
			case "Código":
				refFilteredData.current = refFilteredData.current.sort(
					(a, b) => a[0] - b[0],
				);
				break;
			case "Codinome":
				refFilteredData.current = refFilteredData.current.sort(function (
					a,
					b,
				) {
					return a[7] > b[7] ? 1 : -1;
				});
				break;
			case "Sincronização":
				refFilteredData.current = refFilteredData.current.sort(function (
					a,
					b,
				) {
					return a[4] > b[4] ? 1 : -1;
				});
				break;
			default:
				break;
		}

		ListaAlterada();
	};

	const dataPie = () => {
		return Object.keys(countMobServerVersions(refFilteredData.current)).map(
			version => ({
				x: version,
				y: countMobServerVersions(refFilteredData.current)[version],
				label: `${
					countMobServerVersions(refFilteredData.current)[version]
				} \n ${version}`,
			}),
		);
	};

	const handleBarClick = (value) => {
		let minStart = 0;
		let minFinish = 0
		switch (value) {
			case (value = 'Normal'):
				minStart = 0
				minFinish = 5
				break;
			case (value = 'Atrasado'):
				minStart = 6;
				minFinish = 15
				break;
			case (value = 'Parado'):
				minStart = 16;
				minFinish = 99999999
				break;
			default:
				break;
		}
		const data = refFilteredData.current.filter(item => {
			const datadiff = moment().diff(item[4], 'minute') 
			if (datadiff >= minStart && datadiff <= minFinish) {
				return item;
			}
		});
		refFilteredData.current = data
		ListaAlterada()
	};

	const handlePieClick=(value) => {
		refFilteredData.current = refInitialData.current.filter(
			item => item[6] === value
		)
		ListaAlterada()
	}

 	const ListaAlterada = () => {
		refTabela.current.setLista(formatedList());
		refBarChart.current.setDataBar(dataChartBar());
		refDataPie.current.setDataPie(dataPie());
		refOrderList.current.setList(ordenador());
		refDataList.current.setList(selectList());
		refCardMedia.current.setDataCard(average());
		refCardMedia.current.setColor(color());
		refCardDesvio.current.setDataCard(standardDeviation());
	};

	const formatedList = () => {
		const data = [];
		refFilteredData.current.map(row => {
			const formattedDate = moment(row[4]).format('DD/MM/YY HH:mm:ss');
			const newRow = [
				row[0],
				row[7],
				formattedDate,
				row[6],
			];
			data.push(newRow);
		});
		return data;
	};

	const handleRefreshData = () => {
		shortData();
	};

	return (
		<ScrollView style={styles.scrollView}>
			<StatusBar
				hidden={false}
				backgroundColor={commonStyles.colors.cor2}
				translucent={false}
				networkActivityIndicatorVisible={true}
			/>

			<View style={styles.container}>
				<Header
					name={'Sincronização'}
					navigation={props.navigation}
					onRefreshData={handleRefreshData}
				/>

				<View style={styles.listView}>
					<ModalDrop
						handle={handleSelectCompany}
						ref={refDataList}
					/>
					<ModalDrop
						handle={reordenar}
						ref={refOrderList}
					/>
				</View>
	
				<View>
					<Tables tableHead={head} widthArr={widthArr} ref={refTabela} />
				</View>

				<View>
					<BarCharts
						xAxis={true}
						yAxis={false}
						ref={refBarChart}
						handle={handleBarClick}
						data={dataChartBar()}
						domain={{x: [0.5, 3.5]}}
						colors={[
							commonStyles.colors.verde,
							commonStyles.colors.amarelo,
							commonStyles.colors.vermelho,
						]}
					/>
				</View>
				<TitleTwo title={'MobServer'} />
				<View>
					<DataPie 
						height={300} 
						ref={refDataPie}
						colorScale={[
							commonStyles.colors.cor2,
							commonStyles.colors.cor3,
							commonStyles.colors.cor4
						]}
						handle={handlePieClick}
					/>
				</View>
				<View style={styles.cardView}>
					<Cards
						ref={refCardMedia}
						title={'Média'}
						symbol={' min'}
					/>
					<Cards
						ref={refCardDesvio}
						symbol={' min'}
						title={'Desvio Padrão'}
					/>
				</View>
			</View>
		</ScrollView>
	);
};

export default Companies;

const styles = StyleSheet.create({
	scrollView:{
		backgroundColor: commonStyles.colors.cor1
	},
	container: {
		backgroundColor: commonStyles.colors.cor1,
		flex: 1,
	},
	listView: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
	},
	cardView: {
		padding: 20,
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
});
