import React, {forwardRef, useState, useImperativeHandle} from 'react';
import {VictoryAxis,VictoryBar,VictoryChart} from 'victory-native';
import commonStyles from '../commonStyles';
import moment from 'moment';

const BarCharts = (props, ref) => {
	const [dataBar, setDataBar] = useState([]);
	const { xAxis, yAxis, domain} = props;
	useImperativeHandle(ref, () => ({
		setDataBar,
	}));

	return (
		<VictoryChart
			domain={domain}
			animate={{
				duration: 3000,
				onLoad: {duration: 1000},
			}}>
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
			
			{dataBar.map((item) => {
				return(
					<VictoryBar
					key={item.x}
					data={[item]}
					style={{ data: { fill: item.fill }, labels: { fill: 'white' }} }
					labels={({ datum }) => String(Math.round(datum.y))}
					barRatio={3}
					cornerRadius={{topLeft: 5, topRight: 5}}
					/>
				)
			})}
			
		</VictoryChart>
	);
};

export default forwardRef(BarCharts);
