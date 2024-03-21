import React, {forwardRef, useState, useImperativeHandle} from 'react';
import {View} from 'react-native';
import {VictoryChart, VictoryPie} from 'victory-native';

const DataPie = (props, ref) => {
	const [dataPie, setDataPie] = useState([]);
	const {height, colorScale, handle} = props;
	useImperativeHandle(ref, () => ({
		setDataPie,
	}));

	const handlePieClick = (value) => {
		handle(value)
	}

	return (
		<View style={{alignItems: 'center'}}>
			
				<VictoryPie
					data={dataPie}
					colorScale={colorScale}
					height={height}
					style={{
						labels: {
							fill: 'white',
							fontSize: 12,
							textAnchor: 'middle',
						},
					}}
					events={[
						{
							target:'data',
							eventHandlers: {
								onPressIn:  (event, key, a) =>{
									handlePieClick(key.datum.xName)
								}
							}
					
						}
					]}
				/>
			
		</View>
	);
};

export default forwardRef(DataPie);
