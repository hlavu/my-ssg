const fs = require("fs");
const { generateHTML } = require("./generateHTML");
const path = require("path");
const chalk = require("chalk");

module.exports.readFile = function (
  pathToFile,
  stylesheet = "https://cdn.jsdelivr.net/npm/water.css@2/out/water.css",
  language = "en-CA",
  outputContainer = "./dist"
) {
  let body = "";
  try {
    const data = fs.readFileSync(pathToFile, "utf8");
    body = data
      .split(/\r?\n\r?\n/)
      .map((para) => `<p>${para.replace(/\r?\n/, " ")}</p>\n\n`)
      .join(" ");
  } catch (err) {
    // console.log(chalk.bold.red("***Cannot read the file!***"));
    // return process.exit(-1);
    if (pathToFile === "") {
      throw new Error(chalk.bold.red("***Cannot read empty path!***"));
    }

    if (typeof pathToFile === "undefined") {
      throw new Error(chalk.bold.red("***pathToFile should be provided!***"));
    }
  }

  const title = path.basename(pathToFile, ".txt");
  generateHTML(title, body, language, stylesheet, outputContainer);
  return title;
};
