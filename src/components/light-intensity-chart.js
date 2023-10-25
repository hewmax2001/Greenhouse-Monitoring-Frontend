import Chart from "react-apexcharts";

export const LightIntesityChart = (props) => {
  const series = [
    {
      name: "Light Intensity", //will be displayed on the y-axis
      data: [1221, 1001, 1157, 1133, 1278, 1375, 1142]
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