const fs = require("fs");
const html = require("./generateHTML");
const path = require("path");
let body = "";

module.exports.readFile = function (inputPath, cssLink, outputContainer) {
  try {
    const data = fs.readFileSync(inputPath, "utf8");
    body = data
      .split(/\r?\n\r?\n/)
      .map((para) => `<p>${para.replace(/\r?\n/, " ")}</p>\n\n`)
      .join(" ");
  } catch (err) {
    console.error(err);
  }

  const title = path.basename(inputPath, ".txt");

  html.generateHTML(title, cssLink, body, outputContainer);
  return title;
};
