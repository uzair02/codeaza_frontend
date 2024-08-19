import React from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';
import './css/insights.css';

const data1 = [
  { name: 'PJ', amount: 80500 },
  { name: 'SJ', amount: 37000 },
  { name: 'MB', amount: 89000 },
  { name: 'IS', amount: 80500 },
  { name: 'DW', amount: 37000 },
  { name: 'NJ', amount: 59000 },
  { name: 'BS', amount: 110000 },
];

const data2 = [
  { name: 'Accomodation', amount: 50000 },
  { name: 'Comms', amount: 20000 },
  { name: 'Services', amount: 111000 },
  { name: 'Food', amount: 88000 },
  { name: 'Fuel', amount: 30000 },
];


const getColor1 = (value) => {
  if (value >= 100000) return '#124241';
  if (value >= 80000) return '#00c7ab'; 
  if (value >= 60000) return '#84dbce'; 
  if (value >= 40000) return '#92e9dc'; 
  if (value >= 20000) return '#d8fffb'; 
  return '#fff'; 
};

const getColor2 = (value) => {
  if (value >= 100000) return '#590be2';
  if (value >= 80000) return '#761ff1'; 
  if (value >= 60000) return '#a56ff7'; 
  if (value >= 40000) return '#c09bf9'; 
  if (value >= 20000) return '#e9d9fb'; 
  return '#fff'; 
};

function Insights() {
  const gridColor = '#333334';
  const labelColor = '#8a8178';

  return (
    <section className="insights">
      <h3>Month on Month Insights</h3>
      <div className="charts">
        <div className="chart-container">
          <h4>Last 5 Months Summary</h4>
          <div className="bar-chart">
            <VictoryChart
              theme={VictoryTheme.material}
              domainPadding={{ x: 40 }}
              padding={{ top: 10, bottom: 25, left: 30, right: 10 }}
              height={135}
              width={495}
            >
              <VictoryAxis
                style={{
                  axis: { stroke: "none" },
                  grid: { stroke: 'none' }, 
                  tickLabels: { fontSize: 10, fill: labelColor },
                }}
              />
              <VictoryAxis
                dependentAxis
                tickValues={[0, 20000, 40000, 60000, 80000, 100000]}
                tickFormat={(t) => `${t / 1000}K`}
                style={{
                  axis: { stroke: "none" }, 
                  grid: { stroke: gridColor, strokeDasharray: '0' },
                  tickLabels: { fontSize: 10, fill: labelColor },
                }}
              />
              <VictoryBar
                data={data1.map(d => ({ x: d.name, y: d.amount }))}
                style={{
                  data: { 
                    fill: ({ datum }) => getColor1(datum.y),
                    borderRadius: 2 
                  },
                }}
                barWidth={15}
                cornerRadius={{ top: 2, bottom: 2 }}
              />
            </VictoryChart>
          </div>
        </div>
        <div className="chart-container">
          <h4>By Category</h4>
          <div className="pie-chart">
            <VictoryChart
              theme={VictoryTheme.material}
              domainPadding={{ x: 40 }}
              padding={{ top: 10, bottom: 25, left: 30, right: 10 }}
              height={135}
              width={495}
            >
              <VictoryAxis
                style={{
                  axis: { stroke: "none" },
                  grid: { stroke: 'none' }, 
                  tickLabels: { fontSize: 10, fill: labelColor },
                }}
              />
              <VictoryAxis
                dependentAxis
                tickValues={[0, 20000, 40000, 60000, 80000, 100000]}
                tickFormat={(t) => `${t / 1000}%`}
                style={{
                  axis: { stroke: "none" },
                  grid: { stroke: gridColor, strokeDasharray: '0' },
                  tickLabels: { fontSize: 10, fill: labelColor },
                }}
              />
              <VictoryBar
                data={data2.map(d => ({ x: d.name, y: d.amount }))}
                style={{
                  data: { 
                    fill: ({ datum }) => getColor2(datum.y),
                    borderRadius: 2
                  },
                }}
                barWidth={22}
                cornerRadius={{ top: 2, bottom: 2 }} 
              />
            </VictoryChart>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Insights;
