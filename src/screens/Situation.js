import React, { Component } from "react";
import {Text, View, StyleSheet, ScrollView} from 'react-native'
import { apontadorData, apontadorHead, apontadorWidthArr } from "../fonts";
import { Table, Row, Rows } from 'react-native-table-component'
import { VictoryAxis, VictoryBar, VictoryChart } from "victory-native";

export default class Situation extends Component {

	constructor(props) {
		super(props)
		this.state = {
			tableHead: apontadorHead,
			tableData: apontadorData,
			widthArr: apontadorWidthArr
		}
	}

	apontamentos = () => {
		let apontamentos = []
		for (let i = 0; i < this.state.tableData.length; i++) {
			for (let j = 0; j < this.state.tableHead.length; j++) {
				if(j === 2) apontamentos.push(this.state.tableData[i][j])
			}
		}
		return apontamentos
	}

	tempo = () => {
		let tempo = []
		for (let i = 0; i < this.state.tableData.length; i++) {
			for (let j = 0; j < this.state.tableHead.length; j++) {
				if(j === 2) tempo.push(this.state.tableData[i][j])
			}
		}
		return tempo
	}

	render () {
		const tableHead = ['Confirmado', 'Calculado', 'Exportado', 'Total']
		const apontamentos = this.apontamentos().reduce((total, elemento) => total + elemento , 0)
		const conf = apontamentos * 0.2
		const calc = apontamentos* 0.1
		const expt = apontamentos - conf - calc
		const pExpt = expt / apontamentos * 100
		const dataRow = [conf, calc, expt, apontamentos]


		return(
			<ScrollView style={{backgroundColor:'#191013'}}>
				<View style={styles.container}>
					<Text style={styles.title}>Apontadores</Text>
					<Table borderStyle={styles.table}>
						<Row data={this.state.tableHead} style={styles.head} textStyle={styles.tableText}/>
						<Rows data={this.state.tableData} textStyle={styles.tableText}/>
					</Table>

					<Text style={styles.title}>Geral</Text>
					<Table borderStyle={styles.table}>
						<Row data={tableHead} style={styles.head} textStyle={styles.tableText}/>
						<Row data={dataRow} textStyle={styles.tableText}/>
					</Table>

					<VictoryChart  domain={{x:[0 , 4]}} animate={{ duration: 2000 }}>
						<VictoryAxis
							style={{
      						axis: { stroke: 'white' },
      						ticks: { stroke: 'white' }, 
      						tickLabels: { fill: 'white' }
    						}}
						/>
						
						<VictoryBar
							data={[
								{ x: "Confirmado", y: dataRow[0], fill: '#FF6347'},
								{ x: "Calculado", y: dataRow[1], fill: '#4682B4'},
								{ x: "Exportado", y: dataRow[2], fill: '#32CD32' },
							]}
							style={{
								data: {
								  fill: ({ datum }) => datum.fill,
								},
								labels: { 
									fill: "white" 
								}
							 }}
							 labels={({ datum }) => datum.y}
						/>
					</VictoryChart>
					
					<View style={styles.cards}>
						<View style={[styles.card, {backgroundColor : pExpt >= 70 ? '#32CD32' : 'none'}]} >
							<Text style={styles.cardTitle}>Dados Exportados</Text>
							<Text style={styles.cardNumber} >{pExpt.toFixed(1)}%</Text>
						</View>
						<View style={styles.card} >
							<Text style={styles.cardTitle}>Usuários</Text>
							<Text style={styles.cardNumber}>{this.state.tableData.length}</Text>
						</View>
					</View>

				</View>
				
			</ScrollView>
		)	
	}
}

const styles = StyleSheet.create({
	container:{
		backgroundColor:'#191013',
		flex:1
	},
	table: {
		borderWidth:2,
		borderColor: '#f4f4f2',
	},
	head:{
		height:50,
		backgroundColor: '#5b88a5',
	},
	tableText:{
		textAlign:"center",
		color:'#f4f4f2'
	},
	title:{
		fontSize:20,
		color:'#f4f4f4',
		textAlign:"center",
		padding: 20
	},
	cards:{
		padding:20,
		flexDirection:"row",
		justifyContent:"space-evenly"
	},
	card:{
		borderColor: '#5b88a5',
		borderWidth: 1,
		borderRadius: 15,
		padding:10,
		width: 150,
		
	},
	cardTitle:{
		textAlign:"center",
		fontSize: 10,
		color: '#f4f4f4'
	},
	cardNumber:{
		textAlign:"center",
		fontSize: 25,
		color:'#f4f4f4'
	}


})

















