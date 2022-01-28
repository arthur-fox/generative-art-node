const myArgs = process.argv.slice(2);
const { buildSetup, createHardcoded, createMetadatas, createImages, createMetadataForReport } = require("./src/main.js");
const { reportMetaData } = require("./src/report.js");
const { defaultEdition } = require("./src/config.js");
const edition = myArgs.length > 0 ? Number(myArgs[1]) : defaultEdition;
const hardcodedFile = myArgs.length > 1 ? myArgs[2] : null;

const generate = async () => {
  buildSetup();
  createHardcoded(hardcodedFile);
  await createMetadatas(edition);
  createMetadataForReport();
  createImages(edition);
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