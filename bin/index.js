#!/usr/bin/env node

const pjson = require("../package.json");
const folder = require("./modules/readFolder");
const file = require("./modules/readFile");
const { readMDFile } = require("./modules/readMDFile");
const path = require("path");
const fs = require("fs");
const fsPromise = require("fs-promise");
const chalk = require("chalk");
const htmlContainer = "./dist";
let cssLink = "";

const argv = require("yargs")
  .usage("Usage: $0 --input <filename>  [-s <css-link>] [-l <lang-code>]")
  .option("i", {
    alias: "input",
    describe: ".txt file name",
    type: "array",
    demandOption: true,
  })
  .option("s", {
    alias: "stylesheet",
    describe: "css link",
    default: "",
    type: "string",
    demandOption: false,
  })
  .option("l", {
    alias: "lang",
    describe: "language used in HTML",
    default: "en-CA",
    type: "string",
    demandOption: false,
  })
  .alias("v", "version")
  .version(pjson.name + " " + pjson.version)
  .alias("h", "help")
  .help().argv;

if (argv.stylesheet !== "") {
  cssLink = argv.stylesheet;
}

checkInput();

// check input path status
async function checkInput() {
  await trackDistFolder();
  fs.stat(argv.input.join(" "), (err, stats) => {
    if (err) {
      console.log(chalk.bold.red(`${argv.input.join(" ")} does not exist!`));
      return process.exit(-1);
    }

    if (stats.isDirectory()) {
      folder.readFolder(
        argv.input.join(" "),
        cssLink,
        argv.lang,
        htmlContainer
      ); // folder
    } else if (
      stats.isFile() &&
      path.extname(argv.input.join(" ")) === ".txt"
    ) {
      file.readFile(argv.input.join(" "), cssLink, argv.lang, htmlContainer); // text file
    } else if (stats.isFile() && path.extname(argv.input.join(" ")) === ".md") {
      readMDFile(argv.input.join(" "), cssLink, argv.lang, htmlContainer); // markdown file
    } else {
      console.log("Invalid file extension, it should be .txt or .md");
    }
  });
}

// delete output folder "dist" then create new one
async function trackDistFolder() {
  try {
    await fsPromise.rmdir(htmlContainer, { recursive: true });
  } catch (err) {
    //ignore err
  }

  try {
    await fsPromise.mkdir(htmlContainer);
    console.log(chalk.bold.green("dist folder is created successfully!"));
  } catch (err) {
    console.log(chalk.bold.red("Cannot create dist folder!"));
    return process.exit(-1);
  }
}
