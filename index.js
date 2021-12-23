const myArgs = process.argv.slice(2);
const { buildSetup, createMetadatas, createImages, createMetadataForReport } = require("./src/main.js");
const { reportMetaData } = require("./src/report.js");
const { defaultEdition } = require("./src/config.js");
const edition = myArgs.length > 0 ? Number(myArgs[1]) : defaultEdition;

const generate = async () => {
  buildSetup();
  await createMetadatas(edition);
  createImages(edition);
  createMetadataForReport();
}

(() => {    
  if (myArgs[0] == 'generate') // eg. npm run build generate 3
  {      
    generate();
  }
  else if (myArgs[0] == 'report') // eg. npm run build report ./build/_metadata.json
  {    
    reportMetaData(myArgs[1]);
  }
})();