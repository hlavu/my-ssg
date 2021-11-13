const { readJson } = require("./readJson");
const chalk = require("chalk");

describe("test readJson(pathToFile)", () => {
  test("function should throw an error when pathToFile is empty", () => {
    try {
      readJson("");
    } catch (err) {
      expect(err).toEqual(
        new Error(chalk.bold.red("***Cannot read empty path!***"))
      );
    }
  });

  test("function should throw an error when pathToFile is not provided as an arg", () => {
    try {
      readJson();
    } catch (err) {
      expect(err).toEqual(
        new Error(chalk.bold.red("***pathToFile should be provided!***"))
      );
    }
  });
});
