import React, {Component, useState, forwardRef, useImperativeHandle} from 'react';
import {StyleSheet, View, ScrollView, } from 'react-native';
import {Table, Row, Rows} from 'react-native-table-component';
import commonStyles from '../commonStyles';

const Tables = (props, ref) => {
	const [lista, setLista] = useState([]);

	const { tableHead, widthArr } = props;
    useImperativeHandle(ref, () => ({
        setLista
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
							<Rows
								data={lista}
								widthArr={widthArr}
								style={styles.row}
								textStyle={styles.text}
							/>
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
		borderWidth: 1,
		borderColor: commonStyles.colors.white,
	},
	head: {
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
		fontWeight: 700,
	},
	row: {
		height: 28,
	},
});

export default forwardRef(Tables);
