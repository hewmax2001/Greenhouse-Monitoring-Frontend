import Chart from "react-apexcharts";

export const HumidityChart = (props) => {
  const series = [
    {
      name: "Humidity", //will be displayed on the y-axis
      data: [90, 62, 94, 89, 88, 50, 62]
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