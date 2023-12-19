import React, {Component} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {Table, Row, Rows} from 'react-native-table-component';
import commonStyles from '../commonStyles';

export default class Tables extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tableHead: props.tableHead,
			tableData: props.tableData,
			widthArr: props.widthArr,
		};
	}
   componentDidUpdate(prevProps) {
      if (prevProps.tableData !== this.props.tableData) {
        this.setState({ tableData: this.props.tableData });
      }
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
		maxHeight: 318,
		padding: 16,
		paddingTop: 30,
		alignItems: 'center'
	},
    table:{
        borderWidth: 0.5,
        borderColor: commonStyles.colors.lightGray
    },
	head: {
		height: 30,
	},
	text: {
		textAlign: 'center',
      color: commonStyles.colors.white
	},
	row: {		
		height: 30,
	},
});
