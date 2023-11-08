import {LineChart, Line, XAxis, YAxis} from 'recharts';


export const RenderLineChart = (props) => {
    const { data } = props;

    return (
      <LineChart width={650} height={300} data={data}>
        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
        <XAxis dataKey="name" fontSize={10}/>
        <YAxis fontSize={12}/>
      </LineChart>
    );
};