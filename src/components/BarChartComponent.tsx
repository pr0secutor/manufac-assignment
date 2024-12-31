import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

interface ChartData {
  crop: string;
  averageYield: number;
}

const BarChartComponent: React.FC<{ data: ChartData[] }> = ({ data }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const chartInstance = echarts.init(chartRef.current);

      const options = {
        grid:{
          left:'4%'
        },
        xAxis: {
          type: 'category',
          data: data.map((d) => d.crop),
          axisLabel: {
            interval: 0,
          },
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: data.map((d) => d.averageYield),
            type: 'bar',
            barCategoryGap: '10%', // Adjust space between bars
          },
        ],
      };
      chartInstance.setOption(options);

      return () => {
        chartInstance.dispose();
      };
    }
  }, [data]);

  return <div ref={chartRef} style={{ width: '100%', height: '400px' }} />;
};

export default BarChartComponent;
