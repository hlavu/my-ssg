const fs = require("fs");
const createHTML = require("create-html");
const chalk = require("chalk");

module.exports.generateHTML = function (
  title,
  body,
  language = "en-CA",
  stylesheet = "https://cdn.jsdelivr.net/npm/water.css@2/out/water.css",
  htmlContainer = "./dist"
) {
  const html = createHTML({
    title: `${title}`,
    // eslint-disable-next-line quotes
    head: '<meta name="viewport" content="width=device-width, initial-scale=1">',
    body: `${body}`,
    css: `${stylesheet}`,
    lang: `${language}`,
  });

  if (typeof title === "undefined") {
    throw new Error(chalk.bold.red("***title should be provided!***"));
  } else if (title === "") {
    throw new Error(chalk.bold.red("***title cannot be empty!***"));
  } else {
    fs.writeFile(`${htmlContainer}/${title}.html`, html, () => {});
  }

  // if (title === "index") {
  //   console.log(
  //     chalk.bold.green(`--> ${title}.html is created successfully! <--`)
  //   );
  // } else {
  //   console.log(chalk.yellow(`${title}.html is created successfully!`));
  // }

  return `${htmlContainer}/${title}.html`;
};
