const fs = require("fs");
const { generateHTML } = require("./generateHTML");
const path = require("path");
const chalk = require("chalk");

module.exports.readMDFile = function (pathToFile, stylesheet, language, outputContainer) {
  let body = "";
  let markdown = require('markdown-it')({
    html: true
  });

  try {
    const data = fs.readFileSync(pathToFile, "utf8");
    body = markdown.render(data.replace(/!\[(.*?)\]\(.*\/assets\/(.*?)\)/gim, `![$1](./assets/$2)`));
  } catch (err) {
    console.log(chalk.bold.red("***Cannot read the file!***"));
    return process.exit(-1);
  }

  const title = path.basename(pathToFile, ".md");
  generateHTML(language, title, stylesheet, body, outputContainer);
  return title;
};
