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

  test("prints error and help message when no argument is passed", async () => {
    const { stderr, stdout, exitCode } = await run();

    expect(exitCode).toBe(1);
    expect(stderr).toMatchSnapshot();
    expect(stdout).toEqual(
      "\n***Please specify either -i option or -c option!***"
    );
  });

  test("prints error and help message when .json is passed using -i", async () => {
    const { stderr, stdout, exitCode } = await run("-i", "testing/config.json");

    expect(exitCode).toBe(1);
    expect(stderr).toMatchSnapshot();
    expect(stdout).toEqual(
      "\n***For .json extension, please use with -c option!***"
    );
  });

  test("prints error and help message when other extension than .json is passed using -c", async () => {
    const { stderr, stdout, exitCode } = await run("-c", "testing.txt");

    expect(exitCode).toBe(1);
    expect(stderr).toMatchSnapshot();
    expect(stdout).toEqual(
      "\n***Invalid file extension, it should be .json!***"
    );
  });
});
