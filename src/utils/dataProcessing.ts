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
  
  const parseYear = (yearString: string): number => {
    const match = yearString.match(/\d{4}/);
    return match ? parseInt(match[0], 10) : 0;
  };
  
  
  const getSafeCropProduction = (crop: CropData) => crop.cropProduction ?? 0;
  
  
  export const processTableData = (data: CropData[]): TableData[] => {
    const groupedByYear = data.reduce((acc, curr) => {
      const year = parseYear(curr.year);
      acc[year] = acc[year] || [];
      acc[year].push(curr);
      return acc;
    }, {} as Record<number, CropData[]>);
  
    return Object.entries(groupedByYear).map(([year, crops]) => {
      const maxCrop = crops.reduce(
        (max, crop) => (getSafeCropProduction(crop) > getSafeCropProduction(max) ? crop : max),
        crops[0]
      );
      const minCrop = crops.reduce(
        (min, crop) => (getSafeCropProduction(crop) < getSafeCropProduction(min) ? crop : min),
        crops[0]
      );
  
      return {
        year: parseInt(year, 10),
        maxCrop: maxCrop.cropName,
        minCrop: minCrop.cropName,
      };
    });
  };
  
  
  export const processBarChartData = (data: CropData[]): ChartData[] => {
    const groupedByCrop = data.reduce((acc, curr) => {
      const crop = curr.cropName;
      acc[crop] = acc[crop] || [];
      acc[crop].push(curr.yieldOfCrops ?? 0);
      return acc;
    }, {} as Record<string, number[]>);
  
    return Object.entries(groupedByCrop).map(([crop, yields]) => ({
      crop,
      averageYield: yields.reduce((sum, value) => sum + value, 0) / yields.length,
    }));
  };
  