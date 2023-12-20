import React, {Component, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';
import commonStyles from '../commonStyles';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown'

class SelectLists extends Component {
	render(){
        return (
	    	<View style={styles.container}>
	    		<SelectList 
                    data={this.props.data}
                    placeholder={this.props.placeholder}
                    boxStyles={[styles.box, {width:this.props.width}]}
                    inputStyles={styles.input}
                    dropdownTextStyles={styles.dropText}
                    dropdownStyles={styles.drop}
                    search= {false}
                    setSelected={(val) => this.props.setSelected(val)}
                    arrowicon={<FontAwesomeIcon icon={faChevronDown} size={12} color={commonStyles.colors.white}/>}
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
        color: commonStyles.colors.white,
        fontFamily: commonStyles.fontFamily
    },
    dropText:{
        color: commonStyles.colors.white,
        fontFamily: commonStyles.fontFamily
    },
    drop:{
        width: 200
    }
    
})
