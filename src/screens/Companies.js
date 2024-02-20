import React, {useEffect, useRef, useState} from 'react';
import {
	View,
	StyleSheet,
	ScrollView,
	StatusBar,
} from 'react-native';
import commonStyles from '../commonStyles';
import {Header} from '../components/Header';
import SelectLists from '../components/SelectList';
import Tables from '../components/Table';
import BarCharts from '../components/BarCharts';
import {TitleTwo} from '../components/Titles';
import moment from 'moment';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {server} from '../common';
import DataPie from '../components/DataPie';

const Companies = props => {
	
	const [user, setUser] = useState('')
	const refInitialData = useRef([])
	const refDataList = useRef([]);
	const refFilteredData = useRef([]);
	const refTabela = useRef();
	const refBarChart = useRef();
	const refDataPie = useRef([])
	const head = ['WS','Empresa','CNPJ','Inscrição','Ultima Sinc.','Código Agro','MobServer','Apelido',	];
	const widthArr = [50, 250, 150, 150, 200, 50, 100, 100];
	const selectedCompanyRef = useRef(null);
	const refOrderList = useRef([])
	
	const shortData = async () => {
		try {
			const res = await axios.get(`${server}/compShort`);
			const convert = res.data.map(obj => {
				return Object.keys(obj).map(chave => {					
					return obj[chave];
				});
			});
         
			refFilteredData.current = convert;
			refInitialData.current = convert
			retrieveData();	
			ListaAlterada()
		} catch (error) {
			console.log(error);
		}
	};

	const retrieveData = async () => {
		try {
			var userData = '';
			const value = await AsyncStorage.getItem('userData');
			if (value !== null) {
				userData = JSON.parse(value);
				setUser(userData.name)
			} 
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

	const ordenador = () => {
		const data = [{key: 0, value: 'Código'},{key: 1, value: 'Codinome'},{key: 2, value: 'Sincronização'}];
		return data
	} 

	const selectList = () => {
		const tableData = refInitialData.current;
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
		
		if (value !== '') {
			const foundArray = refInitialData.current.filter(item => item[0] === value);
			refFilteredData.current = foundArray;
			selectedCompanyRef.current = value
		} else {
			refFilteredData.current = refInitialData.current;
			selectedCompanyRef.current = value
		}
		ListaAlterada()
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
			case 0:
				refFilteredData.current = refFilteredData.current.sort(
					(a, b) => a[0] - b[0],
				);
				break;
			case 1:
				refFilteredData.current = refFilteredData.current.sort(function (
					a,
					b,
				) {
					return a[7] > b[7] ? 1 : -1;
				});
				break;
			case 2:
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

		ListaAlterada()
	};

	const dataPie =  () => {
		return Object.keys(countMobServerVersions(refFilteredData.current)).map(version => ({
		x: version,
		y: countMobServerVersions(refFilteredData.current)[version],
		label: `${countMobServerVersions(refFilteredData.current)[version]} \n ${version}`,
	}))
	};

	const ListaAlterada = () => {
		refTabela.current.setLista(formatedList())
		refBarChart.current.setDataBar(dataChartBar())
		refDataPie.current.setDataPie(dataPie())
		refOrderList.current.setData(ordenador())	
		refDataList.current.setData(selectList())
	}

	const formatedList = () => {
		const data = [];
		refFilteredData.current.map(row => {
			const formattedDate = moment(row[4]).format('DD/MM/YY - HH:mm:ss');
			const newRow = [row[0],row[1],row[2],row[3],formattedDate,row[5],row[6],row[7]];
			data.push(newRow);
		});
		return data;
	};

	console.log('Renderizou toda a tela')
   
	return (
		<ScrollView style={{backgroundColor: commonStyles.colors.cor1}}>
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
					user={user}
				/>

				<View style={styles.listView}>
					<SelectLists
						ref={refDataList}
						placeholder={'Empresas'}
						setSelected={handleSelectCompany}
						width={150}
					/>
					<SelectLists
						ref={refOrderList}
						data={ordenador}
						placeholder={'Ordenar'}
						setSelected={reordenar}
						width={150}
					/>
				</View>
				
				<View>
					<Tables
						tableHead={head}
						widthArr={widthArr}
						ref={refTabela}
					/>
				</View>

				<View>
					<BarCharts
						xAxis={true}
						yAxis={false}
						ref={refBarChart}
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
					<DataPie height={300} ref={refDataPie} />
				</View>
			</View>
		</ScrollView>
	);
};

export default Companies


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