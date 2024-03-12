import React, {useState, useEffect, useRef } from 'react';
import { View, StyleSheet, ScrollView, Dimensions} from 'react-native';
import {apontadorData, apontadorHead, apontadorWidthArr, tableData} from '../fonts';
import commonStyles from '../commonStyles';
import {Header} from '../components/Header';
import ModalDrop from '../components/ModalDrop'
import Tables from '../components/Table';
import BarCharts from '../components/BarCharts';
import {TitleTwo} from '../components/Titles';
import Cards from '../components/Cards';
import { server } from '../common';
import axios from 'axios';


const Situation = (props) => {
	const [initialdata , setInitialData] = useState([])
	const initialDataRef = useRef([])
	const initialLaborsRef = useRef([])
	const filteredDataRef = useRef()
	const dropdownEmpListRef = useRef([])
	const dropdownUserListRef = useRef([])
	const barChartRef = useRef()
	const tableOneRef = useRef([])
	const tableTwoRef = useRef([])	
	const cardDataExpRef = useRef()
	const cardDataUsers = useRef()

	const getAppointmentsLabor = async () => {
		dropdownEmpListRef.current.setSelectedOption("Empresas")
		dropdownUserListRef.current.setSelectedOption("Usuários")
		try {
			const res = await axios.get(`${server}/appointmentsLabor`)
			const objToArray = res.data.map(obj => {
				return Object.keys(obj).map(key => {
					return obj[key]
				})
			})
			initialDataRef.current = objToArray
			setInitialData(objToArray)
			filteredDataRef.current = objToArray
			laborData()
			renderizar()
			
		} catch (error) {
			console.log('getAppointmentLabor'+ error)
		}
	}

	useEffect(() => {
		getAppointmentsLabor()
	}, [initialDataRef])

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
			newLaborList =  initialDropdownUser()
			getAppointmentsLabor()
		}
		renderizar()
		dropdownUserListRef.current.setList(newLaborList)
	};
	

	const handleSlectedUser = value => {		
		var oldLaborList = dropdownUserListRef.current.getList()
		if (value !== 'Usuários') {
			const empSelected = dropdownEmpListRef.current.getSelected()
			const empCodigo = (initialDataRef.current.filter(item => item[4] == value))[0][0]
			const usuNome = (initialDataRef.current.filter(item => item[4] == value))[0][4]
			const newData = initialDataRef.current.filter(item => item[4] === usuNome);
			filteredDataRef.current = newData
			if(empSelected !== "Empresas"){
				oldLaborList = initialDataRef.current.filter(item => item[0] === empCodigo).map(labor => {
					return labor[4]
				})
			}
		}else {
			filteredDataRef.current = initialDataRef.current
		}
		renderizar()
		dropdownUserListRef.current.setList(oldLaborList)
	};

	const getWidthArr = () => {
		const windowWidth = Dimensions.get('window').width;
		const widthArr = (windowWidth - 33) / 4;
		return widthArr;
	};

	const dataChartBar = () => {
		const y = barChart()
		const data = [
			{x: 'Confirmado', y: y[0], fill: commonStyles.colors.cor3},
			{x: 'Calculado', y: y[1], fill: commonStyles.colors.azul},
			{x: 'Exportado', y: y[2], fill: commonStyles.colors.verde},
		];
		return data;
	};

	const renderizar = () => {
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
					<ModalDrop
						initialOption={"Empresas"}
						initialScrollIndex={0}
						handle={handleSelectCompany}
						ref={dropdownEmpListRef}
					/>
					<ModalDrop
						initialOption={"Usuários"}
						initialScrollIndex={0}
						handle={handleSlectedUser}
						ref={dropdownUserListRef}
					/>
				</View>

				<Tables
					tableHead={["WS", "ID", "Apontador", "Apontamentos", "Tempo de Envio"]}
					widthArr={[48, 48, 95, 95, 95]}
					ref={tableOneRef}
				/>

				<TitleTwo title={'Totalizadores'} />
				<Tables
					ref={tableTwoRef}
					tableHead={['Confirmado', 'Calculado', 'Exportado', 'Total']}
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
