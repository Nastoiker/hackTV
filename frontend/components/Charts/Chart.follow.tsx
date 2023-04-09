import React, { useState } from "react";
import { ResponsiveContainer, AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Area } from "recharts";

const data = [
  { name: "Янв", uv: 400, pv: 240, amt: 2400 },
  { name: "Фев", uv: 300, pv: 456, amt: 2400 },
  { name: "Мар", uv: 500, pv: 139, amt: 2400 },
  { name: "Апр", uv: 200, pv: 980, amt: 2400 },
  { name: "Май", uv: 278, pv: 390, amt: 2400 },
  { name: "Июнь", uv: 189, pv: 480, amt: 2400 },
  { name: "Июль", uv: 239, pv: 430, amt: 2400 },
  { name: "Авг", uv: 349, pv: 430, amt: 2400 },
  { name: "Сен", uv: 278, pv: 430, amt: 2400 },
  { name: "Окт", uv: 398, pv: 430, amt: 2400 },
  { name: "Ноя", uv: 339, pv: 430, amt: 2400 },
  { name: "Дек", uv: 349, pv: 430, amt: 2400 },
];

const WaveChart = () => {
  const [hovered, setHovered] = useState(null);

  const handleMouseMove = (event) => {
    setHovered(event.activeTooltipIndex);
  };

  return (
    <div style={{ width: "100%", height: "400px" }}>
      <ResponsiveContainer>
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }} onMouseMove={handleMouseMove}>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip
            cursor={{ stroke: "blue", strokeWidth: 2 }}
            content={({ active, payload }) => {
              if (!active || !payload || !payload[0]) {
                return null;
              }
              const { name, uv, pv } = payload[0].payload;
              return (
                <div style={{ background: "white", padding: "10px", border: "1px solid blue" }}>
                  <p style={{ margin: 0 }}>Месяц: {name}</p>
                  <p style={{ margin: 0 }}>Данные 1: {uv}</p>
                  <p style={{ margin: 0 }}>Данные 2: {pv}</p>
                </div>
              );
            }}
          />
          <Area
            type="monotone"
            dataKey="uv"
            stroke="#8884d8"
            fill="#8884d8"
            activeDot={{
              onClick: (event, payload) => {
                console.log("Clicked on", payload);
              },
            }}
            opacity={hovered === null ? 1 : 0.5}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WaveChart;
