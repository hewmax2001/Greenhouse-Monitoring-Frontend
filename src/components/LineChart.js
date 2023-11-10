import {LineChart, Line, XAxis, YAxis, ResponsiveContainer} from 'recharts';

// Line Chart Graph component
// Used for Sensor data of past 7 days
export const RenderLineChart = (props) => {
    const { data } = props;

    return (
        <ResponsiveContainer aspect={2}>
          <LineChart data={data}>
            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
              {/* XAxis = Dates */}
              <XAxis dataKey="name" fontSize={10}/>

              {/* YAxis = Plotted Data */}
              <YAxis fontSize={12}/>
          </LineChart>
        </ResponsiveContainer>
    );
};