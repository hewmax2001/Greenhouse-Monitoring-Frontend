import Chart from "react-apexcharts";
import {useEffect} from "react";
import axios from "axios";

export const TemperatureChart = (props) => {

  useEffect(() => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'http://127.0.0.1:8000/api/sensordata_latest/',
      headers: {}
    };

    axios(config)
        .then((response) => {
          if (response.data) {

          }
        })
        .catch((error) => {
          console.log(error);
        });
  }, []);

  const series = [
    {
      name: "Temperature", //will be displayed on the y-axis
      data: [21, 12, 13, 14, 16, 11, 17]
    }
  ];
  const options = {
    chart: {
      id: "simple-bar"
    },
    xaxis: {
      categories: ["2023-10-13", "2023-10-14", "2023-10-15", "2023-10-16", "2023-10-17", "2023-10-18", "2023-10-19"] //will be displayed on the x-asis
    }
  };
  return (
    <div>
      <Chart options={options} type="line" series={series} width="60%" />
    </div>
  );
}