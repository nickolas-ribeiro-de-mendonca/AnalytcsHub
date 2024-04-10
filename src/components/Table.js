import React, {
	Component,
	useState,
	forwardRef,
	useImperativeHandle,
} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {Table, Row, Rows} from 'react-native-table-component';
import commonStyles from '../commonStyles';
import {LineSegment} from 'victory-native';
import {color} from 'react-native-reanimated';

const Tables = (props, ref) => {
	const [lista, setLista] = useState([]);

	const {tableHead, widthArr, colNumber, colors, limits} = props;

	useImperativeHandle(ref, () => ({
		setLista,
	}));

		
	return (
		<View style={styles.container}>
			<ScrollView horizontal={true}>
				<View>
					<Table borderStyle={styles.table}>
						<Row
							data={tableHead}
							widthArr={widthArr}
							style={styles.head}
							textStyle={styles.textHead}
						/>
					</Table>
					<ScrollView nestedScrollEnabled={true}>
						<Table borderStyle={styles.table}>
							{lista.map((rowData, index) => (
								<Row
									key={index}
									data={rowData}
									widthArr={widthArr}
									style={styles.row}
									textStyle={[
										styles.text,
										{
											color:
												colNumber == undefined ? 'white' :
												rowData[colNumber] <= `${limits[0]}`
													? `${colors[0]}`
													: rowData[colNumber] <= `${limits[1]}`
													? `${colors[1]}`
													: `${colors[2]}`
										},
									]}
								/>
							))}
						</Table>
					</ScrollView>
				</View>
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		maxHeight: 294,
		padding: 16,
		paddingTop: 30,
		alignItems: 'center',
	},
	table: {
		//borderWidth: 1,
		//borderBottomColor: commonStyles.colors.white,
	},
	head: {
		borderWidth: 0.5,
		borderColor: commonStyles.colors.lightGray,
		borderRadius: 7,
		height: 50,
		backgroundColor: commonStyles.colors.cor2,
	},
	textHead: {
		textAlign: 'center',
		color: commonStyles.colors.white,
		fontFamily: 'Roboto-Bold',
	},
	text: {
		textAlign: 'center',
		color: commonStyles.colors.white,
		fontFamily: commonStyles.fontFamily,
		fontWeight: 600,
	},
	row: {
		height: 28,
		borderBottomWidth: 0.5,
		borderBottomColor: commonStyles.colors.lightGray,
	},
});

export default forwardRef(Tables);
