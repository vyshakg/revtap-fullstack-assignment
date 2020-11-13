import { useState, useEffect } from "react";
import { DualAxes } from "@ant-design/charts";
import { Typography, Divider } from "antd";
import API from "../api";

const { Title } = Typography;
function Analytics() {
  const [analytics, setanalytics] = useState([]);

  useEffect(() => {
    return (async () => {
      const response = await API.fetchAnalytics();
      setanalytics(response.data);
    })();
  }, []);

  var config = {
    data: [analytics, analytics],
    xField: "day",
    yField: ["ordersCount", "totalPrice"],
    geometryOptions: [
      {
        geometry: "line",
        smooth: false,
        color: "#5B8FF9",
        lineStyle: {
          lineWidth: 3,
          lineDash: [5, 5],
        },
      },
      {
        geometry: "line",
        smooth: true,
        color: "#5AD8A6",
        lineStyle: {
          lineWidth: 4,
          opacity: 0.5,
        },
        label: {},
        point: {
          shape: "circle",
          size: 4,
          style: {
            opacity: 0.5,
            stroke: "#5AD8A6",
            fill: "#fff",
          },
        },
      },
    ],
  };
  return (
    <div>
      <Divider />
      <div style={{ textAlign: "center" }}>
        <Title level={2}>Analytics</Title>
      </div>
      <DualAxes {...config} style={{ background: "#fff" }} appendPadding={30} />
    </div>
  );
}

export default Analytics;
