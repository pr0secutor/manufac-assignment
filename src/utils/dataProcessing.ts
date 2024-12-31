interface CropData {
    year: string; // Year as a string, e.g., "Financial Year (Apr - Mar), 1950"
    cropName: string; // Name of the crop
    cropProduction: number | null; // Production value (can be null)
    yieldOfCrops: number | null; // Yield value (can be null)
  }
  
  interface TableData {
    year: number; // Parsed year as a number
    maxCrop: string; // Crop with maximum production
    minCrop: string; // Crop with minimum production
  }
  
  interface ChartData {
    crop: string; // Crop name
    averageYield: number; // Average yield of the crop
  }
  
  // Utility to extract year from "Financial Year (Apr - Mar), 1950"
  const parseYear = (yearString: string): number => {
    const match = yearString.match(/\d{4}/);
    return match ? parseInt(match[0], 10) : 0; // Default to 0 if no year found
  };
  
  // Utility to safely get crop production, treating null/undefined as 0
  const getSafeCropProduction = (crop: CropData) => crop.cropProduction ?? 0;
  
  // Process data for the table
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
  
  // Process data for the bar chart
  export const processBarChartData = (data: CropData[]): ChartData[] => {
    const groupedByCrop = data.reduce((acc, curr) => {
      const crop = curr.cropName;
      acc[crop] = acc[crop] || [];
      acc[crop].push(curr.yieldOfCrops ?? 0); // Treat null/undefined yield as 0
      return acc;
    }, {} as Record<string, number[]>);
  
    return Object.entries(groupedByCrop).map(([crop, yields]) => ({
      crop,
      averageYield: yields.reduce((sum, value) => sum + value, 0) / yields.length,
    }));
  };
  