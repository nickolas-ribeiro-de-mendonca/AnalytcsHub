import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {
	VictoryLine,
	VictoryChart,
	VictoryAxis,
	VictoryLabel,
	VictoryLegend,
	Text,
} from 'victory-native';
import {View} from 'react-native';
import commonStyles from '../commonStyles';
import {ScrollView} from 'react-native-gesture-handler';

const LineChart = (props, ref) => {
	const [data, setData] = useState([]);
	const {colors, legend, legendX, legendY} = props;
	let widht = 0;

	useImperativeHandle(ref, () => ({
		setData,
	}));

	if (data.length > 0) {
		widht = data[0].length * 100;
	}

	const yDomain = () => {
		let yMax = 0;
		if (data.length !== 0) {
			data.map(objectArray => {
				objectArray.map(obj => {
					if (obj.y > yMax) yMax = obj.y;
				});
			});
		}
		return yMax * 1.12;
	};

	return (
		<View style={{alignItems: 'center'}}>
			<ScrollView horizontal={true}>
				<VictoryChart
					padding={{bottom: 100, left: 50, right: 30, top: 10}}
					domain={{y: [0, `${yDomain()}`]}}
					width={widht}
					height={350}
					domainPadding={10}>
					<VictoryLegend
						y={legendY}
						x={legendX}
						gutter={30}
						orientation="horizontal"
						data={legend.map((item, index) => ({
							name: item,
							symbol: {fill: colors[index]},
							labels: {fill: commonStyles.colors.white},
						}))}
					/>
					<VictoryAxis
						style={{
							axis: {stroke: commonStyles.colors.white},
							ticks: {stroke: commonStyles.colors.white},
							tickLabels: {
								fill: commonStyles.colors.white,
								fontSize: 10,
							},
						}}
					/>
					<VictoryAxis
						dependentAxis
						style={{
							axis: {stroke: commonStyles.colors.white},
							ticks: {stroke: commonStyles.colors.white},
							tickLabels: {
								fill: commonStyles.colors.white,
								fontSize: 10,
							},
						}}
					/>
					{data.map((line, item = 0) => {
						return (
							<VictoryLine
								width={1000}
								labelComponent={<VictoryLabel dx={0} />}
								style={{
									data: {stroke: colors[item], strokeWidth: 1.5},
									labels: {fontSize: 10, fill: 'white'},
								}}
								data={line}
								labels={({datum}) => datum.y}
								key={line[0]}
							/>
						);
						item++;
					})}
				</VictoryChart>
			</ScrollView>
		</View>
	);
};

export default forwardRef(LineChart);
