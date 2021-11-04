const fs = require("fs");
const { readFile } = require("./readTextFile");
const { readMDFile } = require("./readMDFile");
const { generateHTML } = require("./generateHTML");
const path = require("path");
const chalk = require("chalk");

module.exports.readFolder = function (
  pathToFile,
  stylesheet,
  language,
  outputContainer
) {
  fs.readdir(pathToFile, (err, files) => {
    if (err) {
      console.log(chalk.bold.red("***Cannot read the folder!***"));
      return process.exit(-1);
    }

    let body = "";
    // Sorted the array of directory's content and filter only ".txt" files
    const textFile = files.filter(
      (file) => path.extname(`${pathToFile}/${file}`) === ".txt"
    );
    textFile.forEach((file) => {
      // index.html body
      body += getBodyHTML(
        `${pathToFile}/${file}`,
        stylesheet,
        language,
        outputContainer,
        ".txt"
      );
    });

    // Sorted the array of directory's content and filter only ".md" files
    const mdFile = files.filter(
      (file) => path.extname(`${pathToFile}/${file}`) === ".md"
    );
    mdFile.forEach((file) => {
      body += getBodyHTML(
        `${pathToFile}/${file}`,
        stylesheet,
        language,
        outputContainer,
        ".md"
      );
    });

    // create index.html
    generateHTML(
      language,
      "index",
      stylesheet,
      `<h4>Generated Sites</h4>\n${body}`,
      outputContainer
    );
  });
};

function getBodyHTML(
  path,
  stylesheet,
  language,
  outputContainer,
  fileExtension
) {
  let fileName =
    fileExtension == ".txt"
      ? readFile(path, stylesheet, language, outputContainer)
      : readMDFile(path, stylesheet, language, outputContainer);
  let url = `./${encodeURI(fileName)}.html`;
  return `<a href="${url}">${fileName}</a><br>\n`;
}
