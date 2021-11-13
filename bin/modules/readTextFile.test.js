const { readFile } = require("./readTextFile");
const chalk = require("chalk");

describe("test readFile(pathToFile, stylesheet, language, outputContainer)", () => {
  const pathToFile = "testing/testing.txt";
  const outputContainer = "./dist";
  const lang = "EN";
  const stylesheet = "https://cdn.jsdelivr.net/npm/water.css@2/out/water.css";

  function readContent(data) {
    let result = data
      .split(/\r?\n\r?\n/)
      .map((para) => `<p>${para.replace(/\r?\n/, " ")}</p>\n\n`)
      .join(" ");
    return result;
  }

  test("function should throw an error when pathToFile is empty", () => {
    const pathToFile = "";
    try {
      readFile(pathToFile, stylesheet, lang, outputContainer);
    } catch (err) {
      expect(err).toEqual(
        new Error(chalk.bold.red("***Cannot read empty path!***"))
      );
    }
  });

  //   test("function should throw an error when type of pathToFile is not String", () => {
  //     const pathToFile = 2;
  //     try {
  //       readFile(pathToFile, stylesheet, lang, outputContainer);
  //     } catch (err) {
  //       expect(err).toEqual(
  //         new Error(chalk.bold.red("***File name should be a String!***"))
  //       );
  //     }
  //   });

  test("function should process normally when only pathToFile is passed as arg", () => {
    expect(readFile(pathToFile)).toStrictEqual("testing");
  });

  test("function should throw an error when pathToFile is not provided as an arg", () => {
    try {
      readFile();
    } catch (err) {
      expect(err).toEqual(
        new Error(chalk.bold.red("***pathToFile should be provided!***"))
      );
    }
  });

  test("function should read content of the file and produce <p> tag appropriately", () => {
    const body = "Hello World.\n\nWelcome to use my-ssg.";
    expect(readContent(body)).toStrictEqual(
      "<p>Hello World.</p>\n\n <p>Welcome to use my-ssg.</p>\n\n"
    );
  });
});
