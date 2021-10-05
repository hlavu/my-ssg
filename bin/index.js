#!/usr/bin/env node

const pjson = require("../package.json");
const folder = require("./modules/readFolder");
const file = require("./modules/readFile");
const { readMDFile } = require("./modules/readMDFile");
const { readJson } = require("./modules/readJson");
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
    demandOption: false,
  })
  .options("c", {
    alias: "config",
    describe: "configuration file",
    default: "",
    type: "array",
    demandOption: false,
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

const filePath = argv.input || argv.config;
if (!filePath) {
  console.log(chalk.bold.red(`Please specify either -i option or -c option`));
}

checkInput();

// check input path status
async function checkInput() {
  await trackDistFolder();
  fs.stat(filePath.join(" "), (err, stats) => {
    if (err) {
      console.log(chalk.bold.red(`${filePath.join(" ")} does not exist!`));
      return process.exit(-1);
    }

    if (stats.isDirectory()) {
      folder.readFolder(filePath.join(" "), cssLink, argv.lang, htmlContainer); // folder
    } else if (stats.isFile() && path.extname(filePath.join(" ")) === ".json") {
      readJson(filePath.join(" ")); // json file
    } else if (stats.isFile() && path.extname(filePath.join(" ")) === ".txt") {
      file.readFile(filePath.join(" "), cssLink, argv.lang, htmlContainer); // text file
    } else if (stats.isFile() && path.extname(filePath.join(" ")) === ".md") {
      readMDFile(filePath.join(" "), cssLink, argv.lang, htmlContainer); // markdown file
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
