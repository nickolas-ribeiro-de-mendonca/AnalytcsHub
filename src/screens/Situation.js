import React, {useState, useEffect, useRef } from 'react';
import { View, StyleSheet, ScrollView, Dimensions} from 'react-native';
import {apontadorData, apontadorHead, apontadorWidthArr, tableData} from '../fonts';
import commonStyles from '../commonStyles';
import {Header} from '../components/Header';
import SelectLists from '../components/SelectList';
import ModalDrop from '../components/ModalDrop'
import Tables from '../components/Table';
import BarCharts from '../components/BarCharts';
import {TitleTwo} from '../components/Titles';
import Cards from '../components/Cards';
import { server } from '../common';
import axios from 'axios';


const Situation = (props) => {
	
	const initialDataRef = useRef([])
	const initialLaborsRef = useRef([])
	const filteredDataRef = useRef()
	const selectListEmpRef = useRef()
	const dropdownEmpListRef = useRef([])
	const dropdownUserListRef = useRef([])
	const setSelectedUserRef = useRef()

	const barChartRef = useRef()
	
	const selectListLaborRef = useRef()

	const tableOneRef = useRef([])
	const tableTwoRef = useRef([])	
	const cardDataExpRef = useRef()
	const cardDataUsers = useRef()

	const [state] = useState({
		tableHead: apontadorHead,
		tableData: apontadorData,
		widthArr: apontadorWidthArr,
	});

	const getAppointmentsLabor = async () => {
		try {
			const res = await axios.get(`${server}/appointmentsLabor`)
			const objToArray = res.data.map(obj => {
				return Object.keys(obj).map(key => {
					return obj[key]
				})
			})
			initialDataRef.current = objToArray
			filteredDataRef.current = objToArray
			laborData()
			renderizar()
		} catch (error) {
			console.log('getAppointmentLabor'+ error)
		}
	}

	useEffect(() => {
		getAppointmentsLabor()
	})

	const dropdownEmp = () => {
		const initialData = initialDataRef.current
		const data = []
		data.push('Empresas')
		initialData.forEach(emp => {
			const existingItem = data.find(element => element === emp[1])
			if(!existingItem) data.push(emp[1])
		})
		return data
	}

	const selectListEmp = () => {
		const initialData = initialDataRef.current
		const data = []
		data.push({key: 'Empresa', value: 'Empresa'})
		initialData.forEach(item => {
			const existingItem = data.find(obj => obj.value === item[1]);
			if (!existingItem) {
				data.push({key: item[0], value: item[1]});
			}
		});
		return data;
	};

	const laborData = () => {
		const labors = []
		var labor = []
		filteredDataRef.current.map(item => {
			labor.push(item[0],item[3],item[4],item[11],item[10])
			labors.push(labor)
			labor = []
		})
		initialLaborsRef.current = labors
	}

	const initialDropdownUser = () => {
		const initialData = initialLaborsRef.current
		const data = ['Usuários']
		initialData.forEach(user => {
			const existingItem = data.find(element => element === user[2])
			if(!existingItem) data.push(user[2])
		})
		return data
	}

	const selectListUser = () => {
		const initialData = initialLaborsRef.current;
		const data = [{key: 'Usuário', value: 'Usuário'}];
		initialData.forEach(item => {
			const existingItem = data.find(obj => obj.value === item[2]);
			if (!existingItem) {
				data.push({key: item[2], value: item[2]});
			}
		});
		return data;
	};

	const tableOneData = () => {
		const data = filteredDataRef.current
		const newData = data.map(line => {
			let partesDoNome = line[4].trim().split(/\s+/);
			let novoNome = partesDoNome.slice(0, 2).join(" ");
			return [line[0],line[3],novoNome,line[11],line[10].toFixed(2)]
		})
		return newData
	}

	const tableTowData = () => {
		const data = filteredDataRef.current
		var newData = [0,0,0,0]
		data.map(line => {
			newData[0] = parseInt(newData[0]) + parseInt(line[5])
			newData[1] = parseInt(newData[1]) + parseInt(line[6])
			newData[2] = parseInt(newData[2]) + parseInt(line[7])
			newData[3] = parseInt(newData[3]) + parseInt(line[11])
		})
		return newData
	}

	const barChart = () => {
		const data = filteredDataRef.current
		var newData = [0,0,0,0]
		data.map(line => {
			newData[0] = parseInt(newData[0]) + parseInt(line[5])
			newData[1] = parseInt(newData[1]) + parseInt(line[6])
			newData[2] = parseInt(newData[2]) + parseInt(line[7])
			newData[3] = parseInt(newData[3]) + parseInt(line[11])
		})
		return newData
	}
	const cardOne = () => {
		const data = filteredDataRef.current
		var exportado = 0
		var total = 0
		data.map(exp => {
			total = parseInt(exp[7]) + parseInt(exp[6]) +parseInt(exp[7])
			exportado = parseInt(exp[7])	
		})
		if(total > 0){
			return (exportado/total * 100).toFixed(2)
		}
		return 0
	}
	const cardTwo = () => {
		const data = filteredDataRef.current
		return data.length
	}
	
	const handleSelectCompany = value => {
		var newLaborList = []
		if (value !== 'Empresas') {
			const newData = initialDataRef.current.filter(item => item[1] === value);
			filteredDataRef.current = newData
			newLaborList = newData.map(labor => {
				 return labor[4]
			})
		} else {
			filteredDataRef.current = initialDataRef.current
			dropdownUserListRef.current.teste("Usuários")
			newLaborList =  selectListUser()
		}
		renderizar()
		dropdownUserListRef.current.setList(() => {return newLaborList})
	};
	

	const handleSlectedUser = value => {		
		if (value !== 'Usuários') {
			const newData = initialDataRef.current.filter(item => item[4] === value);
			filteredDataRef.current = newData
		}else {
			console.log('entrou no else')
			initialDropdownUser()
		}
		renderizar()

	};

	const tableHead = ['Confirmado', 'Calculado', 'Exportado', 'Total'];

	const getWidthArr = () => {
		const windowWidth = Dimensions.get('window').width;
		const widthArr = (windowWidth - 33) / tableHead.length;
		return widthArr;
	};

	const dataChartBar = () => {
		const teste = barChart()
		const data = [
			{x: 'Confirmado', y: teste[0], fill: commonStyles.colors.cor3},
			{x: 'Calculado', y: teste[1], fill: commonStyles.colors.azul},
			{x: 'Exportado', y: teste[2], fill: commonStyles.colors.verde},
		];
		return data;
	};

	const renderizar = () => {
		//selectListEmpRef.current.setData(selectListEmp())
		//selectListLaborRef.current.setData(selectListUser())
		dropdownEmpListRef.current.setList(dropdownEmp())
		dropdownUserListRef.current.setList(initialDropdownUser())
		tableOneRef.current.setLista(tableOneData())
		tableTwoRef.current.setLista([tableTowData()])
		barChartRef.current.setDataBar(dataChartBar())
		cardDataExpRef.current.setDataCard(cardOne())
		cardDataUsers.current.setDataCard(cardTwo())
	}

	return (
		<ScrollView>
			<View style={styles.container}>
				<Header name={'Apontamento por Apontador'} navigation={props.navigation} />

				<View style={styles.drop}>
					
					{/*<SelectLists
						ref={selectListEmpRef}
						placeholder={'Empresa'}
						setSelected={handleSelectCompany}
						width={150}
					/>
					<SelectLists
						ref={selectListLaborRef}
						placeholder={'Usuário'}
						setSelected={handleSlectedUser}
						width={150}
					/>*/}

					<ModalDrop
						ref={dropdownEmpListRef}
						initialOption={"Empresas"}
						initialScrollIndex={0}
						handle={handleSelectCompany}
					/>
					<ModalDrop
						ref={dropdownUserListRef}
						initialOption={"Usuários"}
						initialScrollIndex={0}
						handle={handleSlectedUser}
					/>

				</View>

				<Tables
					tableHead={state.tableHead}
					widthArr={state.widthArr}
					ref={tableOneRef}
				/>

				<TitleTwo title={'Totalizadores'} />
				<Tables
					ref={tableTwoRef}
					tableHead={tableHead}
					widthArr={[
						getWidthArr(),
						getWidthArr(),
						getWidthArr(),
						getWidthArr(),
					]}
				/>

				<BarCharts
					ref={barChartRef}
					xAxis={true}
					yAxis={false}
					domain={{x: [0.5, 3.5]}}
				/>
				<View style={styles.cards}>
					<Cards
						title={'Dados Exportados'}
						ref={cardDataExpRef}
						symbol={'%'}
						bgcolor={
							cardDataExpRef >= 70
								? commonStyles.colors.verde
									: cardDataExpRef >= 50
									? commonStyles.colors.cor4
								: commonStyles.colors.cor5
						}
					/>
					<Cards
						title={'Usuários'}
						bgcolor={commonStyles.colors.cor2}
						ref={cardDataUsers}
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
