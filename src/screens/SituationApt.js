import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import SelectLists from '../components/SelectList';
import {tableData} from '../situacaoData';
import Tables from '../components/Table';
import commonStyles from '../commonStyles';
import {Cards} from '../components/Cards';
import BarCharts from '../components/BarCharts';
import {TitleTwo} from '../components/Titles';
import {Header} from '../components/Header';
import axios from 'axios';
import {server} from '../common';

const dataInitial = tableData.sort((a, b) => a[9] - b[9]);
const modifiedData = dataInitial.map(item => {
	const modifiedItem = [...item];
	modifiedItem[1] = item[1].split(' ').slice(0, 3).join(' ');
	modifiedItem[9] = Number(item[9].toFixed(2));
	return modifiedItem;
});

const SituationApt = props => {
	const initialDataRef = useRef();
	const selectListRef = useRef();
	const arrayDataRef = useRef();
	const filteredDataRef = useRef();
	const selectedEmpRef = useRef();
	const tableRef = useRef([]);
	const table2Ref = useRef([]);
   const barChartRef = useRef()

	const tableHead = [
		'WS',
		'Empresa',
		'Apelido',
		'Confirmado',
		'Cálculado',
		'Exportado',
		'Cancelado',
		'Editado',
		'Total',
	];
	const widthArr = [50, 200, 100, 100, 100, 100, 100, 100, 100];

	const [state] = useState({
		tableHead: tableHead,
		tableData: modifiedData,
		widthArr: widthArr,
	});

	const [filteredData, setFilteredData] = useState(state.tableData);

	const getAppointments = async () => {
		try {
			const res = await axios.get(`${server}/appointments`);
			const objToArray = res.data.map(obj => {
				return Object.keys(obj).map(key => {
					return obj[key];
				});
			});

			arrayDataRef.current = objToArray;
			initialDataRef.current = objToArray;
			filteredDataRef.current = objToArray;

			first();
		} catch (error) {
			console.log('getAppontments: ' + error);
		}
	};

	useEffect(() => {
		getAppointments();
	}, []);

	const selectListEmp = () => {
		const initialData = initialDataRef.current;
		const finalData = [];

		finalData.push({key: '', value: 'Empresas'});
		initialData.forEach(item => {
			const existingItem = finalData.find(obj => obj.value === item[1]);
			if (!existingItem) {
				finalData.push({key: item[0], value: item[1]});
			}
		});
		return finalData;
	};

	const handleSelect = value => {
		if (value !== '') {
			const foundArray = initialDataRef.current.filter(
				item => item[0] === value,
			);
			filteredDataRef.current = foundArray;
			selectedEmpRef.current = value;
		} else {
			filteredDataRef.current = initialDataRef.current;
			selectedEmpRef.current = value;
		}
		first();
	};

	const percentExp = () => {
		const data = dataTotals();
		return ((data[2] * 100) / (data[0] + data[1] + data[2])).toFixed(2);
	};
	const percentEdit = () => {
		const data = dataTotals();
		return ((100 * data[4]) / data[2]).toFixed(2);
	};
	const dataChartBar = () => {
      const x = totals()
		const data = [
			{x: 'Conf', y: x[0]},
			{x: 'Calc', y: x[1]},
			{x: 'Exp', y: x[2]},
			{x: 'Can', y: x[3]},
		];
      console.log(data)
		return data;
	};

	const first = () => {
		selectListRef.current.setData(selectListEmp());
		tableRef.current.setLista(setTable());
		table2Ref.current.setLista([totals()])
      barChartRef.current.setDataBar(dataChartBar())
		
	};

	const setTable = () => {
		return filteredDataRef.current;
	};

	const totals = () => {
		const data = filteredDataRef.current;
      var totals = [0,200,400,3,200,0]
      if(data){
		   data.map(item => {
            totals[0] = parseInt(totals[0]) + parseInt(item[3])
            totals[1] = parseInt(totals[1]) + parseInt(item[4])
            totals[2] = parseInt(totals[2]) + parseInt(item[5])
            totals[3] = parseInt(totals[3]) + parseInt(item[6])
            totals[4] = parseInt(totals[4]) + parseInt(item[7])
            totals[5] = parseInt(totals[0]) + parseInt(totals[2]) + parseInt(totals[3])
         })
      }
		console.log(totals);
      return totals
	};

	const dataTotals = () => {
		const data = [];
		const conf = reduceTotal(3);
		const calc = reduceTotal(4);
		const exp = reduceTotal(5);
		const edit = reduceTotal(7);
		const can = reduceTotal(6);
		const valid = conf + calc + exp;
		data.push(conf, calc, exp, can, edit, valid);
		return [data];
	};
	const reduceTotal = i => {
		return 10;
	};

	return (
		<ScrollView>
			<View style={styles.container}>
				<Header
					name={'Apontamentos por Empresa'}
					navigation={props.navigation}
				/>
				<View style={styles.drop}>
					<SelectLists
						ref={selectListRef}
						placeholder={'Empresas'}
						setSelected={handleSelect}
						width={150}
					/>
				</View>
				<View>
					<Tables
						tableHead={tableHead}
						widthArr={widthArr}
						ref={tableRef}
					/>
				</View>
				<TitleTwo title={'Totalizadores'} />
				<View>
					<Tables
						tableHead={['Conf', 'Calc', 'Exp', 'Can', 'Edit', 'Validos']}
						widthArr={[60, 60, 60, 60, 60, 60]}
						ref={table2Ref}
					/>
				</View>
				<View >
					<BarCharts
						xAxis={true}
						yAxis={false}
                  ref={barChartRef}
						//data={dataChartBar()}
                  domain={{x: [0.5, 4.5]}}
						colors={[
							commonStyles.colors.verde,
							commonStyles.colors.amarelo,
							commonStyles.colors.vermelho,
                     commonStyles.colors.cor4,
						]}
					/>
				</View>
				<View style={styles.cards}>
					<Cards
						data={percentExp()}
						bgcolor={
							percentExp() > 70
								? `${commonStyles.colors.verde}`
								: percentExp() > 50
								? `${commonStyles.colors.cor4}`
								: `${commonStyles.colors.cor5}`
						}
						title={'% Exp.'}
						symbol={'%'}
					/>
					<Cards
						data={percentEdit()}
						title={'%Edit/Exp'}
						symbol={'%'}
						bgcolor={`${commonStyles.colors.cor2}`}
					/>
				</View>
			</View>
		</ScrollView>
	);
};

export default SituationApt;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: commonStyles.colors.cor1,
	},
	drop: {
		alignItems: 'center',
	},
	cards: {
		padding: 20,
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
	chartBars: {
		alignContent: 'center',
		justifyContent: 'center',
	},
});
