import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {StyleSheet, View, Text,FlatList} from 'react-native';
import {DataTable, PaperProvider} from 'react-native-paper';
import commonStyles from '../commonStyles';

const TableData = (props, ref) => {
	const [data, setData] = useState([]);
	const {headerTitle} = props;

	useImperativeHandle(ref, () => ({
		setData,
	}));

    const DATA = [
        { ws: '1', nome: 'John', sinc: 30, ms: '1.1.1' },
        { ws: '2', nome: 'Jane', sinc: 25, ms: '1.1.1' },
        { ws: '3', nome: 'Doe', sinc: 40, ms: '1.1.1' },
    ];

	const TableCell = ({text}) => (
		<View style={{flex: 1, borderWidth: 1, padding: 10}}>
			<Text>{text}</Text>
		</View>
	);

	const TableRow = ({item}) => (
		<View style={{flexDirection: 'row'}}>
			<TableCell text={item.ws} />
			<TableCell text={item.nome} />
			<TableCell text={item.sinc.toString()} />
            <TableCell text={item.ms} />
		</View>
	);

	return (
		<View style={{flex: 1, marginTop: 50}}>
			<View style={{flexDirection: 'row', marginBottom: 10}}>
				<TableCell text="ws" />
				<TableCell text="nome" />
				<TableCell text="sinc" />
                <TableCell text="ms" />
			</View>
			<FlatList
				data={DATA}
				renderItem={({item}) => <TableRow item={item} />}
				keyExtractor={item => item.ws}
			/>
		</View>
	);
};

export default forwardRef(TableData);

const styles = StyleSheet.create({
	title: {
		justifyContent: 'center',
	},
	cell: {
		alignItems: 'center',
		justifyContent: 'center',
		height: 45,
	},
});

/*<PaperProvider>
            
			<DataTable style={styles.table}>
				<DataTable.Header style={styles.header}>
                    {headerTitle.map((item) => (
                        <DataTable.Title style={styles.title}>   
                            {item}
                        </DataTable.Title>
                    ))}
                </DataTable.Header>

				{data.map((line, index) => (
                    <DataTable.Row key={index} style={styles.row} >
                        {line.map((cell) => (
                            <DataTable.Cell key={cell} style={styles.cell} >
                                {cell}
                            </DataTable.Cell>
                        ))}						
					</DataTable.Row>
				))}
			</DataTable>
            
		</PaperProvider>*/
