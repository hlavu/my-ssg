const execa = require("execa");

async function run(...args) {
  try {
    const results = await execa.node("./bin/index.js", args);
    return results;
  } catch (err) {
    return err;
  }
}

module.exports = run;
