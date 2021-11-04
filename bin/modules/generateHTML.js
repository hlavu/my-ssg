const fs = require("fs");
const createHTML = require("create-html");
const chalk = require("chalk");

module.exports.generateHTML = function (
  language,
  title,
  stylesheet,
  body,
  htmlContainer
) {
  const html = createHTML({
    title: `${title}`,
    // eslint-disable-next-line quotes
    head: '<meta name="viewport" content="width=device-width, initial-scale=1">',
    body: `${body}`,
    css: `${stylesheet}`,
    lang: `${language}`,
  });

  fs.writeFile(`${htmlContainer}/${title}.html`, html, (err) => {
    if (err) {
      console.log(chalk.bold.red("***Cannot write HTML file!***"));
      return process.exit(-1);
    }
  });

  if (title === "index") {
    console.log(
      chalk.bold.green(`--> ${title}.html is created successfully! <--`)
    );
  } else {
    console.log(chalk.yellow(`${title}.html is created successfully!`));
  }
};
