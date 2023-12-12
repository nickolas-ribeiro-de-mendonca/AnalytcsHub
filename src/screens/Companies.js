import React, {useState} from 'react';
import {Text, View, StyleSheet, ScrollView, Button} from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import { VictoryBar, VictoryChart, VictoryPie, VictoryAxis } from 'victory-native';
import {tableHead, tableData, widthArr} from '../fonts';
import { SelectList } from 'react-native-dropdown-select-list';

const initialState = {
   tableHead: tableHead,
   tableData: tableData,
   widthArr: widthArr
}

const Companies = () => {
   const [state] = useState({
      tableHead: tableHead,
      tableData: tableData,
      widthArr: widthArr
   })

   const [selectedCompany, setSelectedCompany] = useState(null);
   const [filteredData, setFilteredData] = useState(state.tableData);


   const situationCaunter = situation => {
      const tableData = filteredData;
      let count = 0
      tableData.forEach(data => {
        if (data[5] === situation) {
          count++
        }
      });
      return count
   }

   const countMobServerVersions = data => {
      const versionsCount = {};
  
      data.forEach(item => {
        const version = item[6]
  
        if (versionsCount[version]) {
          versionsCount[version]++
        } else {
          versionsCount[version] = 1
        }
      })
      return versionsCount;
   }

   const selectList = () => {
      const { tableData } = state
      const data = []
      tableData.forEach(item => {
         const existingItem = data.find(obj => obj.value === item[1])
         if (!existingItem) {
            data.push({key: item[0], value: item[1]})
         }
      })
      return data
   }
   const handleSelectCompany = (value) => {
      setSelectedCompany(value);
      const foundArray = tableData.filter(item => item[0] === value);
      setFilteredData(foundArray);
   }
   const data = [
      { situation: 'Normal', amount: situationCaunter('Normal') },
      { situation: 'Atrasado', amount: situationCaunter('Atrasado') },
      { situation: 'Parado', amount: situationCaunter('Parado') },
   ]

   const versionsCount = countMobServerVersions(filteredData);
   const dataPie = Object.keys(versionsCount).map(version => ({
      x: version,
      y: versionsCount[version],
   }))
  

   return(
      <ScrollView>
      <View style={styles.container}>
         <View style={styles.listView}>
            <SelectList
               setSelected={(val) => handleSelectCompany(val)}
               data={selectList}
               search={false}
               placeholder='Empresas'
               boxStyles={{borderColor:"white", width:200, alignContent:'center'}}
               inputStyles={{color: 'white' }}
               dropdownTextStyles={{color:"white"}}
            />
         </View>
         <View style={styles.btnView}>
            <Button color={'gray'} title='Reset' onPress={() => setFilteredData(initialState.tableData)}/>
         </View>
         <Text style={[styles.title, {padding:20}]}>Empresas</Text>
         <ScrollView horizontal={true} >
            <Table borderStyle={styles.table} >
               <Row data={state.tableHead} widthArr={state.widthArr} style={styles.head} textStyle={styles.text}/>
               <Rows data={filteredData} widthArr={state.widthArr} textStyle={styles.text} style={styles.rows} />
            </Table>
         </ScrollView>
         
         <View style={styles.chartOne}>
            <Text style={styles.title}>Situação</Text>
            <VictoryChart 
               width={400} 
               domain={{ x: [0, 4] }}
               
            >
               <VictoryAxis
                   style={{
                     axis: { stroke: 'white' },
                     ticks: { stroke: 'white' }, 
                     tickLabels: { fill: 'white' }
                   }}
                 />
               <VictoryAxis
                   dependentAxis
                   style={{
                     axis: { stroke: 'white' },
                     ticks: { stroke: 'white' }, 
                     tickLabels: { fill: 'white' } 
                   }}
                 />
               <VictoryBar
                  animate={{ duration: 2000, onLoad: { duration: 1000 }}}
                  barRatio={0.5} 
                  data={data} 
                  x="situation" 
                  y="amount" 
                  style={{
                     data: { fill: ({ datum }) => {
                       if (datum.situation === 'Normal') {
                         return '#32CD32'
                       } else if (datum.situation === 'Atrasado') {
                         return '#4682B4'
                       } else if (datum.situation === 'Parado') {
                         return '#FF6347'
                       }
                       return '#000000'
                     }},
                     parent: { border: '1px solid #ccc' }
                   }}
               />
            </VictoryChart>
         </View>

         <View>
            <Text style={styles.title} >MobServer</Text>
            <VictoryPie
               data={dataPie}
               //animate={{ duration: 3000, onLoad: { duration: 1000 }}}
               colorScale="qualitative"
               height={300}
               style={{
                  labels: {
                    fill: 'white',
                    fontSize: 12, 
                  },
               }}
            />
         </View>
      </View>
      </ScrollView>
   )

}

export default Companies

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#191013',
    flex: 1,
  },
  title: {
    paddingTop: 20,
    textAlign: 'center',
    fontSize: 20,
    color: '#f4f4f2',
  },
  table: {
    borderWidth: 2,
    borderColor: '#f4f4f2',
  },
  head: {
    height: 50,
    backgroundColor: '#5b88a5',
  },
  rows: {
    backgroundColor: '#d4cdc5',
  },
  text: {
    textAlign: 'center',
    margin: 3,
  },
  chartOne: {
    paddingTop: 10,
  },
   listView:{
      paddingTop: 25,
      flex: 1,
      justifyContent:'center',
      alignItems:'center'
   },
   btnView:{
      flex: 1,
      justifyContent:'center',
      alignItems:'center',
      paddingTop:20
   }
});