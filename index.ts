#!/usr/bin/env node

import * as path from "node:path";
import renderTemplate from "./utils/renderTemplate";
import minimist from "minimist";

async function init() {
  const cwd = process.cwd();
  const argv = minimist(process.argv.slice(2), {
    alias: {
      typescript: ["ts"],
      "with-tests": ["tests"],
      router: ["vue-router"],
    },
    string: ["_"],
    // all arguments are treated as booleans
    boolean: true,
  });
  let targetDir = argv._[0] || "hlp-vue-project"
  const root = path.join(cwd, targetDir);
  const templateRoot = path.resolve(__dirname, "template");
  const render = function render(templateName) {
    const templateDir = path.resolve(templateRoot, templateName);
    renderTemplate(templateDir, root);
  };

  render("base");
}

init().catch((e) => {
  console.error(e);
});
