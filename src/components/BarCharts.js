import React, {Component} from 'react';
import {VictoryAxis, VictoryBar, VictoryChart} from 'victory-native';
import commonStyles from '../commonStyles';

export default class BarCharts extends Component {
	render() {
		return (
			<VictoryChart
				domain={{x: [0.5, this.props.data.length+0.5]}}
				animate={{
					duration:2000, onLoad:{duration:1000}
				}}>
				{this.props.xAxis && (
					<VictoryAxis
						style={{
							axis: {stroke: commonStyles.colors.white},
							ticks: {stroke: commonStyles.colors.white},
							tickLabels: {fill: commonStyles.colors.white},
						}}
					/>
				)}
				{this.props.yAxis && (
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
					style={{
						data: {
							fill: ({datum}) => {
								if (datum.x === this.props.data[0].x) {
									return this.props.colors[0];
								} else if (datum.x === this.props.data[1].x) {
									return this.props.colors[1];
								} else if (datum.x === this.props.data[2].x) {
									return this.props.colors[2];
								} else if (datum.x === this.props.data[3].x) {
									return this.props.colors[3];
								}
								return '#000000';
							},
						},
						//parent: {border: '1px solid #ccc'},
                        labels: { fill: "white" }
					}}
                    labels={({datum}) => datum.y.toFixed(0)}
					data={this.props.data}
				/>
			</VictoryChart>
		);
	}
}
