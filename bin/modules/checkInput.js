const { readFolder } = require("./readFolder");
const { readFile } = require("./readTextFile");
const { readMDFile } = require("./readMDFile");
const { readJson } = require("./readJSON");
const path = require("path");
const fs = require("fs");
const fsPromise = require("fs-promise");
const chalk = require("chalk");

// delete output folder "dist" then create new one
async function trackDistFolder() {
  try {
    await fsPromise.rmdir("./dist", { recursive: true });
  } catch (err) {
    //ignore err
  }

  try {
    await fsPromise.mkdir("./dist");
    console.log(
      chalk.bold.green("--- dist folder is created successfully! ---")
    );
  } catch (err) {
    console.log(chalk.bold.red("***Cannot create dist folder!***"));
    return process.exit(-1);
  }

  try {
    await fsPromise.mkdir("./dist/assets");
    console.log(
      chalk.bold.green(
        "--- assets folder is created under ./dist successfully! ---"
      )
    );
  } catch (err) {
    console.log(chalk.bold.red("***Cannot create assets folder!***"));
    return process.exit(-1);
  }
}

// check input path status
module.exports.checkInput = async function (
  pathToFile,
  stylesheet = "https://cdn.jsdelivr.net/npm/water.css@2/out/water.css",
  language = "en-CA",
  assets,
  isFromJSON = false
) {
  if (!isFromJSON) {
    await trackDistFolder();
  }

  if (assets !== "") {
    let copyFolder = require("fs-extra");
    try {
      await copyFolder.copy(assets, "./dist/assets");
      console.log(
        chalk.bold.green("--- assets folder is copied successfully! ---")
      );
    } catch (err) {
      console.log(chalk.bold.red("***Cannot copy assets folder!***"));
      return process.exit(-1);
    }
  }

  fs.stat(pathToFile, (err, stats) => {
    if (err) {
      console.log(chalk.bold.red(`***${pathToFile} does not exist!***`));
      return process.exit(-1);
    }

    const isFile = stats.isFile();
    const fileExtension = path.extname(pathToFile);

    if (stats.isDirectory()) {
      readFolder(pathToFile, stylesheet, language, "./dist"); // folder
    } else if (isFile && fileExtension === ".json") {
      readJson(pathToFile); // json file
    } else if (isFile && fileExtension === ".txt") {
      readFile(pathToFile, stylesheet, language, "./dist"); // text file
    } else if (isFile && fileExtension === ".md") {
      readMDFile(pathToFile, stylesheet, language, "./dist"); // markdown file
    } else {
      console.log(
        chalk.bold.red(
          "***Invalid file extension, it should be .txt or .md!***"
        )
      );
      return process.exit(-1);
    }
  });
};
