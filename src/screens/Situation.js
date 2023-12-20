import React, {useState} from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import {apontadorData, apontadorHead, apontadorWidthArr} from '../fonts';
import {Table, Row, Rows} from 'react-native-table-component';
import commonStyles from '../commonStyles';
import { Header } from '../components/Header';
import SelectLists from '../components/SelectList';
import Tables from '../components/Table';
import BarCharts from '../components/BarCharts';
import { TitleTwo } from '../components/Titles';

const Situation = () => {
	const [state] = useState({
		tableHead: apontadorHead,
		tableData: apontadorData,
		widthArr: apontadorWidthArr,
	});

	const [filteredData, setFilteredData] = useState(state.tableData);
	const [filteredUser, setFilteredUser] = useState(state.tableData);
	const [selected, setSelected] = useState([]);
	const [selectedUser, setSelectedUser] = useState([]);

	const apontamentos = filteredData => {
		let apontamentos = [];
		for (let i = 0; i < filteredData.length; i++) {
			for (let j = 0; j < 4; j++) {
				if (j === 3) apontamentos.push(filteredData[i][j]);
			}
		}
		return apontamentos;
	};

	const tempo = () => {
		let tempo = [];
		for (let i = 0; i < state.tableData.length; i++) {
			for (let j = 0; j < state.tableHead.length; j++) {
				if (j === 3) tempo.push(state.tableData[i][j]);
			}
		}
		return tempo;
	};

	const wsList = () => {
		const {tableData} = state;
		const data = [{key: '', value: 'Empresas'}];
		tableData.forEach(item => {
			const existingItem = data.find(obj => obj.value === item[0]);
			if (!existingItem) {
				data.push({key: item[0], value: item[0]});
			}
		});
		return data;
	};

	const userList = () => {
		const tableData = filteredUser;
		const data = [{key: '', value: 'Usuários'}];
		tableData.forEach(item => {
			const existingItem = data.find(obj => obj.value === item[2]);
			if (!existingItem) {
				data.push({key: item[1], value: item[2]});
			}
		});
		return data;
	};

	const handleSelectCompany = value => {
		setSelected(value);
		if (value !== '') {
			const newList = state.tableData.filter(item => item[0] === value);
			setFilteredData(newList);
			setFilteredUser(newList);
			apontamentos(filteredData);
		} else {
			setFilteredData(state.tableData);
			apontamentos(state.tableData);
		}
	};
	const handleSlectedUser = value => {
		setSelectedUser(value);
		if (value !== '') {
			const newList = filteredUser.filter(item => item[1] === value);
			setFilteredData(newList);
			apontamentos(filteredData);
		} else {
			setFilteredData(filteredUser);
			apontamentos(filteredUser);
		}
	};

	const tableHead = ['Confirmado', 'Calculado', 'Exportado', 'Total'];
	const aponts = apontamentos(filteredData).reduce(
		(total, elemento) => total + elemento,
		0,
	);
	const random1 = Math.random() * 0.5;
	const random2 = Math.random() * 0.3;
	const conf = aponts * random1.toFixed(1);
	const calc = aponts * random2.toFixed(1);
	const expt = aponts - conf - calc;
	const pExpt = (expt / aponts) * 100;
	const dataRow = [conf, calc, expt, aponts];

	const dataChartBar = () => {
		const data =[
			{x:'Confirmado' , y:dataRow[0] },
			{x:'Calculado' , y:dataRow[1] },
			{x:'Exportado' , y:dataRow[2] }
		]
		return data
	}

	return (
		<ScrollView>
			<View style={styles.container}>
				
				<Header name={'Apontamento por Apontador'}/>

				<View style={styles.drop}>
					<SelectLists
						data={wsList}
						placeholder={'Empresa'}
						setSelected={handleSelectCompany}
						width={150}
					/>
					<SelectLists
						data={userList}
						placeholder={'Usuário'}
						setSelected={handleSlectedUser}
						width={150}
					/>
				</View>

				<Tables
					tableHead={state.tableHead}
					widthArr={state.widthArr}
					tableData={filteredData}
				/>

				<TitleTwo title={'Totalizadores'}/>
				<Tables
					tableHead={tableHead}
					tableData={[dataRow]}
					widthArr={[90, 90, 90, 90]}
				/>

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

				<View style={styles.cards}>
					<View
						style={[
							styles.card,
							{backgroundColor: pExpt >= 70 ? '#32CD32' : 'red'},
						]}>
						<Text style={styles.cardTitle}>Dados Exportados</Text>
						<Text style={styles.cardNumber}>{pExpt.toFixed(1)}%</Text>
					</View>
					<View style={styles.card}>
						<Text style={styles.cardTitle}>Usuários</Text>
						<Text style={styles.cardNumber}>{filteredData.length}</Text>
					</View>
				</View>
			</View>
		</ScrollView>
	);
};

export default Situation;

const styles = StyleSheet.create({
	container: {
		backgroundColor: commonStyles.colors.cor1,
		flex: 1,
	},
	tableContainer: {
		alignItems: 'center',
	},
	table: {
		borderWidth: 0.5,
		borderColor: commonStyles.colors.white,
	},
	head: {
		height: 50,
		backgroundColor: commonStyles.colors.cor2,
	},
	tableText: {
		textAlign: 'center',
		color: commonStyles.colors.white,
	},
	title: {
		fontSize: 20,
		color: commonStyles.colors.white,
		textAlign: 'center',
		padding: 20,
	},
	cards: {
		padding: 20,
		flexDirection: 'row',
		justifyContent: 'space-evenly',
	},
	card: {
		borderColor: commonStyles.colors.cor2,
		borderWidth: 1,
		borderRadius: 15,
		padding: 10,
		width: 150,
	},
	cardTitle: {
		textAlign: 'center',
		fontSize: 10,
		color: commonStyles.colors.white,
	},
	cardNumber: {
		textAlign: 'center',
		fontSize: 25,
		color: commonStyles.colors.white,
	},
	drop: {
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		marginBottom: 20,
	},
});
