const fs = require("fs");
const path = require("path");

const htmlContainer = "./dist";
const file = require("./readFile");
const folder = require("./readFolder");

module.exports.readJson = (inputPath) => {
  fs.readFile(inputPath, "utf8", (err, json) => {
    if (err) {
      console.error(err);
      return process.exit(-1);
    }
    const data = JSON.parse(json);

    const cssLink = data.stylesheet || "";
    const lang = data.lang || "";

    fs.stat(data.input, (err, stats) => {
      if (err) {
        console.log(err);
      }

      if (stats.isDirectory()) {
        folder.readFolder(data.input, cssLink, lang, htmlContainer); // folder
      } else if (stats.isFile() && path.extname(data.input) === ".txt") {
        file.readFile(data.input, cssLink, lang, htmlContainer); // text file
      } else if (stats.isFile() && path.extname(data.input) === ".md") {
        readMDFile(data.input, cssLink, lang, htmlContainer); // markdown file
      } else {
        console.log("Invalid file extension, it should be .txt or .md");
      }
    });
  });
};
