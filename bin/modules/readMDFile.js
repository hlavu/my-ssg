const fs = require("fs");
const { generateHTML } = require("./generateHTML");
const path = require("path");


module.exports.readMDFile = function (pathToFile, stylesheet, language, outputContainer) {
  let body = "";
  try {
    const data = fs.readFileSync(pathToFile, "utf8");
    body = data
      .replace(/(?<!!)\[(.*?)\]\((.*?)\)/gim, "<a href='$2'>$1</a>") // replaces md link with <a> tags
      .replace(/`([^`].*?)`/gim, "<code>$1</code>") // replaces inline code with <code> tags.
      .replace(/---\r?\n/gim, "<hr>") // replaces horizontal rules with <hr> tag.
      .split(/\r?\n\r?\n/)
      .map((para) => {
        if (para.startsWith("# ")) {  
          return `<h1>${para.replace(/# /, "")}</h1>\n\n`; // replaces # [string] with h1 tags
        } else if (para.startsWith("## ")) {                
          return `<h2>${para.replace(/# /, "")}</h2>\n\n`; // replaces ## [string] with h2 tags
        }
        return `<p>${para.replace(/\r?\n/, " ")}</p>\n\n`; // adds <p> tags for a paragraph
      })
      .join(" ");
  } catch (err) {
     console.log(chalk.bold.red("***Cannot read the file!***"));
     return process.exit(-1);
  }

  const title = path.basename(pathToFile, ".md");
  generateHTML(language, title, stylesheet, body, outputContainer);
  return title;
};
