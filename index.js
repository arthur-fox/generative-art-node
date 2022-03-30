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

const generateMetadata = async () => {
  buildSetup();
  createHardcoded(hardcodedFile);
  await createMetadatas(edition);
  createMetadataForReport();
}

const generateImages = async () => {
  createImages(edition);
}

(() => {
  if (myArgs[0] == 'generate') // eg. npm run build generate 3 hardcoded.json
  {
    generate();
  }
  else if (myArgs[0] == 'generateMetadata') // eg. npm run build generateMetadata 3
  {
    generateMetadata();
  }
  else if (myArgs[0] == 'generateImages') // eg. npm run build generateImages 3
  {
    generateImages();
  }
  else if (myArgs[0] == 'report') // eg. npm run build report ./build/_metadata.json
  {
    reportMetaData(myArgs[1]);
  }
})();