import React, {Component} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {Table, Row, Rows} from 'react-native-table-component';
import commonStyles from '../commonStyles';


export default class ExampleTwo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tableHead: props.tableHead,
			tableData: props.tableData,
			widthArr: props.widthArr,
		};
	}

	render() {
		const state = this.state;
		return (
			<View style={styles.container}>
				<ScrollView horizontal={true}>
					<View>
						<Table borderStyle={styles.table}>
							<Row
								data={state.tableHead}
								widthArr={state.widthArr}
								style={styles.head}
								textStyle={styles.text}
							/>
						</Table>
						<ScrollView>
							<Table borderStyle={styles.table}>
								<Rows
									data={state.tableData}
									widthArr={state.widthArr}
									style={styles.row}
									textStyle={styles.text}
								/>
							</Table>
						</ScrollView>
					</View>
				</ScrollView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		height: 320,
		padding: 16,
		paddingTop: 30,
	},
    table:{
        borderWidth: 0.5,
        borderColor: commonStyles.colors.cor2
    },
	head: {
		height: 30,
	},
	text: {
		textAlign: 'center',
	},
	row: {		
		height: 30,
	},
});
