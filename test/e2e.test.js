const run = require("./run");

describe("end-to-end integration", () => {
  test("prints help message when --help option is passed", async () => {
    const { stderr, stdout, exitCode } = await run("--help");

    expect(exitCode).toBe(0);
    expect(stdout).toMatchSnapshot();
    expect(stderr).toEqual("");
  });

  test("prints version when --version option is passed", async () => {
    const { stderr, stdout, exitCode } = await run("--version");

    expect(exitCode).toBe(0);
    expect(stdout).toMatchSnapshot();
    expect(stderr).toEqual("");
  });
});
