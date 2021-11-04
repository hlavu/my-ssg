const fs = require("fs");
const { generateHTML } = require("./generateHTML");
const path = require("path");
const chalk = require("chalk");

module.exports.readFile = function (
  pathToFile,
  stylesheet,
  language,
  outputContainer
) {
  let body = "";
  try {
    const data = fs.readFileSync(pathToFile, "utf8");
    body = data
      .split(/\r?\n\r?\n/)
      .map((para) => `<p>${para.replace(/\r?\n/, " ")}</p>\n\n`)
      .join(" ");
  } catch (err) {
    console.log(chalk.bold.red("***Cannot read the file!***"));
    return process.exit(-1);
  }

  const title = path.basename(pathToFile, ".txt");
  generateHTML(language, title, stylesheet, body, outputContainer);
  return title;
};
