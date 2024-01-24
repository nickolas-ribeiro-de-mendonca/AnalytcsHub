import React, {forwardRef, useState, useImperativeHandle} from 'react';
import {VictoryPie} from 'victory-native';


const DataPie = (props, ref) => {
    const [dataPie, setDataPie] = useState([]);
	const {height} = props;
	useImperativeHandle(ref, () => ({
		setDataPie
	}));

	return (
		<VictoryPie
			data={dataPie}
			colorScale="qualitative"
			height={height}
			style={{
				labels: {
					fill: 'white',
					fontSize: 12,
					textAnchor: 'middle',
				},
			}}
		/>
	);
};

export default forwardRef(DataPie);
