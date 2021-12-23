const myArgs = process.argv.slice(2);
const { buildSetup, createFiles, createMetaData } = require("./src/main.js");
const { reportMetaData } = require("./src/report.js");
const { defaultEdition } = require("./src/config.js");
const edition = myArgs.length > 0 ? Number(myArgs[1]) : defaultEdition;

(() => {    
  if (myArgs[0] == 'generate') // eg. npm run build generate 3
  {        
    buildSetup();
    createFiles(edition);
    createMetaData();
  }
  else if (myArgs[0] == 'report') // eg. npm run build report ./build/_metadata.json
  {    
    reportMetaData(myArgs[1]);
  }
})();