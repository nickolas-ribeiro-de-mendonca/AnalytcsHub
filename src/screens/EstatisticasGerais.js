import React, {useEffect, useRef} from 'react';
import commonStyles from '../commonStyles';
import axios from 'axios';
import {server} from '../common';
import {ScrollView} from 'react-native-gesture-handler';
import {Dimensions, StyleSheet, View, useWindowDimensions} from 'react-native';
import {Header} from '../components/Header';
import Tables from '../components/Table';
import ModalDrop from '../components/ModalDrop';
import BarCharts from '../components/BarCharts';
import DataPie from '../components/DataPie';
import  LineChart  from '../components/LineChart';


const EstatisiticaGerais = props => {
	const initalDataRef = useRef([]);
    const filteredDataRef = useRef([])
	const tableDataRef = useRef([]);
    const dropdownEmpRef = useRef([])
    const dropdownMonthRef = useRef([])
    const barChartRef = useRef([])
    const dataPieRef = useRef([])
	const lineAppRef = useRef([])

    var emp = 'Empresas'
    var month = 'Meses'

	const getData = async () => {
        dropdownEmpRef.current.setSelectedOption("Empresas")
        dropdownMonthRef.current.setSelectedOption("Meses")
        try {
			const res = await axios.get(`${server}/estatisticas`);
			const objToArray = res.data.map(obj => {
				return Object.keys(obj).map(key => {
					return obj[key];
				});
			});
			initalDataRef.current = objToArray;
            filteredDataRef.current = objToArray
		} catch (error) {
			console.log('Estatisticas Gerais, getdata → ' + error);
		}
		refs();
	};

	useEffect(() => {
		getData();
	}, []);

	const getMonths = () => {
		const list = ["Meses"];
		initalDataRef.current.map(array => {
			const existingItem = list.find(item => item === array[2]);
			if (!existingItem) {
				list.push(array[2]);
			}
		});
		return list;
	};

	const getCompanies = () => {
		const list = ["Empresas"];
		initalDataRef.current.map(array => {
			const existingItem = list.find(item => item === array[1]);
			if (!existingItem) {
				list.push(array[1]);
			}
		});
		return list;
	};

    const handleSelectedCompany = value => {
        emp = value
        dropdownEmpRef.current.setSelected(value)
        handleSelect()
    }

    const handleSelectedMonth =  value => {
        month = value
        dropdownMonthRef.current.setSelected(value)
        handleSelect()
    }

    const handleSelect = () => {
        if(emp === "Empresas" && month === "Meses"){
            filteredDataRef.current = initalDataRef.current
        }
        if(emp !== "Empresas" && month === "Meses"){
            filteredDataRef.current = initalDataRef.current.filter( item => item[1] === emp)
        }



        if(emp === "Empresas" && month !== "Meses"){
            filteredDataRef.current = initalDataRef.current.filter( item => item[2] === month)
        }
        if(emp !== "Empresas" && month !== "Meses"){
            filteredDataRef.current = initalDataRef.current.filter(item => item[1] === emp && item[2] === month)
        }
        refs()
    }

	const tableList = () => {
		const data = [];
		var dataSorted = [];
		filteredDataRef.current.map(row => {
			const percent =
				(100 * row[4]) / (parseFloat(row[3]) + parseFloat(row[4]));
			const field = percent >= 0 ? percent : 0;
			const newRow = [row[0],row[1],row[3],row[4],field.toFixed(2)];
			data.push(newRow);
			dataSorted = data.sort(function (a, b) {
				return a[0] > b[0] ? 1 : -1;
			});
		});
		return dataSorted;
	};
    const barChart = () => {
		const data = filteredDataRef.current
		var newData = [0,0,0]
        
		data.map(line => {
			newData[0] = parseInt(newData[0]) + parseInt(line[5])
			newData[1] = parseInt(newData[1]) + parseInt(line[6])
			newData[2] = parseInt(newData[2]) + parseInt(line[7])
			
		})
		return newData
	}

    const dataChartBar = () => {
		const y = barChart()
		const data = [
			{x: 'Aberto', y: y[0], fill: commonStyles.colors.cor4},
			{x: 'Aplicado', y: y[1], fill: commonStyles.colors.azul},
			{x: 'Cancelado', y: y[2], fill: commonStyles.colors.vermelho},
		];

		return data;
	};

    const dataPie =  () => {
        var app = 0
        var agro = 0
        filteredDataRef.current.map(item => {
            agro = agro + parseFloat(item[3])
            app = app + parseFloat(item[4])
        })
        const data = [{label: `${agro}\nAgro`, x: agro, y: agro}, {label: `Agronomic\n${app}`, x: 'App', y: app}]
        return data
	}	

	const dataLineChart = () => {
		const dataAgro = []
		const dataApp = []
		const yAgro = []
		const yApp = []
		const x = getMonths()
		
		x.shift()
		
		x.map(month => {
			let totalAgro = 0
			let totalApp = 0
			filteredDataRef.current.map(line => {
				if(line[2] === month){
					totalAgro = totalAgro + parseFloat(line[3])
					totalApp = totalApp + parseFloat(line[4]) 
				}
			})
			yAgro.push(totalAgro)
			yApp.push(totalApp)
		})
		
		for (let index = 0; index < x.length; index++) {
			dataAgro.push({x: x[index], y: yAgro[index]})
			dataApp.push({x: x[index], y: yApp[index]})
		}
		return [dataAgro,dataApp]
	}

	const handleRefreshData = () => {
		getData()
	}

	const refs = () => {
        dropdownEmpRef.current.setList(getCompanies())
        dropdownMonthRef.current.setList(getMonths())
		tableDataRef.current.setLista(tableList());
        barChartRef.current.setDataBar(dataChartBar())
        dataPieRef.current.setDataPie(dataPie())
		lineAppRef.current.setData(dataLineChart())
	};
    
    const windowDimensions = () => {
        return parseFloat(Dimensions.get('window').width)
    }

    const tableWidthArr = () => {
        const width = windowDimensions()
        return [
            width*0.1,
            width*0.3,
            width*0.15,
            width*0.15,
            width*0.2,
        ]
    }
    
	return (
		<ScrollView>
			<View style={styles.container}>
				<Header
					name={'Estatísticas Gerais'}
					navigation={props.navigation}
					onRefreshData={handleRefreshData}
				/>
                <View style={styles.drop}>
                    <ModalDrop
                        handle={handleSelectedCompany}
                        ref={dropdownEmpRef}
                    />
                    <ModalDrop
                        ref={dropdownMonthRef}
                        handle={handleSelectedMonth}
                    />
                </View>

				<Tables
					tableHead={['WS', 'Empresa', 'Agro', 'App', '%Rec.app']}
					widthArr={tableWidthArr()}
					ref={tableDataRef}
                />

                <BarCharts
                    ref={barChartRef}
					xAxis={true}
					yAxis={false}
					domain={{x: [0.5, 3.5]}}
                />

                <View>
			    	<DataPie
                    	height={300} 
						ref={dataPieRef}
                    	colorScale={[commonStyles.colors.verde, commonStyles.colors.azul]}
                    />
			    </View>
				<LineChart
					ref={lineAppRef} 
					colors ={[commonStyles.colors.verde, commonStyles.colors.azul]}
					legend={["Agro","A3"]}
					legendX={150}
					legendY={300}
				/>
			</View>
		</ScrollView>
	);
};

export default EstatisiticaGerais;

const styles = StyleSheet.create({
	container: {
		backgroundColor: commonStyles.colors.cor1,
		flex: 1,
	},
    drop: {
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
});
