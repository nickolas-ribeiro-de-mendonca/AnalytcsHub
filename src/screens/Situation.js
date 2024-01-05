import React, {useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Dimensions} from 'react-native';
import {apontadorData, apontadorHead, apontadorWidthArr} from '../fonts';
import commonStyles from '../commonStyles';
import {Header} from '../components/Header';
import SelectLists from '../components/SelectList';
import Tables from '../components/Table';
import BarCharts from '../components/BarCharts';
import {TitleTwo} from '../components/Titles';
import {Cards} from '../components/Cards';


const Situation = (props) => {
	const [state] = useState({
		tableHead: apontadorHead,
		tableData: apontadorData,
		widthArr: apontadorWidthArr,
	});

	const [filteredData, setFilteredData] = useState(state.tableData);
	const [filteredUser, setFilteredUser] = useState(state.tableData);
	const [selected, setSelected] = useState('');
	const [selectedUser, setSelectedUser] = useState('');

	const apontamentos = filteredData => {
		let apontamentos = [];
		for (let i = 0; i < filteredData.length; i++) {
			for (let j = 0; j < 4; j++) {
				if (j === 3) apontamentos.push(filteredData[i][j]);
			}
		}
		return apontamentos;
	};

	const wsList = () => {
		const {tableData} = state;
		const data = [{key: '', value: 'Empresa'}];
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
		const data = [{key: '', value: 'Usuário'}];
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
			handleSlectedUser('')
			setFilteredUser(state.tableData)
			apontamentos(state.tableData);
		}
	};

	const handleSlectedUser = value => {
		setSelectedUser(value);
		if (value !== '') {
			const newList = filteredUser.filter(item => item[1] === value);
			setFilteredData(newList);
			apontamentos(filteredData);
		}else {
			setFilteredData(filteredUser);
			apontamentos(filteredUser);
		}
	};

	const tableHead = ['Confirmado', 'Calculado', 'Exportado', 'Total'];
	const aponts = apontamentos(filteredData).reduce(
		(total, elemento) => total + elemento,
		0,
	);

	const getWidthArr = () => {
		const windowWidth = Dimensions.get('window').width;
		const widthArr = (windowWidth - 33) / tableHead.length;
		return widthArr;
	};

	const random1 = Math.random() * 0.5;
	const random2 = Math.random() * 0.3;
	const conf = aponts * random1.toFixed(1);
	const calc = aponts * random2.toFixed(1);
	const expt = aponts - conf - calc;
	const pExpt = (expt / aponts) * 100;
	const dataRow = [conf, calc, expt, aponts];

	const dataChartBar = () => {
		const data = [
			{x: 'Confirmado', y: dataRow[0]},
			{x: 'Calculado', y: dataRow[1]},
			{x: 'Exportado', y: dataRow[2]},
		];
		return data;
	};

	return (
		<ScrollView>
			<View style={styles.container}>
				<Header name={'Apontamento por Apontador'} navigation={props.navigation} />

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

				<TitleTwo title={'Totalizadores'} />
				<Tables
					tableHead={tableHead}
					tableData={[dataRow]}
					widthArr={[
						getWidthArr(),
						getWidthArr(),
						getWidthArr(),
						getWidthArr(),
					]}
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
					<Cards
						title={'Dados Exportados'}
						data={pExpt.toFixed(1)}
						symbol={'%'}
						bgcolor={
							pExpt >= 70
								? commonStyles.colors.verde
									: pExpt >= 50
									? commonStyles.colors.cor4
								: commonStyles.colors.cor5
						}
					/>
					<Cards
						title={'Apontadores'}
						data={filteredData.length}
						bgcolor={commonStyles.colors.cor2}
					/>
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
	cards: {
		padding: 20,
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
	drop: {
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
});
