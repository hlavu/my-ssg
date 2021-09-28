const fs = require("fs");
const fileModule = require("./readFile");
const { readMDFile } = require("./readMDFile");
const html = require("./generateHTML");
const path = require("path");
let body = "";

module.exports.readFolder = function (
  inputPath,
  cssLink,
  language,
  outputContainer
) {
  fs.readdir(inputPath, (err, files) => {
    if (err) {
      return console.log(err);
    }

    const sortedFile = files.filter(
      (file) => path.extname(`${inputPath}/${file}`) === ".txt"
    );

    sortedFile.forEach((file) => {
      const fileName = fileModule.readFile(
        `${inputPath}/${file}`,
        cssLink,
        language,
        outputContainer
      );

      const url = `./${encodeURI(fileName)}.html`;

      // index.html body
      body += `<a href=\"${url}\">${fileName}</a>\n`;
    });

    // Sorted the array of directory's content and filter only ".md" files
    const sortedMDFile = files.filter(
      (file) => path.extname(`${inputPath}/${file}`) === ".md"
    );

    sortedMDFile.forEach((file) => {
      const fileName = readMDFile(
        `${inputPath}/${file}`,
        cssLink,
        language,
        outputContainer
      );

      const url = `./${encodeURI(fileName)}.html`;

      // Add links of the generated HTML files to index.html body
      body += `<a href=\"${url}\">${fileName}</a>\n`;
    });

    // create index.html
    html.generateHTML(
      language,
      "index",
      cssLink,
      `<h4>Generated Sites</h4>\n${body}`,
      outputContainer
    );
  });
};
