import React, {forwardRef, useState, useImperativeHandle} from 'react';
import {VictoryAxis,VictoryBar,VictoryChart} from 'victory-native';
import commonStyles from '../commonStyles';
import moment from 'moment';

const BarCharts = (props, ref) => {
	const [dataBar, setDataBar] = useState([]);
	const { data, colors, xAxis, yAxis, domain} = props;
	useImperativeHandle(ref, () => ({
		setDataBar,
	}));
	console.log('chamou aqui no funcao')
	return (
		<VictoryChart
			domain={domain}
			animate={{
				duration: 2000,
				onLoad: {duration: 2000},
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
			<VictoryBar
				width={200}
				height={200}
				labels={({datum}) => datum.y.toFixed(0)}
				data={dataBar}
				style={{
					data: {
					  fill: ({ datum }) => datum.fill
					},
					labels: { fill: 'white' },
				}}
			/>
		</VictoryChart>
	);
};

export default forwardRef(BarCharts);
