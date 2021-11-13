const fs = require("fs");
const { generateHTML } = require("./generateHTML");
const path = require("path");
const chalk = require("chalk");

module.exports.readMDFile = function (
  pathToFile,
  stylesheet = "https://cdn.jsdelivr.net/npm/water.css@2/out/water.css",
  language = "en-CA",
  outputContainer = "./dist"
) {
  let body = "";
  let markdown = require("markdown-it")({
    html: true,
  });

  try {
    const data = fs.readFileSync(pathToFile, "utf8");
    body = markdown.render(
      data.replace(/!\[(.*?)\]\(.*\/assets\/(.*?)\)/gim, "![$1](./assets/$2)")
    );
  } catch (err) {
    console.log(chalk.bold.red("***Cannot read the file!***"));
    return process.exit(-1);
  }

  const title = path.basename(pathToFile, ".md");
  generateHTML(title, body, language, stylesheet, outputContainer);
  return title;
};
