import React, {forwardRef, useState, useImperativeHandle} from 'react';
import { VictoryAxis, VictoryBar, VictoryChart } from 'victory-native';
import commonStyles from '../commonStyles';
import {Dimensions, View} from 'react-native';
const BarCharts = (props, ref) => {
	const [dataBar, setDataBar] = useState([]);
	const {xAxis, yAxis, domain, handle} = props;
	const windowDimensions = parseFloat(Dimensions.get('window').width)

	useImperativeHandle(ref, () => ({
		setDataBar,
		
	}));

	const handleBarClick = (value) => {
		handle(value)
	}
	
	return (
	<View style={{alignItems:'center'}}>
		<VictoryChart 
			width={windowDimensions}
			domain={domain}
			animate={{
				duration: 2000,
				onLoad: {duration: 500},
			}}
			events={[{
                childName: 'all',
                target: 'data',
                eventHandlers: {
                    onPressIn: (event, key) => {
                        handleBarClick(key.data[0].x)
                    },
                },
            }]}
		>
			{xAxis && (
				<VictoryAxis
					style={{
						axis: {stroke: commonStyles.colors.white},
						ticks: {stroke: commonStyles.colors.white},
						tickLabels: {fill: commonStyles.colors.white},
					}}
				/>
			)}

			{yAxis && (
				<VictoryAxis
					dependentAxis
					style={{
						axis: {stroke: commonStyles.colors.white},
						ticks: {stroke: commonStyles.colors.white},
						tickLabels: {fill: commonStyles.colors.white},
					}}
				/>
			)}
		
			{dataBar.map(data => {
				return (
					<VictoryBar
						key={data.x}
						data={[data]}
						style={{data: {fill: data.fill}, labels: {fill: 'white'}}}
						labels={({datum}) => String(Math.round(datum.y))}
						barRatio={3}
						cornerRadius={{topLeft: 5, topRight: 5}}
					/>
				);
			})}
		</VictoryChart>

		
		</View>
	);
};

export default forwardRef(BarCharts);
