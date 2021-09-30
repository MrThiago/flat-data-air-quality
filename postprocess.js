// Helper library written for useful postprocessing tasks with Flat Data
// Has helper functions for manipulating csv, txt, json, excel, zip, and image files
import { readJSON, writeJSON, removeFile } from 'https://deno.land/x/flat@0.0.11/mod.ts' 

// Step 1: Read the downloaded_filename JSON
const filename = Deno.args[0] // Same name as downloaded_filename
const json = await readJSON(filename)

// Step 2: Filter specific data we want to keep and write to a new JSON file
const sourceString = json.forecastURL; // Get one String
const currentForecastList = Object.values(json.currentForecast); // convert property values into an array
const data = currentForecastList.slice(0, 1)

const filteredData = data.map(cf => ({ 
    type: cf.forecastType,
    band: cf.forecastBand,
    summary: cf.forecastSummary,
    nitrogenDioxide: cf.nO2Band,
    ozone: cf.o3Band,
    particulateMatter: cf.pM10Band,
    fineParticulateMatter: cf.pM25Band,
    sulfurDioxide: cf.sO2Band,
    description: cf.forecastText,
    source: sourceString,
    disclaimerText: "This is for learning purpose and does not reflect real data source. See https://next.github.com/projects/flat-data for Flat Data Info"
}));

// Step 3. Write a new JSON file with our filtered data
const newFilename = `air-quality-postprocessed.json` // name of a new file to be saved
//await writeJSON(newFilename, filteredData) // create a new JSON file 
await Deno.writeTextFile(newFilename, JSON.stringify(filteredData, null, 4)) // create a new formatted JSON file 
console.log("Wrote a post process file")

// Delete the original file
await removeFile('./air-quality.json')