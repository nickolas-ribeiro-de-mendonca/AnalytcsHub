import React, {Component, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';
import commonStyles from '../commonStyles';

class SelectLists extends Component {
	render(){
        return (
	    	<View style={styles.container}>
	    		<SelectList 
                    data={this.props.data}
                    placeholder={this.props.placeholder}
                    boxStyles={styles.box}
                    inputStyles={styles.input}
                    dropdownTextStyles={styles.dropText}
                    dropdownStyles={styles.drop}
                    search= {false}
                    setSelected={(val) => this.props.setSelected(val)}
                    />
	    	</View>
	    );
    }
};

export default SelectLists;

const styles = StyleSheet.create({
    container:{

    },
    box:{
        borderColor: 'white',
        width: 200,
        alignContent: 'center',
    },
    input:{
        color: commonStyles.colors.white
    },
    dropText:{
        color: commonStyles.colors.white
    },
    drop:{
        width: 200
    }
    
})
