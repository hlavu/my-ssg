#!/usr/bin/env node

const pjson = require("../package.json");
const { checkInput } = require("./modules/checkInput");
const chalk = require("chalk");
const path = require("path");
const yargs = require("yargs");

const argv = yargs
  .usage("Usage: $0 --input <filename>  [-s <css-link>] [-l <lang-code>]")
  .option("i", {
    alias: "input",
    describe: ".txt or .md file name",
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
  .option("a", {
    alias: "assets",
    describe: "path to assets folder",
    default: "",
    type: "array",
    demandOption: false,
  })
  .option("s", {
    alias: "stylesheet",
    describe: "css link",
    default: "https://cdn.jsdelivr.net/npm/water.css@2/out/water.css",
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

const filePath = argv.config == "" ? argv.input :  argv.config;
if (!filePath) {
  showError("Please specify either -i option or -c option!");
}

if(argv.config != "" && path.extname(filePath.join(" ")) != ".json")
{
  showError("Invalid file extension, it should be .json!");
}

if(argv.input && path.extname(filePath.join(" ")) == ".json")
{
  showError("For .json extension, please use with -c option!");
}

checkInput(filePath.join(" "), argv.stylesheet, argv.lang, argv.assets.join());

function showError(err){
  console.log(chalk.green("****--------------------------------**********----------------------------------****\n"));
  yargs.showHelp();
  console.log(chalk.green("\n****--------------------------------**********----------------------------------****\n"));
  console.log(chalk.bold.red(`***${err}***`));
  return process.exit(-1);
}

