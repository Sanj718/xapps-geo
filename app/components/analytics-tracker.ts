import fs from "fs/promises";
import path from "path";

export async function createFolderAndSaveDate(
  storeName: string, 
  type: string
): Promise<void> {
  try {
    // Use process.cwd() to get the current working directory (project root)
    const rootPath = process.cwd();
    const analyticsFolderPath = path.join(rootPath, "analytics");
    const folderPath = path.join(analyticsFolderPath, storeName);
    const fileName = `${type}.json`;
    const filePath = path.join(folderPath, fileName);

    // Create directories if they don't exist
    await fs.mkdir(analyticsFolderPath, { recursive: true });
    await fs.mkdir(folderPath, { recursive: true });

    // Read existing data or initialize empty array
    let data: number[] = [];
    try {
      const fileContents = await fs.readFile(filePath, "utf-8");
      const parsedData = JSON.parse(fileContents);
      
      // Validate that parsed data is an array of numbers
      if (Array.isArray(parsedData) && parsedData.every(item => typeof item === 'number')) {
        data = parsedData;
      } else {
        console.warn(`Invalid data format in ${filePath}, initializing empty array`);
        data = [];
      }
    } catch (readError) {
      // File doesn't exist or is invalid, start with empty array
      data = [];
    }

    // Add new timestamp
    data.push(Date.now());

    // Write data back to file
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error(`Failed to save analytics data for ${storeName}:`, error);
    throw new Error(`Analytics save failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Utility function to read analytics data
export async function readAnalyticsData(
  storeName: string,
  type: string
): Promise<number[]> {
  try {
    // Use process.cwd() to get the current working directory (project root)
    const rootPath = process.cwd();
    const analyticsFolderPath = path.join(rootPath, "analytics");
    const folderPath = path.join(analyticsFolderPath, storeName);
    const fileName = `${type}.json`;
    const filePath = path.join(folderPath, fileName);

    const fileContents = await fs.readFile(filePath, "utf-8");
    const parsedData = JSON.parse(fileContents);
    
    if (Array.isArray(parsedData) && parsedData.every(item => typeof item === 'number')) {
      return parsedData;
    } else {
      console.warn(`Invalid data format in ${filePath}`);
      return [];
    }
  } catch (error) {
    if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
      // File doesn't exist, return empty array
      return [];
    }
    console.error(`Failed to read analytics data for ${storeName}:`, error);
    throw new Error(`Analytics read failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Utility function to get analytics summary
export async function getAnalyticsSummary(
  storeName: string,
  type: string
): Promise<{ count: number; latest: number | null; oldest: number | null }> {
  const data = await readAnalyticsData(storeName, type);
  
  if (data.length === 0) {
    return { count: 0, latest: null, oldest: null };
  }
  
  return {
    count: data.length,
    latest: Math.max(...data),
    oldest: Math.min(...data)
  };
}