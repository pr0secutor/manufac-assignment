import { useEffect, useState } from 'react';
import TableComponent from './components/TableComponent';
import BarChartComponent from './components/BarChartComponent';
import { processTableData, processBarChartData } from './utils/dataProcessing';
import agricultureData from './data/agriculture_data.json';
import { MantineProvider } from '@mantine/core';

interface CropData {
  year: string;
  cropName: string;
  cropProduction: number | null;
  yieldOfCrops: number | null;
}

interface TableData {
  year: number;
  maxCrop: string;
  minCrop: string;
}

interface ChartData {
  crop: string;
  averageYield: number;
}

const App = () => {
  const [tableData, setTableData] = useState<TableData[]>([]);
  const [chartData, setChartData] = useState<ChartData[]>([]);

  useEffect(() => {
    const formattedData: CropData[] = agricultureData.map((entry) => ({
      year: entry["Year"],
      cropName: entry["Crop Name"],
      cropProduction: entry["Crop Production (UOM:t(Tonnes))"]
        ? parseFloat(entry["Crop Production (UOM:t(Tonnes))"].toString())
        : null,
      yieldOfCrops: entry["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"]
        ? parseFloat(entry["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"].toString())
        : null,
    }));

    setTableData(processTableData(formattedData));
    setChartData(processBarChartData(formattedData));
    // console.log(chartData);
  }, []);

  return (
    <MantineProvider>
      <div style={{ overflow: 'hidden' }}>
        <h1 style={{ marginLeft: '20px' }}>Indian Agriculture Data</h1>
        <TableComponent data={tableData} />
        <BarChartComponent data={chartData} />
        {/* <p style={{ textAlign: 'center', }}>Average Yield of Crop</p> */}
      </div>
    </MantineProvider>
  );
};

export default App;
