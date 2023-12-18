import React, {useState} from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import {apontadorData, apontadorHead, apontadorWidthArr} from '../fonts';
import {Table, Row, Rows} from 'react-native-table-component';
import {VictoryAxis, VictoryBar, VictoryChart} from 'victory-native';
import {SelectList} from 'react-native-dropdown-select-list';
import commonStyles from '../commonStyles';

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

	return (
		<ScrollView>
			<View style={styles.container}>
				<Text style={styles.title}>Apontadores</Text>

				<View style={styles.drop}>
					<SelectList
						data={wsList}
						setSelected={val => handleSelectCompany(val)}
						search={false}
						placeholder="Empresas"
						boxStyles={{
							borderColor: 'white',
							width: 150,
							alignContent: 'center',
						}}
						inputStyles={{color: 'white'}}
						dropdownTextStyles={{color: 'white'}}
					/>
					<SelectList
						data={userList}
						search={false}
						setSelected={val => handleSlectedUser(val)}
						placeholder="Usuário"
						boxStyles={{
							borderColor: 'white',
							width: 150,
							alignContent: 'center',
						}}
						inputStyles={{color: 'white'}}
						dropdownTextStyles={{color: 'white'}}
					/>
				</View>
				<View style={styles.tableContainer}>
					<Table borderStyle={styles.table} widthArr={state.widthArr}>
						<Row
							data={state.tableHead}
							style={styles.head}
							textStyle={styles.tableText}
							widthArr={state.widthArr}
						/>
						<Rows
							data={filteredData}
							textStyle={styles.tableText}
							widthArr={state.widthArr}
						/>
					</Table>
				</View>

				<Text style={styles.title}>Geral</Text>
				<Table borderStyle={styles.table}>
					<Row
						data={tableHead}
						style={styles.head}
						textStyle={styles.tableText}
					/>
					<Row data={dataRow} textStyle={styles.tableText} />
				</Table>

				<VictoryChart domain={{x: [0, 4]}}>
					<VictoryAxis
						style={{
							axis: {stroke: 'white'},
							ticks: {stroke: 'white'},
							tickLabels: {fill: 'white'},
						}}
					/>
					<VictoryAxis
						dependentAxis
						style={{
							axis: {stroke: 'white'},
							ticks: {stroke: 'white'},
							tickLabels: {fill: 'white'},
						}}
					/>

					<VictoryBar
						animate={{duration: 2000, onLoad: {duration: 1000}}}
						data={[
							{
								x: 'Confirmado',
								y: dataRow[0],
								fill: commonStyles.colors.amarelo,
							},
							{
								x: 'Calculado',
								y: dataRow[1],
								fill: commonStyles.colors.azul,
							},
							{
								x: 'Exportado',
								y: dataRow[2],
								fill: commonStyles.colors.verde,
							},
						]}
						style={{
							data: {
								fill: ({datum}) => datum.fill,
							},
							labels: {
								fill: 'white',
							},
						}}
						labels={({datum}) => datum.y.toFixed(0)}
					/>
				</VictoryChart>

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
