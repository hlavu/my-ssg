const fs = require("fs");
const check = require("./checkInput");
const chalk = require("chalk");

module.exports.readJson = (pathToFile) => {
  fs.readFile(pathToFile, "utf8", (err, json) => {
    if (err) {
      console.log(chalk.bold.red("***Cannot read the file!***"));
      return process.exit(-1);
    }
    const data = JSON.parse(json);

    const stylesheet =
      data.stylesheet ||
      "https://cdn.jsdelivr.net/npm/water.css@2/out/water.css";
    const language = data.lang || "en-CA";
    const assets = data.assets || "";

    check.checkInput(data.input, stylesheet, language, assets, true);
  });
};
