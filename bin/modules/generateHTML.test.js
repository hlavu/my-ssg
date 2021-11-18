const { generateHTML } = require("./generateHTML");
const chalk = require("chalk");

describe("test generateHTML(title, body, language, stylesheet, htmlContainer)", () => {
  const title = "index";
  const body = "Hello World!";
  const lang = "en-CA";
  const stylesheet = "https://cdn.jsdelivr.net/npm/water.css@2/out/water.css";
  const htmlContainer = "./dist";
  const expectedPath = "./dist/index.html";

  test("function should create new HTML file named ${title}.html inside the ${htmlContainer} folder", () => {
    expect(
      generateHTML(title, body, lang, stylesheet, htmlContainer)
    ).toStrictEqual(expectedPath);
  });

  test("function should process normally when language or stylesheet is an empty string", () => {
    expect(generateHTML(title, body, "", "", htmlContainer)).toStrictEqual(
      expectedPath
    );
  });

  test("function should throw an error when title is an empty string", async () => {
    try {
      await generateHTML("");
    } catch (err) {
      expect(err).toEqual(
        new Error(chalk.bold.red("***title cannot be empty!***"))
      );
    }
  });

  test("function should throw an error when title is not provided as an arg", async () => {
    try {
      await generateHTML();
    } catch (err) {
      expect(err).toEqual(
        new Error(chalk.bold.red("***title should be provided!***"))
      );
    }
  });

  test("function should process normally when only title and body were passed as arguments", () => {
    expect(generateHTML(title, body)).toStrictEqual(expectedPath);
  });
});
