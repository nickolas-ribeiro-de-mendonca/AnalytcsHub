import React, {forwardRef, useImperativeHandle, useState} from 'react';
import { StyleSheet } from 'react-native';
import {DataTable, DefaultTheme, PaperProvider} from 'react-native-paper';
import commonStyles from '../commonStyles';

const TableData = (props, ref) => {
	const [data, setData] = useState([]);
    const {headerTitle,headerStyle} = props

	useImperativeHandle(ref, () => ({
		setData,
	}));
    
	return (
		<PaperProvider>
			<DataTable style={styles.dataTable}>
				<DataTable.Header style={headerStyle}>
                    {headerTitle.map((item) => (
                        <DataTable.Title 
                            textStyle={styles.titleText}
                            style={styles.title}
                        >
                            {item}
                        </DataTable.Title>
                    ))}
                    
                </DataTable.Header>
				{data.map((line, index) => (
					<DataTable.Row key={index} style={styles.row}>
                        <DataTable.Cell style={styles.cell}>{line[0]}</DataTable.Cell>
						<DataTable.Cell >{line[7]}</DataTable.Cell>
						<DataTable.Cell >{line[4]}</DataTable.Cell>
						<DataTable.Cell >{line[6]}</DataTable.Cell>
					</DataTable.Row>
				))}
			</DataTable>
		</PaperProvider>
	);
};

export default forwardRef(TableData);

const styles = StyleSheet.create({
    dataTable:{
        justifyContent:'center',
        padding:'5%',
        textAlign:'center'
    },
    title: {
        justifyContent:'space-between',
        alignContent:'center'
    },
    titleText:{
        color: commonStyles.colors.white,
        fontSize:15,
        textAlign:'center',
    },
    row:{
        
    },  
    cell:{
        alignItems:'center',
        justifyContent:'space-between'
    }
})
